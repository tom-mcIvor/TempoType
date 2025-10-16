import express, { Request, Response } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import mongoose from 'mongoose'
import { AudioFile } from '../models/AudioFile'
import { auth, optionalAuth } from '../middleware/auth'

const router = express.Router()

// Configure multer for audio file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads/audio')
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const ext = path.extname(file.originalname)
    cb(null, `audio-${uniqueSuffix}${ext}`)
  },
})

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  // Check if file is audio
  if (file.mimetype.startsWith('audio/')) {
    cb(null, true)
  } else {
    cb(new Error('Only audio files are allowed'))
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
})

// Upload audio file
router.post(
  '/upload',
  auth,
  upload.single('audio'),
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({
          error: 'No file uploaded',
          message: 'Please select an audio file to upload',
        })
        return
      }

      const { title, artist, genre } = req.body

      if (!title) {
        // Clean up uploaded file if validation fails
        fs.unlinkSync(req.file.path)
        res.status(400).json({
          error: 'Missing title',
          message: 'Audio file title is required',
        })
        return
      }

      // Create audio file record
      const audioFile = new AudioFile({
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        title: title.trim(),
        artist: artist?.trim() || undefined,
        genre: genre?.trim() || undefined,
        uploadedAt: new Date(),
      })

      await audioFile.save()

      res.status(201).json({
        message: 'Audio file uploaded successfully',
        audioFile: {
          id: audioFile._id,
          filename: audioFile.filename,
          originalName: audioFile.originalName,
          title: audioFile.title,
          artist: audioFile.artist,
          genre: audioFile.genre,
          size: audioFile.size,
          uploadedAt: audioFile.uploadedAt,
        },
      })
    } catch (error) {
      // Clean up uploaded file if database save fails
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path)
      }

      console.error('Audio upload error:', error)

      if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
          res.status(400).json({
            error: 'File too large',
            message: 'Audio file size cannot exceed 50MB',
          })
          return
        }
      }

      res.status(500).json({
        error: 'Upload failed',
        message: 'An error occurred while uploading the audio file',
      })
    }
  }
)

// Get all audio files
router.get('/', optionalAuth, async (req: Request, res: Response) => {
  try {
    const { genre, limit = '20', page = '1', search } = req.query

    const pageNum = parseInt(page as string, 10)
    const limitNum = parseInt(limit as string, 10)
    const skip = (pageNum - 1) * limitNum

    // Build filter object
    const filter: {
      isActive: boolean
      genre?: string
      $text?: { $search: string }
    } = { isActive: true }
    if (genre) filter.genre = genre as string
    if (search) filter.$text = { $search: search as string }

    const audioFiles = await AudioFile.find(filter)
      .select(
        'filename originalName title artist genre size duration uploadedAt'
      )
      .sort({ uploadedAt: -1 })
      .skip(skip)
      .limit(limitNum)

    const total = await AudioFile.countDocuments(filter)

    res.json({
      audioFiles,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    })
  } catch (error) {
    console.error('Get audio files error:', error)
    res.status(500).json({
      error: 'Failed to fetch audio files',
      message: 'An error occurred while fetching audio files',
    })
  }
})

// Read audio files directly from the local audio-source-files directory and return a simple JSON manifest.
// This endpoint is intended for development/demo usage where audio files live on disk (not in DB).
router.get(
  '/source-files',
  optionalAuth,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const sourceDir = path.join(__dirname, '../../../audio-source-files')

      if (!fs.existsSync(sourceDir)) {
        res.json({ files: [] })
        return
      }

      const files = fs
        .readdirSync(sourceDir)
        .filter((f) => f.toLowerCase().endsWith('.mp3'))
        .map((filename) => ({
          filename,
          // Stream URL that the frontend can use to fetch/stream the file
          url: `/api/audio/source-files/stream/${encodeURIComponent(filename)}`,
        }))

      res.json({ files })
    } catch (error) {
      console.error('List source files error:', error)
      res.status(500).json({
        error: 'Failed to list source files',
        message: 'An error occurred while listing audio source files',
      })
    }
  }
)

// Stream a file from GridFS or fallback to filesystem (supports range requests)
router.get(
  '/source-files/stream/:filename',
  optionalAuth,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { filename } = req.params
      const decoded = decodeURIComponent(filename)

      // First, try to stream from GridFS
      const db = mongoose.connection.db
      if (db) {
        const bucket = new mongoose.mongo.GridFSBucket(db, {
          bucketName: 'audioFiles'
        })

        try {
          // Check if file exists in GridFS
          const files = await bucket.find({ filename: decoded }).toArray()

          if (files.length > 0) {
            const file = files[0]
            const fileSize = file.length
            const range = req.headers.range

            const contentType = decoded.toLowerCase().endsWith('.mp3')
              ? 'audio/mpeg'
              : 'application/octet-stream'

            if (range) {
              // Support for range requests (seeking)
              const parts = range.replace(/bytes=/, '').split('-')
              const start = parseInt(parts[0], 10)
              const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
              const chunksize = end - start + 1

              const downloadStream = bucket.openDownloadStreamByName(decoded, {
                start,
                end: end + 1
              })

              const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': contentType,
              }
              res.writeHead(206, head)
              downloadStream.pipe(res)
              return
            } else {
              // Full file
              const downloadStream = bucket.openDownloadStreamByName(decoded)
              const head = {
                'Content-Length': fileSize,
                'Content-Type': contentType,
                'Accept-Ranges': 'bytes',
              }
              res.writeHead(200, head)
              downloadStream.pipe(res)
              return
            }
          }
        } catch (gridfsError) {
          console.log('File not in GridFS, trying filesystem:', decoded)
        }
      }

      // Fallback to filesystem if not in GridFS
      const sourceDir = path.join(__dirname, '../../../audio-source-files')
      let filePath = path.join(sourceDir, decoded)

      // If file doesn't exist at root level, search in subdirectories
      if (!fs.existsSync(filePath)) {
        const subdirs = fs.readdirSync(sourceDir).filter(item => {
          const itemPath = path.join(sourceDir, item)
          return fs.statSync(itemPath).isDirectory()
        })

        // Search for file in each subdirectory
        let found = false
        for (const subdir of subdirs) {
          const testPath = path.join(sourceDir, subdir, decoded)
          if (fs.existsSync(testPath)) {
            filePath = testPath
            found = true
            break
          }
        }

        if (!found) {
          res.status(404).json({
            error: 'File not found',
            message: 'Requested audio file does not exist in GridFS or on disk',
          })
          return
        }
      }

      const stat = fs.statSync(filePath)
      const fileSize = stat.size
      const range = req.headers.range

      const contentType = decoded.toLowerCase().endsWith('.mp3')
        ? 'audio/mpeg'
        : 'application/octet-stream'

      if (range) {
        const parts = range.replace(/bytes=/, '').split('-')
        const start = parseInt(parts[0], 10)
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
        const chunksize = end - start + 1
        const file = fs.createReadStream(filePath, { start, end })
        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': contentType,
        }
        res.writeHead(206, head)
        file.pipe(res)
      } else {
        const head = {
          'Content-Length': fileSize,
          'Content-Type': contentType,
        }
        res.writeHead(200, head)
        fs.createReadStream(filePath).pipe(res)
      }
    } catch (error) {
      console.error('Stream source file error:', error)
      res.status(500).json({
        error: 'Failed to stream file',
        message: 'An error occurred while streaming the audio file',
      })
    }
  }
)

// Get specific audio file details
router.get(
  '/:id',
  optionalAuth,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params

      const audioFile = await AudioFile.findOne({
        _id: id,
        isActive: true,
      }).select(
        'filename originalName title artist genre size duration uploadedAt'
      )

      if (!audioFile) {
        res.status(404).json({
          error: 'Audio file not found',
          message: 'The requested audio file was not found',
        })
        return
      }

      res.json({ audioFile })
    } catch (error) {
      console.error('Get audio file error:', error)
      res.status(500).json({
        error: 'Failed to fetch audio file',
        message: 'An error occurred while fetching the audio file',
      })
    }
  }
)

// Stream audio file
router.get(
  '/:id/stream',
  optionalAuth,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params

      const audioFile = await AudioFile.findOne({ _id: id, isActive: true })

      if (!audioFile) {
        res.status(404).json({
          error: 'Audio file not found',
          message: 'The requested audio file was not found',
        })
        return
      }

      const filePath = path.join(
        __dirname,
        '../../uploads/audio',
        audioFile.filename
      )

      // Check if file exists on disk
      if (!fs.existsSync(filePath)) {
        res.status(404).json({
          error: 'File not found on disk',
          message: 'The audio file is missing from storage',
        })
        return
      }

      const stat = fs.statSync(filePath)
      const fileSize = stat.size
      const range = req.headers.range

      if (range) {
        // Support for range requests (seeking)
        const parts = range.replace(/bytes=/, '').split('-')
        const start = parseInt(parts[0], 10)
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
        const chunksize = end - start + 1
        const file = fs.createReadStream(filePath, { start, end })
        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': audioFile.mimetype,
        }
        res.writeHead(206, head)
        file.pipe(res)
      } else {
        // Full file
        const head = {
          'Content-Length': fileSize,
          'Content-Type': audioFile.mimetype,
        }
        res.writeHead(200, head)
        fs.createReadStream(filePath).pipe(res)
      }
    } catch (error) {
      console.error('Stream audio error:', error)
      res.status(500).json({
        error: 'Failed to stream audio',
        message: 'An error occurred while streaming the audio file',
      })
    }
  }
)

// Update audio file metadata
router.put('/:id', auth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const { title, artist, genre } = req.body

    if (!title && !artist && !genre) {
      res.status(400).json({
        error: 'No updates provided',
        message:
          'At least one field (title, artist, or genre) must be provided',
      })
      return
    }

    const updateData: Partial<{
      title: string
      artist: string
      genre: string
    }> = {}
    if (title) updateData.title = title.trim()
    if (artist) updateData.artist = artist.trim()
    if (genre) updateData.genre = genre.trim()

    const audioFile = await AudioFile.findOneAndUpdate(
      { _id: id, isActive: true },
      updateData,
      { new: true, runValidators: true }
    ).select(
      'filename originalName title artist genre size duration uploadedAt'
    )

    if (!audioFile) {
      res.status(404).json({
        error: 'Audio file not found',
        message: 'The requested audio file was not found',
      })
      return
    }

    res.json({
      message: 'Audio file updated successfully',
      audioFile,
    })
  } catch (error) {
    console.error('Update audio file error:', error)
    res.status(500).json({
      error: 'Failed to update audio file',
      message: 'An error occurred while updating the audio file',
    })
  }
})

// Delete audio file
router.delete(
  '/:id',
  auth,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params

      const audioFile = await AudioFile.findOne({ _id: id, isActive: true })

      if (!audioFile) {
        res.status(404).json({
          error: 'Audio file not found',
          message: 'The requested audio file was not found',
        })
        return
      }

      // Mark as inactive instead of deleting
      audioFile.isActive = false
      await audioFile.save()

      // Optionally delete the physical file
      const filePath = path.join(
        __dirname,
        '../../uploads/audio',
        audioFile.filename
      )
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }

      res.json({
        message: 'Audio file deleted successfully',
      })
    } catch (error) {
      console.error('Delete audio file error:', error)
      res.status(500).json({
        error: 'Failed to delete audio file',
        message: 'An error occurred while deleting the audio file',
      })
    }
  }
)

// Get audio genres
router.get(
  '/meta/genres',
  optionalAuth,
  async (req: Request, res: Response) => {
    try {
      const genres = await AudioFile.distinct('genre', {
        isActive: true,
        genre: { $ne: null },
      })

      res.json({
        genres: genres.filter((genre) => genre && genre.trim() !== '').sort(),
      })
    } catch (error) {
      console.error('Get genres error:', error)
      res.status(500).json({
        error: 'Failed to fetch genres',
        message: 'An error occurred while fetching audio genres',
      })
    }
  }
)

export default router

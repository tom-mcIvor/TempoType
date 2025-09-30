import express, { Request, Response } from 'express';
import { TypingSession } from '../models/TypingSession';
import { TypingText } from '../models/TypingText';
import { AudioFile } from '../models/AudioFile';
import { auth, optionalAuth } from '../middleware/auth';

const router = express.Router();

// Get all typing texts (with optional filtering)
router.get('/texts', optionalAuth, async (req: Request, res: Response) => {
  try {
    const { difficulty, category, limit = '20', page = '1' } = req.query;
    
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    // Build filter object
    const filter: { isActive: boolean; difficulty?: string; category?: string } = { isActive: true };
    if (difficulty) filter.difficulty = difficulty as string;
    if (category) filter.category = category as string;

    const texts = await TypingText.find(filter)
      .select('title content difficulty category wordCount createdAt')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await TypingText.countDocuments(filter);

    res.json({
      texts,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error('Get texts error:', error);
    res.status(500).json({
      error: 'Failed to fetch texts',
      message: 'An error occurred while fetching typing texts'
    });
  }
});

// Get a specific typing text
router.get('/texts/:id', optionalAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const text = await TypingText.findOne({ _id: id, isActive: true })
      .select('title content difficulty category wordCount createdAt');

    if (!text) {
      res.status(404).json({
        error: 'Text not found',
        message: 'The requested typing text was not found'
      });
      return;
    }

    res.json({ text });
  } catch (error) {
    console.error('Get text error:', error);
    res.status(500).json({
      error: 'Failed to fetch text',
      message: 'An error occurred while fetching the typing text'
    });
  }
});

// Get random typing text (any difficulty)
router.get('/texts/random', optionalAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const filter: { isActive: boolean } = { isActive: true };

    const count = await TypingText.countDocuments(filter);
    if (count === 0) {
      res.status(404).json({
        error: 'No texts found',
        message: 'No typing texts available'
      });
      return;
    }

    const random = Math.floor(Math.random() * count);
    const text = await TypingText.findOne(filter)
      .select('title content difficulty category wordCount createdAt')
      .skip(random);

    res.json({ text });
  } catch (error) {
    console.error('Get random text error:', error);
    res.status(500).json({
      error: 'Failed to fetch random text',
      message: 'An error occurred while fetching a random typing text'
    });
  }
});

// Get random typing text by difficulty
router.get('/texts/random/:difficulty', optionalAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { difficulty } = req.params;
    
    if (!['easy', 'medium', 'hard'].includes(difficulty)) {
      res.status(400).json({
        error: 'Invalid difficulty',
        message: 'Difficulty must be easy, medium, or hard'
      });
      return;
    }

    const filter: { isActive: boolean; difficulty: string } = {
      isActive: true,
      difficulty: difficulty
    };

    const count = await TypingText.countDocuments(filter);
    if (count === 0) {
      res.status(404).json({
        error: 'No texts found',
        message: `No typing texts available for difficulty: ${difficulty}`
      });
      return;
    }

    const random = Math.floor(Math.random() * count);
    const text = await TypingText.findOne(filter)
      .select('title content difficulty category wordCount createdAt')
      .skip(random);

    res.json({ text });
  } catch (error) {
    console.error('Get random text error:', error);
    res.status(500).json({
      error: 'Failed to fetch random text',
      message: 'An error occurred while fetching a random typing text'
    });
  }
});

// Submit typing session results
router.post('/sessions', auth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { textId, audioFileId, wpm, accuracy, duration, errorCount } = req.body;
    const userId = req.user?.userId;

    // Validation
    if (!textId || wpm === undefined || accuracy === undefined || duration === undefined || errorCount === undefined) {
      res.status(400).json({
        error: 'Missing required fields',
        message: 'textId, wpm, accuracy, duration, and errorCount are required'
      });
      return;
    }

    if (wpm < 0 || wpm > 500) {
      res.status(400).json({
        error: 'Invalid WPM',
        message: 'WPM must be between 0 and 500'
      });
      return;
    }

    if (accuracy < 0 || accuracy > 100) {
      res.status(400).json({
        error: 'Invalid accuracy',
        message: 'Accuracy must be between 0 and 100'
      });
      return;
    }

    if (duration < 1) {
      res.status(400).json({
        error: 'Invalid duration',
        message: 'Duration must be at least 1 second'
      });
      return;
    }

    if (errorCount < 0) {
      res.status(400).json({
        error: 'Invalid error count',
        message: 'Error count cannot be negative'
      });
      return;
    }

    // Verify text exists
    const text = await TypingText.findOne({ _id: textId, isActive: true });
    if (!text) {
      res.status(404).json({
        error: 'Text not found',
        message: 'The specified typing text was not found'
      });
      return;
    }

    // Verify audio file exists (if provided)
    if (audioFileId) {
      const audioFile = await AudioFile.findOne({ _id: audioFileId, isActive: true });
      if (!audioFile) {
        res.status(404).json({
          error: 'Audio file not found',
          message: 'The specified audio file was not found'
        });
        return;
      }
    }

    // Create typing session
    const session = new TypingSession({
      userId,
      textId,
      audioFileId: audioFileId || undefined,
      wpm,
      accuracy,
      duration,
      errorCount,
      completedAt: new Date()
    });

    await session.save();

    // Populate the session with text and audio file details
    const populatedSession = await TypingSession.findById(session._id)
      .populate('textId', 'title difficulty category wordCount')
      .populate('audioFileId', 'title artist filename');

    res.status(201).json({
      message: 'Typing session saved successfully',
      session: populatedSession
    });
  } catch (error) {
    console.error('Save session error:', error);
    res.status(500).json({
      error: 'Failed to save session',
      message: 'An error occurred while saving the typing session'
    });
  }
});

// Get user's typing sessions
router.get('/sessions', auth, async (req: Request, res: Response) => {
  try {
    const { limit = '20', page = '1', sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    const userId = req.user?.userId;
    
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    // Build sort object
    const sortObj: Record<string, 1 | -1> = {};
    sortObj[sortBy as string] = sortOrder === 'asc' ? 1 : -1;

    const sessions = await TypingSession.find({ userId })
      .populate('textId', 'title difficulty category wordCount')
      .populate('audioFileId', 'title artist filename')
      .sort(sortObj)
      .skip(skip)
      .limit(limitNum);

    const total = await TypingSession.countDocuments({ userId });

    res.json({
      sessions,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error('Get sessions error:', error);
    res.status(500).json({
      error: 'Failed to fetch sessions',
      message: 'An error occurred while fetching typing sessions'
    });
  }
});

// Get user's typing statistics
router.get('/stats', auth, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    // Get basic stats
    const totalSessions = await TypingSession.countDocuments({ userId });
    
    if (totalSessions === 0) {
      res.json({
        totalSessions: 0,
        averageWpm: 0,
        averageAccuracy: 0,
        bestWpm: 0,
        bestAccuracy: 0,
        totalTimeTyped: 0,
        recentSessions: []
      });
      return;
    }

    // Aggregate statistics
    const stats = await TypingSession.aggregate([
      { $match: { userId: userId } },
      {
        $group: {
          _id: null,
          averageWpm: { $avg: '$wpm' },
          averageAccuracy: { $avg: '$accuracy' },
          bestWpm: { $max: '$wpm' },
          bestAccuracy: { $max: '$accuracy' },
          totalTimeTyped: { $sum: '$duration' }
        }
      }
    ]);

    // Get recent sessions
    const recentSessions = await TypingSession.find({ userId })
      .populate('textId', 'title difficulty')
      .populate('audioFileId', 'title artist')
      .sort({ createdAt: -1 })
      .limit(10);

    const result = {
      totalSessions,
      averageWpm: Math.round(stats[0]?.averageWpm || 0),
      averageAccuracy: Math.round(stats[0]?.averageAccuracy || 0),
      bestWpm: stats[0]?.bestWpm || 0,
      bestAccuracy: stats[0]?.bestAccuracy || 0,
      totalTimeTyped: stats[0]?.totalTimeTyped || 0,
      recentSessions
    };

    res.json(result);
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      error: 'Failed to fetch statistics',
      message: 'An error occurred while fetching typing statistics'
    });
  }
});

// Get leaderboard
router.get('/leaderboard', optionalAuth, async (req: Request, res: Response) => {
  try {
    const { type = 'wpm', limit = '10' } = req.query;
    const limitNum = parseInt(limit as string, 10);

    let sortField = 'wpm';
    if (type === 'accuracy') sortField = 'accuracy';

    // Get top sessions for each user
    const leaderboard = await TypingSession.aggregate([
      {
        $group: {
          _id: '$userId',
          bestWpm: { $max: '$wpm' },
          bestAccuracy: { $max: '$accuracy' },
          totalSessions: { $sum: 1 },
          averageWpm: { $avg: '$wpm' },
          averageAccuracy: { $avg: '$accuracy' }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          username: '$user.username',
          bestWpm: 1,
          bestAccuracy: 1,
          totalSessions: 1,
          averageWpm: { $round: ['$averageWpm', 0] },
          averageAccuracy: { $round: ['$averageAccuracy', 0] }
        }
      },
      {
        $sort: { [sortField === 'wpm' ? 'bestWpm' : 'bestAccuracy']: -1 }
      },
      {
        $limit: limitNum
      }
    ]);

    res.json({
      leaderboard,
      type: sortField
    });
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({
      error: 'Failed to fetch leaderboard',
      message: 'An error occurred while fetching the leaderboard'
    });
  }
});

export default router;
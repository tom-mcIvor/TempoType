import mongoose, { Document, Schema } from 'mongoose';

export interface IAudioFile extends Document {
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  duration?: number;
  title: string;
  artist?: string;
  genre?: string;
  isActive: boolean;
  uploadedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const audioFileSchema = new Schema<IAudioFile>({
  filename: {
    type: String,
    required: [true, 'Filename is required'],
    unique: true,
    trim: true
  },
  originalName: {
    type: String,
    required: [true, 'Original filename is required'],
    trim: true,
    maxlength: [255, 'Original filename cannot exceed 255 characters']
  },
  mimetype: {
    type: String,
    required: [true, 'MIME type is required'],
    enum: {
      values: ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp4', 'audio/aac'],
      message: 'Invalid audio file type'
    }
  },
  size: {
    type: Number,
    required: [true, 'File size is required'],
    min: [1, 'File size must be greater than 0'],
    max: [50 * 1024 * 1024, 'File size cannot exceed 50MB'] // 50MB limit
  },
  duration: {
    type: Number,
    min: [0, 'Duration cannot be negative'],
    max: [3600, 'Duration cannot exceed 1 hour'] // 1 hour limit
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  artist: {
    type: String,
    trim: true,
    maxlength: [100, 'Artist name cannot exceed 100 characters']
  },
  genre: {
    type: String,
    trim: true,
    maxlength: [50, 'Genre cannot exceed 50 characters'],
    index: true
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create indexes for better query performance
audioFileSchema.index({ filename: 1 });
audioFileSchema.index({ isActive: 1, uploadedAt: -1 });
audioFileSchema.index({ genre: 1, isActive: 1 });
audioFileSchema.index({ title: 'text', artist: 'text' }); // Text search index

export const AudioFile = mongoose.model<IAudioFile>('AudioFile', audioFileSchema);
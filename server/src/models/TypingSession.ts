import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ITypingSession extends Document {
  userId: Types.ObjectId;
  textId: Types.ObjectId;
  audioFileId?: Types.ObjectId;
  wpm: number;
  accuracy: number;
  duration: number;
  errorCount: number;
  completedAt: Date;
  createdAt: Date;
}

const typingSessionSchema = new Schema<ITypingSession>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    index: true
  },
  textId: {
    type: Schema.Types.ObjectId,
    ref: 'TypingText',
    required: [true, 'Text ID is required'],
    index: true
  },
  audioFileId: {
    type: Schema.Types.ObjectId,
    ref: 'AudioFile',
    index: true
  },
  wpm: {
    type: Number,
    required: [true, 'WPM is required'],
    min: [0, 'WPM cannot be negative'],
    max: [500, 'WPM seems unrealistic']
  },
  accuracy: {
    type: Number,
    required: [true, 'Accuracy is required'],
    min: [0, 'Accuracy cannot be negative'],
    max: [100, 'Accuracy cannot exceed 100%']
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: [1, 'Duration must be at least 1 second']
  },
  errorCount: {
    type: Number,
    required: [true, 'Error count is required'],
    min: [0, 'Error count cannot be negative']
  },
  completedAt: {
    type: Date,
    required: [true, 'Completion time is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create compound indexes for better query performance
typingSessionSchema.index({ userId: 1, createdAt: -1 });
typingSessionSchema.index({ userId: 1, wpm: -1 });
typingSessionSchema.index({ userId: 1, accuracy: -1 });
typingSessionSchema.index({ textId: 1, createdAt: -1 });

export const TypingSession = mongoose.model<ITypingSession>('TypingSession', typingSessionSchema);
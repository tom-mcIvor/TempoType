import mongoose, { Document, Schema } from 'mongoose';

export interface ITypingText extends Document {
  title: string;
  content: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  wordCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const typingTextSchema = new Schema<ITypingText>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    minlength: [50, 'Content must be at least 50 characters long'],
    maxlength: [50000, 'Content cannot exceed 50000 characters']
  },
  difficulty: {
    type: String,
    required: [true, 'Difficulty is required'],
    enum: {
      values: ['easy', 'medium', 'hard'],
      message: 'Difficulty must be easy, medium, or hard'
    },
    index: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
    maxlength: [50, 'Category cannot exceed 50 characters'],
    index: true
  },
  wordCount: {
    type: Number,
    required: [true, 'Word count is required'],
    min: [1, 'Word count must be at least 1']
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
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

// Pre-save middleware to calculate word count
typingTextSchema.pre('save', function(next) {
  if (this.isModified('content')) {
    // Simple word count calculation
    this.wordCount = this.content.trim().split(/\s+/).length;
  }
  next();
});

// Create indexes for better query performance
typingTextSchema.index({ difficulty: 1, isActive: 1 });
typingTextSchema.index({ category: 1, isActive: 1 });
typingTextSchema.index({ wordCount: 1, isActive: 1 });
typingTextSchema.index({ createdAt: -1 });

export const TypingText = mongoose.model<ITypingText>('TypingText', typingTextSchema);
import express, { Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

// Import routes
import authRoutes from './routes/auth'
import typingRoutes from './routes/typing'
import audioRoutes from './routes/audio'
import userRoutes from './routes/users'

dotenv.config({ path: './server/.env' })

const app = express()

// Middleware
app.use(helmet())
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
)
app.use(morgan('combined'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/typing', typingRoutes)
app.use('/api/audio', audioRoutes)
app.use('/api/users', userRoutes)

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    message: 'TempoType API is running',
    timestamp: new Date().toISOString(),
  })
})

// Error handling middleware
app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack)
  res.status(500).json({
    error: 'Something went wrong!',
    message:
      process.env.NODE_ENV === 'development'
        ? err.message
        : 'Internal server error',
  })
})

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
  })
})

// Database connection
const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/tempotype'
    )
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error('Database connection error:', error)
    process.exit(1)
  }
}

// Start server
const PORT = process.env.PORT || 3001

const startServer = async (): Promise<void> => {
  await connectDB()
  app.listen(PORT, () => {
    console.log(`🚀 TempoType API server running on port ${PORT}`)
    console.log(
      `📱 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`
    )
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)
  })
}

startServer()

export default app

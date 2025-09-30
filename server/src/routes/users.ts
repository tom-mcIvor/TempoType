import express, { Request, Response } from 'express'
import { User } from '../models/User'
import { TypingSession } from '../models/TypingSession'
import { auth } from '../middleware/auth'

const router = express.Router()

// Get user profile by ID (public info only)
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params

    const user = await User.findById(id).select('username createdAt lastLogin')

    if (!user) {
      res.status(404).json({
        error: 'User not found',
        message: 'The requested user was not found',
      })
      return
    }

    // Get basic typing statistics
    const totalSessions = await TypingSession.countDocuments({ userId: id })

    let stats = {
      totalSessions: 0,
      averageWpm: 0,
      bestWpm: 0,
      averageAccuracy: 0,
      bestAccuracy: 0,
    }

    if (totalSessions > 0) {
      const sessionStats = await TypingSession.aggregate([
        { $match: { userId: id } },
        {
          $group: {
            _id: null,
            averageWpm: { $avg: '$wpm' },
            averageAccuracy: { $avg: '$accuracy' },
            bestWpm: { $max: '$wpm' },
            bestAccuracy: { $max: '$accuracy' },
          },
        },
      ])

      if (sessionStats.length > 0) {
        stats = {
          totalSessions,
          averageWpm: Math.round(sessionStats[0].averageWpm || 0),
          bestWpm: sessionStats[0].bestWpm || 0,
          averageAccuracy: Math.round(sessionStats[0].averageAccuracy || 0),
          bestAccuracy: sessionStats[0].bestAccuracy || 0,
        }
      }
    }

    res.json({
      user: {
        id: user._id,
        username: user.username,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin,
      },
      stats,
    })
  } catch (error) {
    console.error('Get user profile error:', error)
    res.status(500).json({
      error: 'Failed to fetch user profile',
      message: 'An error occurred while fetching the user profile',
    })
  }
})

// Get user's public typing sessions
router.get(
  '/:id/sessions',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      const { limit = '10', page = '1' } = req.query

      const pageNum = parseInt(page as string, 10)
      const limitNum = parseInt(limit as string, 10)
      const skip = (pageNum - 1) * limitNum

      // Verify user exists
      const user = await User.findById(id).select('username')
      if (!user) {
        res.status(404).json({
          error: 'User not found',
          message: 'The requested user was not found',
        })
        return
      }

      const sessions = await TypingSession.find({ userId: id })
        .populate('textId', 'title difficulty category')
        .populate('audioFileId', 'title artist')
        .select('wpm accuracy duration errorCount completedAt createdAt')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)

      const total = await TypingSession.countDocuments({ userId: id })

      res.json({
        user: {
          id: user._id,
          username: user.username,
        },
        sessions,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum),
        },
      })
    } catch (error) {
      console.error('Get user sessions error:', error)
      res.status(500).json({
        error: 'Failed to fetch user sessions',
        message: 'An error occurred while fetching user sessions',
      })
    }
  }
)

// Search users
router.get('/', async (req: Request, res: Response) => {
  try {
    const { search, limit = '20', page = '1' } = req.query

    const pageNum = parseInt(page as string, 10)
    const limitNum = parseInt(limit as string, 10)
    const skip = (pageNum - 1) * limitNum

    let filter = {}
    if (search) {
      filter = {
        username: { $regex: search as string, $options: 'i' },
      }
    }

    const users = await User.find(filter)
      .select('username createdAt lastLogin')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)

    const total = await User.countDocuments(filter)

    // Get basic stats for each user
    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const totalSessions = await TypingSession.countDocuments({
          userId: user._id,
        })

        let stats = {
          totalSessions: 0,
          bestWpm: 0,
          bestAccuracy: 0,
        }

        if (totalSessions > 0) {
          const sessionStats = await TypingSession.aggregate([
            { $match: { userId: user._id } },
            {
              $group: {
                _id: null,
                bestWpm: { $max: '$wpm' },
                bestAccuracy: { $max: '$accuracy' },
              },
            },
          ])

          if (sessionStats.length > 0) {
            stats = {
              totalSessions,
              bestWpm: sessionStats[0].bestWpm || 0,
              bestAccuracy: sessionStats[0].bestAccuracy || 0,
            }
          }
        }

        return {
          id: user._id,
          username: user.username,
          createdAt: user.createdAt,
          lastLogin: user.lastLogin,
          stats,
        }
      })
    )

    res.json({
      users: usersWithStats,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    })
  } catch (error) {
    console.error('Search users error:', error)
    res.status(500).json({
      error: 'Failed to search users',
      message: 'An error occurred while searching users',
    })
  }
})

// Delete user account (authenticated user only)
router.delete(
  '/me',
  auth,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId

      // Delete user's typing sessions
      await TypingSession.deleteMany({ userId })

      // Delete user account
      const user = await User.findByIdAndDelete(userId)

      if (!user) {
        res.status(404).json({
          error: 'User not found',
          message: 'User account not found',
        })
        return
      }

      res.json({
        message: 'User account deleted successfully',
      })
    } catch (error) {
      console.error('Delete user error:', error)
      res.status(500).json({
        error: 'Failed to delete user',
        message: 'An error occurred while deleting the user account',
      })
    }
  }
)

// Get user statistics comparison
router.get(
  '/:id/compare/:compareId',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id, compareId } = req.params

      // Verify both users exist
      const [user1, user2] = await Promise.all([
        User.findById(id).select('username'),
        User.findById(compareId).select('username'),
      ])

      if (!user1 || !user2) {
        res.status(404).json({
          error: 'User not found',
          message: 'One or both users were not found',
        })
        return
      }

      // Get stats for both users
      const [stats1, stats2] = await Promise.all([
        TypingSession.aggregate([
          { $match: { userId: id } },
          {
            $group: {
              _id: null,
              totalSessions: { $sum: 1 },
              averageWpm: { $avg: '$wpm' },
              averageAccuracy: { $avg: '$accuracy' },
              bestWpm: { $max: '$wpm' },
              bestAccuracy: { $max: '$accuracy' },
              totalTimeTyped: { $sum: '$duration' },
            },
          },
        ]),
        TypingSession.aggregate([
          { $match: { userId: compareId } },
          {
            $group: {
              _id: null,
              totalSessions: { $sum: 1 },
              averageWpm: { $avg: '$wpm' },
              averageAccuracy: { $avg: '$accuracy' },
              bestWpm: { $max: '$wpm' },
              bestAccuracy: { $max: '$accuracy' },
              totalTimeTyped: { $sum: '$duration' },
            },
          },
        ]),
      ])

      const formatStats = (
        stats: Array<{
          totalSessions?: number
          averageWpm?: number
          averageAccuracy?: number
          bestWpm?: number
          bestAccuracy?: number
          totalTimeTyped?: number
        }>
      ) => {
        if (stats.length === 0) {
          return {
            totalSessions: 0,
            averageWpm: 0,
            averageAccuracy: 0,
            bestWpm: 0,
            bestAccuracy: 0,
            totalTimeTyped: 0,
          }
        }

        const s = stats[0]
        return {
          totalSessions: s.totalSessions || 0,
          averageWpm: Math.round(s.averageWpm || 0),
          averageAccuracy: Math.round(s.averageAccuracy || 0),
          bestWpm: s.bestWpm || 0,
          bestAccuracy: s.bestAccuracy || 0,
          totalTimeTyped: s.totalTimeTyped || 0,
        }
      }

      res.json({
        comparison: {
          user1: {
            id: user1._id,
            username: user1.username,
            stats: formatStats(stats1),
          },
          user2: {
            id: user2._id,
            username: user2.username,
            stats: formatStats(stats2),
          },
        },
      })
    } catch (error) {
      console.error('Compare users error:', error)
      res.status(500).json({
        error: 'Failed to compare users',
        message: 'An error occurred while comparing users',
      })
    }
  }
)

export default router

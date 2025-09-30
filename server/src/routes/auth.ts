import express, { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../models/User'
import { auth, optionalAuth } from '../middleware/auth'

const router = express.Router()

// Register
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body

    // Validation
    if (!username || !email || !password) {
      res.status(400).json({
        error: 'Missing required fields',
        message: 'Username, email, and password are required',
      })
      return
    }

    if (password.length < 6) {
      res.status(400).json({
        error: 'Invalid password',
        message: 'Password must be at least 6 characters long',
      })
      return
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    })

    if (existingUser) {
      res.status(400).json({
        error: 'User already exists',
        message:
          existingUser.email === email
            ? 'Email already registered'
            : 'Username already taken',
      })
      return
    }

    // Hash password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create user
    const user = new User({
      username,
      email,
      password: hashedPassword,
    })

    await user.save()

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: '7d' }
    )

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      },
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({
      error: 'Registration failed',
      message: 'An error occurred during registration',
    })
  }
})

// Login
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body

    // Validation
    if (!email || !password) {
      res.status(400).json({
        error: 'Missing credentials',
        message: 'Email and password are required',
      })
      return
    }

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      res.status(401).json({
        error: 'Invalid credentials',
        message: 'Email or password is incorrect',
      })
      return
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      res.status(401).json({
        error: 'Invalid credentials',
        message: 'Email or password is incorrect',
      })
      return
    }

    // Update last login
    user.lastLogin = new Date()
    await user.save()

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: '7d' }
    )

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      error: 'Login failed',
      message: 'An error occurred during login',
    })
  }
})

// Get current user profile
router.get('/me', auth, async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?.userId).select('-password')
    if (!user) {
      res.status(404).json({
        error: 'User not found',
        message: 'User profile not found',
      })
      return
    }

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
      },
    })
  } catch (error) {
    console.error('Profile fetch error:', error)
    res.status(500).json({
      error: 'Profile fetch failed',
      message: 'An error occurred while fetching profile',
    })
  }
})

// Update user profile
router.put('/me', auth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email } = req.body
    const userId = req.user?.userId

    // Validation
    if (!username && !email) {
      res.status(400).json({
        error: 'No updates provided',
        message: 'At least one field (username or email) must be provided',
      })
      return
    }

    // Check if username/email already exists (excluding current user)
    const existingUser = await User.findOne({
      _id: { $ne: userId },
      $or: [...(username ? [{ username }] : []), ...(email ? [{ email }] : [])],
    })

    if (existingUser) {
      res.status(400).json({
        error: 'Conflict',
        message:
          existingUser.username === username
            ? 'Username already taken'
            : 'Email already registered',
      })
      return
    }

    // Update user
    const updateData: Partial<{ username: string; email: string }> = {}
    if (username) updateData.username = username
    if (email) updateData.email = email

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    }).select('-password')

    if (!user) {
      res.status(404).json({
        error: 'User not found',
        message: 'User profile not found',
      })
      return
    }

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
      },
    })
  } catch (error) {
    console.error('Profile update error:', error)
    res.status(500).json({
      error: 'Profile update failed',
      message: 'An error occurred while updating profile',
    })
  }
})

// Change password
router.put(
  '/change-password',
  auth,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { currentPassword, newPassword } = req.body
      const userId = req.user?.userId

      // Validation
      if (!currentPassword || !newPassword) {
        res.status(400).json({
          error: 'Missing passwords',
          message: 'Current password and new password are required',
        })
        return
      }

      if (newPassword.length < 6) {
        res.status(400).json({
          error: 'Invalid password',
          message: 'New password must be at least 6 characters long',
        })
        return
      }

      // Find user
      const user = await User.findById(userId)
      if (!user) {
        res.status(404).json({
          error: 'User not found',
          message: 'User profile not found',
        })
        return
      }

      // Verify current password
      const isValidPassword = await bcrypt.compare(
        currentPassword,
        user.password
      )
      if (!isValidPassword) {
        res.status(401).json({
          error: 'Invalid password',
          message: 'Current password is incorrect',
        })
        return
      }

      // Hash new password
      const saltRounds = 12
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds)

      // Update password
      user.password = hashedPassword
      await user.save()

      res.json({
        message: 'Password changed successfully',
      })
    } catch (error) {
      console.error('Password change error:', error)
      res.status(500).json({
        error: 'Password change failed',
        message: 'An error occurred while changing password',
      })
    }
  }
)

// Logout (client-side token removal, but we can track it server-side if needed)
router.post('/logout', optionalAuth, async (req: Request, res: Response) => {
  try {
    // In a more sophisticated setup, you might want to blacklist the token
    // For now, we'll just send a success response
    res.json({
      message: 'Logout successful',
    })
  } catch (error) {
    console.error('Logout error:', error)
    res.status(500).json({
      error: 'Logout failed',
      message: 'An error occurred during logout',
    })
  }
})

export default router

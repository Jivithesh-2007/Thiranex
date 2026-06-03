const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');
const { validationErrorHandler } = require('../middleware/validation');

const router = express.Router();

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters')
      .matches(/[A-Z]/)
      .withMessage('Password must contain at least one uppercase letter')
      .matches(/[a-z]/)
      .withMessage('Password must contain at least one lowercase letter')
      .matches(/[0-9]/)
      .withMessage('Password must contain at least one number'),
    body('confirmPassword').notEmpty().withMessage('Please confirm your password')
  ],
  validationErrorHandler,
  authController.register
);

/**
 * POST /api/auth/login
 * Login user
 */
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  validationErrorHandler,
  authController.login
);

/**
 * GET /api/auth/profile
 * Get user profile (protected)
 */
router.get('/profile', authMiddleware, authController.getProfile);

/**
 * POST /api/auth/logout
 * Logout user (protected)
 */
router.post('/logout', authMiddleware, authController.logout);

module.exports = router;

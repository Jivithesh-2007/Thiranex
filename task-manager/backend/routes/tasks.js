const express = require('express');
const { body, param } = require('express-validator');
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/auth');
const { validationErrorHandler } = require('../middleware/validation');

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

/**
 * GET /api/tasks
 * Get all tasks for authenticated user
 */
router.get('/', taskController.getTasks);

/**
 * POST /api/tasks
 * Create a new task
 */
router.post(
  '/',
  [
    body('title').trim().notEmpty().withMessage('Task title is required'),
    body('description').optional().trim(),
    body('dueDate').optional().isISO8601().withMessage('Invalid due date'),
    body('priority')
      .optional()
      .isIn(['low', 'medium', 'high'])
      .withMessage('Priority must be low, medium, or high'),
    body('category')
      .optional()
      .isIn(['work', 'personal', 'urgent', 'other'])
      .withMessage('Category must be work, personal, urgent, or other')
  ],
  validationErrorHandler,
  taskController.createTask
);

/**
 * GET /api/tasks/:id
 * Get a single task
 */
router.get('/:id', taskController.getTaskById);

/**
 * PUT /api/tasks/:id
 * Update a task
 */
router.put(
  '/:id',
  [
    body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
    body('description').optional().trim(),
    body('dueDate').optional().isISO8601().withMessage('Invalid due date'),
    body('priority')
      .optional()
      .isIn(['low', 'medium', 'high'])
      .withMessage('Priority must be low, medium, or high'),
    body('category')
      .optional()
      .isIn(['work', 'personal', 'urgent', 'other'])
      .withMessage('Category must be work, personal, urgent, or other'),
    body('completed').optional().isBoolean().withMessage('Completed must be a boolean')
  ],
  validationErrorHandler,
  taskController.updateTask
);

/**
 * DELETE /api/tasks/:id
 * Delete a task
 */
router.delete('/:id', taskController.deleteTask);

/**
 * PUT /api/tasks/:id/toggle
 * Toggle task completion status
 */
router.put('/:id/toggle', taskController.toggleTask);

module.exports = router;

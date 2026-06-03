const Task = require('../models/Task');
const { validationResult } = require('express-validator');

/**
 * Get all tasks for a user
 * GET /api/tasks
 */
exports.getTasks = async (req, res, next) => {
  try {
    const { status, sort = 'date', search } = req.query;

    // Build query
    let query = { userId: req.userId };

    // Filter by status
    if (status === 'pending') {
      query.completed = false;
    } else if (status === 'completed') {
      query.completed = true;
    }

    // Search by title
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    // Build sort object
    let sortObj = { createdAt: -1 }; // default: newest first
    if (sort === 'priority') {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      // Note: For complex sorting with priority, we'll fetch and sort in memory
      // In production, consider using aggregation pipeline
    } else if (sort === 'title') {
      sortObj = { title: 1 };
    }

    let tasks = await Task.find(query).sort(sortObj);

    // Handle priority sorting if needed
    if (sort === 'priority') {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get a single task
 * GET /api/tasks/:id
 */
exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      task
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Create a new task
 * POST /api/tasks
 */
exports.createTask = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { title, description, dueDate, priority, category } = req.body;

    const task = new Task({
      userId: req.userId,
      title,
      description,
      dueDate,
      priority: priority || 'medium',
      category: category || 'other'
    });

    await task.save();

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      task
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Update a task
 * PUT /api/tasks/:id
 */
exports.updateTask = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    let task = await Task.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    const { title, description, dueDate, priority, category, completed } = req.body;

    // Update fields
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (dueDate !== undefined) task.dueDate = dueDate;
    if (priority !== undefined) task.priority = priority;
    if (category !== undefined) task.category = category;
    if (completed !== undefined) {
      task.completed = completed;
      task.completedAt = completed ? Date.now() : null;
    }

    await task.save();

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      task
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Delete a task
 * DELETE /api/tasks/:id
 */
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Toggle task completion status
 * PUT /api/tasks/:id/toggle
 */
exports.toggleTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Toggle completion
    task.completed = !task.completed;
    task.completedAt = task.completed ? Date.now() : null;

    await task.save();

    res.status(200).json({
      success: true,
      message: 'Task toggled successfully',
      task
    });
  } catch (err) {
    next(err);
  }
};

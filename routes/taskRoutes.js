import express from 'express';
import { deleteTask, updateTask, addTask, getTask, getTaskById } from '../controllers/taskController.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

// GET /api/posts
router.get('/', verifyToken, getTask);

// GET /api/posts/[postId]
router.get('/:postId', verifyToken, getTaskById);

// POST /api/posts
router.post('/', verifyToken, addTask);

// PUT /api/posts/[postId]
router.put('/:postId', verifyToken, updateTask);

// DELETE /api/posts/[postId]
router.delete('/:postId', verifyToken, deleteTask);

export default router;
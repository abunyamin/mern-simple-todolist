import express from 'express';
import { getUser, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

// GET /api/users
router.get('/', getUser);

// GET /api/users/[userId]
router.get('/:userId', getUserById);

// PUT /api/users/[userId]
router.put('/:userId', verifyToken, updateUser );

// DELETE /api/users/[userId]
router.delete('/:userId', verifyToken, deleteUser);

export default router;
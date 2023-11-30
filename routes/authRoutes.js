import express from 'express';
import { signin, protect, signup, signout, me } from '../controllers/authController.js';
import { verifyToken } from '../verifyToken.js';
const router = express.Router();

// SIGNUP
router.post('/signup', signup);

// SIGNIN
router.post('/signin', signin);

// SIGNOUT
router.get('/signout', verifyToken, signout);

//PROTECTED
router.get('/protected', verifyToken, protect);

// GET DATA
router.get('/me', verifyToken, me);

export default router;

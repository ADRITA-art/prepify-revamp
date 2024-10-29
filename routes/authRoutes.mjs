// routes/authRoutes.js
import express from 'express';
import { signup, login } from '../controller/authController.mjs';

const router = express.Router();

// Signup route
router.post('/signup', signup);
router.post('/login', login);

export default router;

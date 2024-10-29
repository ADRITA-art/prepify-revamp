// routes/authRoutes.js
import express from 'express';
import { signup } from '../controller/authController.mjs';

const router = express.Router();

// Signup route
router.post('/signup', signup);

export default router;

import express from 'express';
import auth from '../middleware/auth.mjs';
import { createArticle, getUserArticles } from '../controller/articleController.mjs';

const router = express.Router();

router.post('/articlesgen', auth, createArticle);

router.get('/articlesgen', auth, getUserArticles);

export default router;

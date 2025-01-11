import express from 'express';
import { create } from './feedback.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = express.Router();

//Create feedback route
router.post('/', authenticate as any, create);

export default router;
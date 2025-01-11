import express from 'express';
import { create, index } from './feedback.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = express.Router();

//Create feedback route
router.post('/', authenticate as any, create);
//Get feedbacks route
router.get('/', authenticate as any, index);

export default router;
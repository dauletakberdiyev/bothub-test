import express from 'express';
import { authenticate } from '../../middleware/auth.middleware';
import { index } from './category.controller';

const router = express.Router();

//Get categories route
router.get('/', authenticate as any, index);

export default router;
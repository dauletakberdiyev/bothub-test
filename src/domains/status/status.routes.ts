import express from 'express';
import { authenticate } from '../../middleware/auth.middleware';
import { index } from './status.controller';

const router = express.Router();

//Get statuses route
router.get('/', authenticate as any, index);

export default router;
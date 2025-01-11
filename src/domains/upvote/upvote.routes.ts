import express from 'express';
import { authenticate } from '../../middleware/auth.middleware';
import { voteUp } from './upvote.controller';

const router = express.Router();

//Vote up route
router.post('/', authenticate as any, voteUp);

export default router;
import express from 'express';
import { profile } from './user.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = express.Router();

//Show logged user profile route
router.get('/profile', authenticate as any, profile);

export default router;
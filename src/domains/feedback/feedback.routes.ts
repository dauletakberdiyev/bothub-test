import express from 'express';
import { create, index, remove, update, show } from './feedback.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = express.Router();

//Create feedback route
router.post('/', authenticate as any, create);
//Get feedbacks route
router.get('/', authenticate as any, index);
//Delete feedback route
router.delete('/:id', authenticate as any, remove);
//Update feedback route
router.put('/:id', authenticate as any, update);
//Show feedback route
router.get('/:id', authenticate as any, show);

export default router;
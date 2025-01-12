import { Request, Response } from 'express';
import { vote } from './upvote.service';

/**
 * @swagger
 * /upvote:
 *   post:
 *     summary: Vote up a feedback
 *     tags: 
 *      - Upvote
 *     parameters:
 *      - name: Authorization
 *        in: header
 *        required: true
 *        description: Bearer token
 *        schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               feedbackId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *      200:
 *       description: Vote up successfully
 *       content:
 *        application/json:
 *         schema:
 *          type: object
 *          properties:
 *           message: 
 *            type: string
 *            example: Vote up successfully
 *           data:
 *            type: object
 *            properties:
 *             id:
 *              type: integer
 *              example: 1
 *             feedback_id:
 *              type: integer
 *              example: 1
 *             user_id:
 *              type: integer
 *              example: 1
 *             creted_at:
 *              type: string
 *              example: 2021-09-01T00:00:00.000Z
 */
export const voteUp = async (req: Request, res: Response) => {
    try {
        const { feedbackId } = req.body;
        const userId = req.user!.id;
        
        const userVote = await vote(feedbackId, userId);

        res.status(200).json({
            message: 'Vote up successfully',
            data: userVote,
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        })
    }
}
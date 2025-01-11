import { Request, Response } from 'express';
import { vote } from './upvote.service';

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
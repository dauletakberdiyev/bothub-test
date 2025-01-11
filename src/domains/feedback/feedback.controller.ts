import { Request, Response } from "express";
import { createFeedback, getFeedbacks } from "./feedback.service";

export const create = async (req: Request, res: Response) => {
    try{    
        const { title, description, category, status } = req.body;
        const author_id = req.user!.id;

        const feedback = await createFeedback(title, description, category, status, author_id);

        res.status(200).json({
            message: 'Feedback created',
            data: feedback,
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        })
    }
}

export const index = async (req: Request, res: Response) => {
    try {
        const feedbacks = await getFeedbacks();

        res.status(200).json({
            message: 'Feedback fetched',
            data: feedbacks,
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        })
    }
}
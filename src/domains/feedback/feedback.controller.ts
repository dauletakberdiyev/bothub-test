import { Request, Response } from "express";
import { createFeedback } from "./feedback.service";

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
import { Request, Response } from "express";
import { createFeedback, deleteFeedback, getFeedbacks, updateFeedback } from "./feedback.service";

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
        const feedbacks = await getFeedbacks(req);

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
};

export const remove = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await deleteFeedback(parseInt(id), req.user!.id);

        res.status(200).json({
            message: 'Feedback deleted',
            data: [],
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        })
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, description, category, status } = req.body;

        const updatedFeedback = await updateFeedback(parseInt(id), title, description, category, status, req.user!.id);

        res.status(200).json({
            message: 'Feedback updated',
            data: updatedFeedback,
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        })
    }
}
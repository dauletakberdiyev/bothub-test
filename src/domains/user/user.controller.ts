import { Request, Response } from "express";

export const profile = async (req: Request, res: Response) => {
    try{
        res.status(200).json({
            message: 'User profile',
            data: req.user,
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        })
    }
}
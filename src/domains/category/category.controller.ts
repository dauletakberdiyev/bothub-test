import { Request, Response } from 'express';
import { getCategories } from './category.service';

export const index = async (req: Request, res: Response) => {
    try{
        const categories = await getCategories();

        res.status(200).json({
            message: 'Categories fetched',
            data: categories,
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        })
    }
}
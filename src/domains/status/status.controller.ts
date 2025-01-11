import { Request, Response } from 'express';
import { getStatuses } from './status.service';

export const index = async (req: Request, res: Response) => {
    try{
        const statuses = await getStatuses();

        res.status(200).json({
            message: 'Statuses fetched',
            data: statuses,
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        })
    }
}
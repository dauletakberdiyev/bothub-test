import { Request, Response } from 'express';
import { getStatuses } from './status.service';

/**
 * @swagger
 * /status:
 *   get:
 *     summary: Get all statuses
 *     tags: 
 *      - Status
 *     parameters:
 *      - name: Authorization
 *        in: header
 *        required: true
 *        description: Bearer token
 *        schema:
 *           type: string
 *     responses:
 *      200:
 *       description: Statuses fetched
 *       content:
 *        application/json:
 *         schema:
 *          type: object
 *          properties:
 *           message: 
 *            type: string
 *            example: Statuses fetched
 *           data:
 *            type: array
 *            items:
 *             type: object
 *             properties:
 *              id:
 *               type: integer
 *               example: 1
 *              title:
 *               type: string
 *               example: Open
 */
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
import { Request, Response } from 'express';
import { getCategories } from './category.service';

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get all categories
 *     tags: 
 *      - Category
 *     parameters:
 *      - name: Authorization
 *        in: header
 *        required: true
 *        description: Bearer token
 *        schema:
 *           type: string
 *     responses:
 *      200:
 *       description: Categories fetched
 *       content:
 *        application/json:
 *         schema:
 *          type: object
 *          properties:
 *           message: 
 *            type: string
 *            example: Categories fetched
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
 *               example: Category 1
 */
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
import { Request, Response } from "express";

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get user profile
 *     tags: 
 *      - User
 *     parameters:
 *      - name: Authorization
 *        in: header
 *        required: true
 *        description: Bearer token
 *        schema:
 *           type: string
 *     responses:
 *      200:
 *       description: User profile
 *       content:
 *        application/json:
 *         schema:
 *          type: object
 *          properties:
 *           message: 
 *            type: string
 *            example: User profile
 *           data:
 *            type: object
 *            properties:
 *             id:
 *              type: integer
 *              example: 1
 *             email:
 *              type: string
 *              example: some@gmail.com
 *             avatar:
 *              type: string
 *              example: someavatar
 */
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
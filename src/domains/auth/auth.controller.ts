import { Request, Response } from "express";
import { registerUser, loginUser } from "./auth.service";

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: 
 *      - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: some@gmail.com
 *               password:
 *                 type: string
 *                 example: somepassword
 *               avatar:
 *                 type: string
 *                 example: someavatar
 *     responses:
 *      201:
 *       description: User created successfully
 *       content:
 *        application/json:
 *         schema:
 *          type: object
 *          properties:
 *           message: 
 *            type: string
 *            example: User created successfully
 *           data:
 *            type: object
 *            properties:
 *             id:
 *              type: integer
 *              example: 1
 *             email:
 *              type: string
 *              example: some@gmail.com
 */
export const register = async (req: Request, res: Response) => {
    try{
        const { email, password, avatar } = req.body;
        
        const user = await registerUser(email, password, avatar);

        res.status(201).json({
            message: 'User created successfully',   
            data: user
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        })
    }
};

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: 
 *      - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: some@gmail.com
 *               password:
 *                 type: string
 *                 example: somepassword
 *     responses:
 *      200:
 *       description: User login successfully
 *       content:
 *        application/json:
 *         schema:
 *          type: object
 *          properties:
 *           message: 
 *            type: string
 *            example: User successfully login
 *           data:
 *            type: object
 *            properties:
 *             email:
 *              type: string
 *              example: some@gmail.com
 *             token_type:
 *              type: string
 *              example: Bearer
 *             token:
 *              type: string
 *              example: TOKEN     
 */
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        
        const token = await loginUser(email, password);

        res.status(202).json({
            message: 'User successfully login',
            data: {
                email: email,
                tokent_type: 'Bearer',
                token: token,   
            }
        });

    } catch (error: any) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        })
    }    
}
import { Request, Response } from "express";
import { registerUser, loginUser } from "./auth.service";

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
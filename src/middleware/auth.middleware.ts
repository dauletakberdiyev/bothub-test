import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import prisma from "../prisma/prisma";

interface JwtPayloadWithId {
    id: number;
    email: string;
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]; // Get token from the header
    
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayloadWithId;
    
        // Attach user to the request
        const user = await prisma.user.findUnique({
          where: { id: decoded.id },
          select: { id: true, email: true, avatar: true },
        });
    
        if (!user) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
    
        req.user = user; // Attach the logged-in user to the request
        next();
      } catch (error) {
        next(error);
      }
}
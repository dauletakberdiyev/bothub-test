import { Request } from 'express';
import { User } from '@prisma/client'; // Adjust based on your user model

export declare module 'express-serve-static-core' {
  interface Request {
    user?: UserWithoutPassword; // Add the custom user property 
  }
}

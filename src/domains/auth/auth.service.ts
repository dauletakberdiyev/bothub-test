import prisma from "../../prisma/prisma";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export const registerUser = async (email: string, password: string, avatar: string)  => {
    const userExists = await prisma.user.findUnique({
        where: { email }
    });

    if (userExists) {
        throw new Error('User already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            avatar, 
        },
        select: {
            id: true,
            email: true, 
        }
    });

    return user;
}

export const loginUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error ('Invalid credentials.');
    }

    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY as string, {expiresIn: '2h'});

    return token;
}
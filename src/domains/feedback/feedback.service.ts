import { getPaginationParams } from "../../helpers/helper";
import { Request } from 'express';
import prisma from "../../prisma/prisma";

export const createFeedback = async (title: string, description: string, category: number, status: number, author_id: number) => {
    const feedback = await prisma.feedback.create({
        data: {
            title,
            description,
            category_id: category,
            status_id: status,
            author_id,
        },
        select: {
            id: true,
            title: true,
            description: true,
            category: {
                select: {
                    id: true,
                    title: true,
                }
            },
            Status: {
                select: {
                    id: true,
                    title: true,
                }
            },
            author: {
                select: {
                    id: true,
                    email: true,
               }
            }
        }
    });

    return feedback;
};

export const getFeedbacks = async (req: Request) => {
    const { page, limit } = getPaginationParams(req);

    // Get the total number of users
    const feedbackCount = await prisma.feedback.count();

    // Calculate the offset based on page and limit
    const offset = (page - 1) * limit;

    const feedbacks = await prisma.feedback.findMany({
        skip: offset,
        take: limit,
        select: {
            id: true,
            title: true,
            description: true,
            category: {
                select: {
                    id: true,
                    title: true,
                }
            },
            Status: {
                select: {
                    id: true,
                    title: true,
                }
            },
            author: {
                select: {
                    id: true,
                    email: true,
               }
            }
        }
    });

    // Calculate total pages
    const totalPages = Math.ceil(feedbackCount / limit);

    return {
        page,
        limit,
        totalPages,
        total: feedbackCount,
        data: feedbacks,
    };
}

export const deleteFeedback = async (id: number) => {
    const feedback = await prisma.feedback.delete({
        where: {id}
    });
}
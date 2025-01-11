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

export const getFeedbacks = async () => {
    const feedbacks = await prisma.feedback.findMany({
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

    return feedbacks;
}
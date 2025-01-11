import prisma from "../../prisma/prisma";

export const vote = async (feedbackId: number, userId: number) => {
    const vote = await prisma.upvote.create({
        data: {
            feedback_id: feedbackId,
            user_id: userId,
        }
    });

    return vote;
};
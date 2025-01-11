import prisma from "../../prisma/prisma"

export const getStatuses = async () => {
    return await prisma.status.findMany();
}
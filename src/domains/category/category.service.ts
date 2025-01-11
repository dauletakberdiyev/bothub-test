import prisma from "../../prisma/prisma"

export const getCategories = async () => {
    return await prisma.category.findMany();
}
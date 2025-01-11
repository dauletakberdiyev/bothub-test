import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../types/pagination.type";
import { Request } from 'express';

export const getPaginationParams = (req: Request) => {
    const page = parseInt(req.query.page as string) || DEFAULT_PAGE;
    const limit = parseInt(req.query.limit as string) || DEFAULT_LIMIT;
    return { page, limit };
}
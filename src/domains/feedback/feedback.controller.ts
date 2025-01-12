import { Request, Response } from "express";
import { createFeedback, deleteFeedback, getFeedbacks, updateFeedback, getFeedback } from "./feedback.service";

/**
 * @swagger
 * components:
 *   schemas:
 *     indexFeedback:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *           description: The current page number
 *         limit:
 *           type: integer
 *           description: Limit of feedbacks per page
 *         totalPages:
 *           type: integer
 *           description: Total number of pages
 *         total:
 *           type: integer
 *           description: Total number of feedbacks
 *         data:
 *           type: array
 *           items:
 *            type: object
 *            properties:
 *             id:
 *              type: integer
 *              example: 1
 *             title:
 *              type: string
 *              example: Feedback title
 *             description:
 *              type: string
 *              example: Feedback description
 *             created_at:
 *              type: string    
 *              example: 2021-09-01T00:00:00.000Z
 *             category:
 *              type: object
 *              properties:  
 *               id:       
 *                type: integer
 *                example: 1
 *               title:
 *                type: string
 *                example: UI
 *             status:
 *              type: object
 *              properties:  
 *               id:       
 *                type: integer
 *                example: 1
 *               title:
 *                type: string
 *                example: Open
 *             author:
 *              type: object
 *              properties:  
 *               id:       
 *                type: integer
 *                example: 1
 *               email:
 *                type: string
 *                example: some@gmail.com
 *             _count:
 *              type: object
 *              properties:  
 *               upvotes:       
 *                type: integer
 *                example: 1
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     showFeedback:
 *      type: object
 *      properties:
 *       id:
 *        type: integer
 *        example: 1
 *       title:
 *        type: string
 *        example: Feedback title
 *       description:
 *        type: string
 *        example: Feedback description
 *       created_at:
 *        type: string
 *        example: 2021-09-01T00:00:00.000Z
 *       category:
 *        type: object
 *        properties:  
 *         id:       
 *          type: integer
 *          example: 1
 *         title:
 *          type: string
 *          example: UI
 *       status:
 *        type: object
 *        properties:  
 *         id:       
 *          type: integer
 *          example: 1
 *         title:
 *          type: string
 *          example: Open
 *       author:
 *        type: object
 *        properties:  
 *         id:       
 *          type: integer
 *          example: 1
 *         email:
 *          type: string
 *          example: some@gmail.com
 */

/**
 * @swagger
 * /feedback:
 *  post:
 *   summary: Create a feedback
 *   tags:
 *    - Feedback
 *   parameters:
 *    - name: Authorization
 *      in: header
 *      required: true
 *      description: Bearer token
 *      schema:
 *           type: string
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       required:
 *        - title
 *        - description
 *        - category
 *        - status
 *       properties:
 *        title:
 *         type: string
 *         description: Title of the feedback.
 *         example: "Improve login experience"
 *        description:
 *         type: string
 *         description: Detailed description of the feedback.
 *         example: "The login process is slow. Please optimize it."
 *        category:
 *         type: string
 *         description: Category of the feedback.
 *         example: "UI"
 *        status:
 *         type: string
 *         description: Current status of the feedback.
 *         example: "Idea"
 *   responses:
 *    200:
 *     description: Feedback created successfully
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         message:
 *          type: string
 *          example: "Feedback created"
 *         data:
 *          type: object
 *          properties:
 *           id:
 *            type: integer
 *            example: 1
 *           title:
 *            type: string
 *            example: Feedback title
 *           description:
 *            type: string
 *            example: Feedback description
 *           category:
 *            type: object
 *            properties:  
 *             id:       
 *              type: integer
 *              example: 1
 *             title:
 *              type: string
 *              example: UI
 *           status:
 *            type: object
 *            properties:  
 *             id:       
 *              type: integer
 *              example: 1
 *             title:
 *              type: string
 *              example: Open
 *           author:
 *            type: object
 *            properties:  
 *             id:       
 *              type: integer
 *              example: 1
 *             email:
 *              type: string
 *              example: some@gmail.com
 */
export const create = async (req: Request, res: Response) => {
    try{    
        const { title, description, category, status } = req.body;
        const author_id = req.user!.id;

        const feedback = await createFeedback(title, description, category, status, author_id);

        res.status(200).json({
            message: 'Feedback created',
            data: feedback,
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        })
    }
}

/**
 * @swagger
 * /feedback:
 *  get:
 *   summary: Get all feedbacks
 *   tags:
 *    - Feedback
 *   parameters:
 *    - name: Authorization
 *      in: header
 *      required: true
 *      description: Bearer token
 *      schema:
 *           type: string
 *    - name: page
 *      in: query
 *      required: false
 *      description: Page number
 *      example: 1
 *      schema:
 *           type: integer
 *    - name: limit
 *      in: query
 *      required: false
 *      description: Limit of feedbacks per page
 *      example: 1
 *      schema:
 *           type: integer
 *    - name: category
 *      in: query
 *      required: false
 *      description: Filter feedbacks by category
 *      example: 1
 *      schema:
 *           type: integer
 *    - name: status
 *      in: query
 *      required: false
 *      description: Filter feedbacks by status
 *      example: 1
 *      schema:
 *           type: integer
 *    - name: orderBy
 *      in: query
 *      required: false
 *      description: Order feedbacks by a field
 *      example: upvote
 *      schema:
 *          type: string
 *          enum: [upvote, createdAt]
 *   responses:
 *    200:
 *     description: Feedback created successfully
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         message:
 *          type: string
 *          example: "Feedback created"
 *         data:
 *          $ref: '#/components/schemas/indexFeedback'
 */
export const index = async (req: Request, res: Response) => {
    try {
        const feedbacks = await getFeedbacks(req);
        
        res.status(200).json({
            message: 'Feedback fetched',
            data: feedbacks,
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        })
    }
};

/**
 * @swagger
 * /feedback/{id}:
 *  delete:
 *   summary: Delete a feedback
 *   tags:
 *    - Feedback
 *   parameters:
 *    - name: Authorization
 *      in: header
 *      required: true
 *      description: Bearer token
 *      schema:
 *           type: string
 *    - name: id
 *      in: path
 *      required: true
 *      description: Feedback ID
 *      schema:
 *           type: integer
 *   responses:
 *    200:
 *     description: Feedback deleted successfully
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         message:
 *          type: string
 *          example: "Feedback deleted"
 *         data:
 *          type: array
 *          items: []
 */
export const remove = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await deleteFeedback(parseInt(id), req.user!.id);

        res.status(200).json({
            message: 'Feedback deleted',
            data: [],
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        })
    }
}

/**
 * @swagger
 * /feedback/{id}:
 *  put:
 *   summary: Update a feedback
 *   tags:
 *    - Feedback
 *   parameters:
 *    - name: Authorization
 *      in: header
 *      required: true
 *      description: Bearer token
 *      schema:
 *           type: string
 *    - name: id
 *      in: path
 *      required: true
 *      description: Feedback ID
 *      schema:
 *           type: integer
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       required:
 *        - title
 *        - description
 *        - category
 *        - status
 *       properties:
 *        title:
 *         type: string
 *         description: Title of the feedback.
 *         example: "Improve login experience"
 *        description:
 *         type: string
 *         description: Detailed description of the feedback.
 *         example: "The login process is slow. Please optimize it."
 *        category:
 *         type: string
 *         description: Category of the feedback.
 *         example: "UI"
 *        status:
 *         type: string
 *         description: Current status of the feedback.
 *         example: "Idea"
 *   responses:
 *    200:
 *     description: Feedback updated successfully
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         message:
 *          type: string
 *          example: "Feedback updated"
 *         data:
 *          type: object
 *          properties:
 *           id:
 *            type: integer
 *            example: 1
 *           title:
 *            type: string
 *            example: Feedback title
 *           description:
 *            type: string
 *            example: Feedback description
 *           category_id:
 *            type: integer
 *            example: 1
 *           status_id:
 *            type: integer
 *            example: 1
 *           author_id:
 *            type: integer
 *            example: 1
 *           created_at:
 *            type: string
 *            example: 2021-09-01T00:00:00.000Z
 *           updated_at:
 *            type: string
 *            example: 2021-09-01T00:00:00.000Z
 */
export const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, description, category, status } = req.body;

        const updatedFeedback = await updateFeedback(parseInt(id), title, description, category, status, req.user!.id);

        res.status(200).json({
            message: 'Feedback updated',
            data: updatedFeedback,
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        })
    }
}

/**
 * @swagger
 * /feedback/{id}:
 *  get:
 *   summary: Get feedback by ID
 *   tags:
 *    - Feedback
 *   parameters:
 *    - name: Authorization
 *      in: header
 *      required: true
 *      description: Bearer token
 *      schema:
 *           type: string
 *    - name: id
 *      in: path
 *      required: true
 *      description: Feedback ID
 *      schema:
 *           type: integer
 *   responses:
 *    200:
 *     description: Feedback created successfully
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         message:
 *          type: string
 *          example: "Feedback created"
 *         data:
 *          $ref: '#/components/schemas/showFeedback'
 */
export const show = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const feedback = await getFeedback(parseInt(id));

        res.status(200).json({
            message: 'Feedback fetched',
            data: feedback,
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        })
    }
}
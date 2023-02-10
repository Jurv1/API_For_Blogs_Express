import { body } from "express-validator";

export const postValidation = [
    body('title').exists().bail()
        .trim().isLength({min: 1, max: 30}).bail()
            .isString(),
    body('shortDescription').exists().bail()
        .trim().isLength({min: 1, max: 100}).bail()
            .isString(),
    body('content').exists().bail()
        .trim().isLength({min: 1, max: 1000}).bail()
            .isString(),
    body('blogId').exists().bail()
        .trim().isString(),
    body('blogName').trim().optional().isString()
]
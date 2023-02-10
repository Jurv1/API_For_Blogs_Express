import { body } from "express-validator";

export const postValidation = [
    body('title').trim().isString().isLength({min: 1, max: 30}),
    body('shortDescription').trim().isString().isLength({min: 1, max: 100}),
    body('content').trim().isString().isLength({min: 1, max: 1000}),
    body('blogId').trim().isString(),
    body('blogName').trim().optional().isString()
]
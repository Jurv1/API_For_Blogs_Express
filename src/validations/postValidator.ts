import { body } from "express-validator";

export const postValidation = [
    body('title').isString().isLength({max: 30}).withMessage({message: "title", field: "title"}),
    body('shortDescription').isString().isLength({max: 100}),
    body('content').isString().isLength({max: 1000}),
    body('blogId').isString(),
    body('blogName').optional().isString()
]
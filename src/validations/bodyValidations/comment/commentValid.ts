import { body } from "express-validator";

export const commentValid = [
    body('content').exists().bail()
        .isString().bail()
        .trim().isLength({min: 20, max: 300}),
]
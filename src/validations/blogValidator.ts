import { body } from "express-validator";

export const blogValidation = [
    body('name').isString().isLength({ max: 15}),
    body('description').isString().isLength({min: 1, max: 500}),
    body('websiteUrl').isLength({ max: 100 })
        .matches('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$')
]
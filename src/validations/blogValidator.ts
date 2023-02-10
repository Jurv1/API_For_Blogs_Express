import { body } from "express-validator";

export const blogValidation = [
    body('name').trim().isString().isLength({ min: 1, max: 15}),
    body('description').trim().isString().isLength({min: 1, max: 500}),
    body('websiteUrl').matches('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$')
]
import { body } from "express-validator";

export const blogValidation = [
    body('name').exists().bail()
        .trim().isLength({ min: 1, max: 15}).bail()
            .isString(),
    body('description').exists().bail()
        .trim().isLength({min: 1, max: 500}).bail()
            .isString(),
    body('websiteUrl').exists().matches('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$')
        .isLength({max: 100})
]
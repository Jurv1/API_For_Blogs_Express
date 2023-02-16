import { body } from "express-validator";

export const blogValidation = [
    body('name').exists().bail()
        .trim().isLength({ min: 1, max: 15}).bail()
            .isString(),
    body('description').exists().bail()
        .trim().isLength({min: 1, max: 500}).bail()
            .isString(),
    body('websiteUrl').exists().matches('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$')
        .isLength({max: 100}),
    body('createdAt').matches('/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/'),
    body('isMembership').isBoolean()
]
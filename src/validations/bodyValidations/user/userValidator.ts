import { body } from "express-validator";

export const userValidator = [
    body('login').exists().bail()
        .trim().isLength({ min: 3, max: 10}).bail()
            .isString().bail()
                .matches(/^[a-zA-Z0-9_-]*$/),
    body('password').exists().bail()
        .trim().isLength({min: 6, max: 20}).bail()
        .isString(),
    body('email').exists().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
]
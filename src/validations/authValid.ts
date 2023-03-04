import { body } from "express-validator";

export const loginValid = [
    body('loginOrEmail').exists().bail()
        .isString().bail(),
    body('password').exists().bail()
        .isString().bail()
]
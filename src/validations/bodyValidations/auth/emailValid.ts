import {body} from "express-validator";

export const emailValid = [
    body('email').exists().bail()
        .trim().matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
        .isString().bail()
]
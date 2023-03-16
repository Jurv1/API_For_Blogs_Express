import {body} from "express-validator";

export const registrationCodeValid = [
    body('code').exists().bail()
        .isString().bail()
]
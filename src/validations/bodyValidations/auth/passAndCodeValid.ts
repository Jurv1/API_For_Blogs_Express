import {body} from "express-validator";

export const passAndCodeValid = [
    body('recoveryCode').exists().bail()
        .isString().bail(),
    body('newPassword').exists().bail()
        .trim()
        .isString().bail()
        .isLength({ min: 6, max: 20 })
]
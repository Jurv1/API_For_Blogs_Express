import { body } from "express-validator";

export const blogValidation = [
    body('name').isString().isLength({max: 15}).withMessage({message: "name", field: "name"}),
    body('description').isString().isLength({max: 500}),
    body('websiteUrl').isString().isURL().isLength({ max: 100 })
]
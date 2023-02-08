import {body} from "express-validator"

let availableResolutions: string[] = [
    "P144",
    "P240",
    "P360",
    "P480",
    "P720",
    "P1080",
    "P1440",
    "P2160"
]

let title = body('title')
console.log(title)


export const videoValidation = [
    body('title').isString().withMessage({
        message: `${title}`,
        errorCode: 1,
    }).isLength({max: 40}).withMessage({
        message: 'Not an email',
        errorCode: 1,
    }),
    body('author').isString().isLength({max: 20}),
    body('canBeDownloaded').optional().isBoolean(),
    body('minAgeRestriction').isLength({min: 1, max: 18}).optional({nullable: true}),
    body('publicationDate').optional().isURL(),
    body('availableResolutions').isArray().isIn(availableResolutions).optional({nullable: true})
]
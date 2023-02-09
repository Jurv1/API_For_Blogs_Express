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

export const videoValidation = [
    body('title').isString().isLength({max: 40}),
    body('author').isString().isLength({max: 20}),
    body('canBeDownloaded').optional().isBoolean(),
    body('minAgeRestriction').optional({nullable: true}).isLength({min: 1, max: 18}),
    body('publicationDate').optional().isISO4217().isISO8601(),
    body('availableResolutions').optional({nullable: true}).isArray(),
    body('availableResolutions.*').isIn(availableResolutions)
]
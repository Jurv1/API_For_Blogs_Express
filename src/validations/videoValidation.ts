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
    body('title').trim().isString().isLength({min: 1, max: 40}),
    body('author').trim().isString().isLength({min: 1, max: 20}),
    body('canBeDownloaded').trim().optional().isBoolean(),
    body('minAgeRestriction').trim().optional({nullable: true}).isLength({min: 1, max: 18}),
    body('publicationDate').trim().optional().isISO4217().isISO8601(),
    body('availableResolutions').trim().optional({nullable: true}).isArray(),
    body('availableResolutions.*').trim().isIn(availableResolutions)
]
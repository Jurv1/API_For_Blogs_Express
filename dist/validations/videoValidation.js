"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoValidation = void 0;
const express_validator_1 = require("express-validator");
let availableResolutions = [
    "P144",
    "P240",
    "P360",
    "P480",
    "P720",
    "P1080",
    "P1440",
    "P2160"
];
let title = (0, express_validator_1.body)('title');
console.log(title);
exports.videoValidation = [
    (0, express_validator_1.body)('title').isString().withMessage({
        message: `${title}`,
        errorCode: 1,
    }).isLength({ max: 40 }).withMessage({
        message: 'Not an email',
        errorCode: 1,
    }),
    (0, express_validator_1.body)('author').isString().isLength({ max: 20 }),
    (0, express_validator_1.body)('canBeDownloaded').optional().isBoolean(),
    (0, express_validator_1.body)('minAgeRestriction').isLength({ min: 1, max: 18 }).optional({ nullable: true }),
    (0, express_validator_1.body)('publicationDate').optional().isURL(),
    (0, express_validator_1.body)('availableResolutions').isArray().isIn(availableResolutions).optional({ nullable: true })
];

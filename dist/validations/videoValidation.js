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
exports.videoValidation = [
    (0, express_validator_1.body)('title').isString().withMessage({ message: "ssssss" }).isLength({ max: 40 }).withMessage("safasfasfsafsafsafsa"),
    (0, express_validator_1.body)('author').isString().isLength({ max: 20 }),
    (0, express_validator_1.body)('canBeDownloaded').optional().isBoolean(),
    (0, express_validator_1.body)('minAgeRestriction').isLength({ min: 1, max: 18 }).optional({ nullable: true }),
    (0, express_validator_1.body)('publicationDate').optional().isURL(),
    (0, express_validator_1.body)('availableResolutions').isArray().isIn(availableResolutions).optional({ nullable: true })
];

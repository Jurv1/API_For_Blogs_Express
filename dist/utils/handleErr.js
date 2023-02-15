"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.default = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req).array();
    if (errors.length === 0) {
        next();
    }
    else {
        let errorsArray = [];
        for (let i = 0; i < errors.length; i++) {
            errorsArray.push({
                message: errors[i].msg,
                field: errors[i].param
            });
        }
        res.status(400).json({
            errorsMessages: errorsArray
        });
    }
};

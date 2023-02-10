"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const db_1 = require("../db/db");
exports.default = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req).array();
    // if (JSON.stringify(req.body) === '{}') {
    //     res.send(401)
    //     return;
    // } else
    if (errors.length === 0) {
        next();
    }
    else {
        let errorsArray = [];
        if (req.method === "POST" && req.baseUrl === "/posts") {
            const foundedEl = db_1.blogs.find(el => (el === null || el === void 0 ? void 0 : el.id) === req.body.blogId);
            if (!foundedEl) {
                errorsArray.push({
                    message: "I hope it'd work",
                    field: "blogId"
                });
            }
        }
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
    //if (!errors.isEmpty()) {
    //    return res.status(400).json({errorsMessages: errors})
    //}
    //next()
};

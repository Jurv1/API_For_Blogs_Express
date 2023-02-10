import {validationResult} from 'express-validator'
import {Request, Response, NextFunction} from "express";
import {blogs} from "../db/db";

export default (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array()
    // if (JSON.stringify(req.body) === '{}') {
    //     res.send(401)
    //     return;
    // } else
    if(errors.length === 0){
        next()
    } else {
        let errorsArray: { message: string, field: string }[] = []
        if(req.method === "POST" && req.baseUrl === "/posts"){
            const foundedEl = blogs.find(el => el?.id === req.body.blogId)
            if (!foundedEl) {
                errorsArray.push({
                    message: "I hope it'd work",
                    field: "blogId"
                })
            }
        }
        for (let i = 0; i < errors.length; i++) {
            errorsArray.push({
                message: errors[i].msg,
                field: errors[i].param
            })
        }
        res.status(400).json({
            errorsMessages: errorsArray
        })
    }

    //if (!errors.isEmpty()) {
    //    return res.status(400).json({errorsMessages: errors})
    //}

    //next()
}
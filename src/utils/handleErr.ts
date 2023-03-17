import {validationResult} from 'express-validator'
import {Request, Response, NextFunction} from "express";

export default (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array()
    if (errors.length === 0) {
        next()
    } else {
        let errorsArray: { message: string, field: string }[] = []
        for (let i = 0; i < errors.length; i++) {
            errorsArray.push({
                message: errors[i].msg,
                field: errors[i].param
            })
        }

        if (errorsArray.length === 1 && errorsArray[0].field === "id" || errorsArray[0].field === "email"
                || errorsArray[0].field === "login"){
            res.status(404).json({
                errorsMessages: errorsArray
            })
        }

        res.status(400).json({
            errorsMessages: errorsArray
        })
    }
}
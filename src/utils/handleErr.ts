import {validationResult} from 'express-validator'
import {Request, Response, NextFunction} from "express";

export default (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array()
    if (JSON.stringify(req.body) === '{}') {
        res.send(401)
        return;
    } else if(errors.length === 0){
        next()
    } else {
        let errorsArray: { message: string, field: string }[] = []
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
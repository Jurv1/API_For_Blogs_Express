import {NextFunction, Request, Response} from "express";


export const createVideoValid = (req: Request, res: Response, next: NextFunction) => {
    let message: { message: string, field: string }[] = []
    if (!(typeof req.body.title === 'string') || req.body.title.length > 40) {
        message.push({
            message: "title",
            field: "title"
        })
    }
    if (!(typeof req.body.author === 'string') || req.body.author.length > 20) {
        message.push({
            message: "author",
            field: "author"
        })
    }
    if (req.body.availableResolutions != null && (req.body.availableResolutions.length > 0)) {
        for (let i = 0; i < req.body.availableResolutions.length; i++) {
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
            if (!(availableResolutions.includes(req.body.availableResolutions[i]))) {
                message.push({
                    message: "availableResolutions",
                    field: "availableResolutions"
                })
                break;
            }
        }
    }

    if (message.length > 0) return res.status(400).json({errorsMessages: message})

    next()
}
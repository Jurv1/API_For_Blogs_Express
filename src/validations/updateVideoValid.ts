import {NextFunction, Request, Response} from "express";


export const updateVideoValid = (req: Request, res: Response, next: NextFunction) => {
    const re = new RegExp(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/)
    let message: { message: string, field: string }[] = []
    if (req.body.title === null || !(typeof req.body.title === 'string') || req.body.title.length > 40) {
        message.push({
            message: "title",
            field: "title"
        })
    }
    if (req.body.author === null || !(typeof req.body.author === 'string') || req.body.author.length > 20) {
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
    if (req.body.canBeDownloaded != null && (!(typeof req.body.canBeDownloaded === 'boolean'))) {
        message.push({
            message: "canBeDownloaded",
            field: "canBeDownloaded"
        })
    }
    if (req.body.minAgeRestriction != null && (!(typeof req.body.minAgeRestriction === 'number') || req.body.minAgeRestriction > 18 || req.body.minAgeRestriction < 1)) {
        message.push({
            message: "minAgeRestriction",
            field: "minAgeRestriction"
        })
    }
    if ((req.body.publicationDate !== null) && (!(typeof req.body.publicationDate === 'string') || !(re.test(req.body.publicationDate)))) {
        message.push({
            message: "publicationDate",
            field: "publicationDate"
        })
    }

    if (message.length > 0) {
        return res.status(400).json({
            errorsMessages: message
        })
    }

    next()
}
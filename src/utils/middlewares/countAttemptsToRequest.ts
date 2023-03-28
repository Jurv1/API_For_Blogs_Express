import {NextFunction, Request, Response} from "express";
import {attemptsRepository} from "../../repositories/attemptsRepository";

export async function countAttemptsToRequest( req: Request, res: Response, next: NextFunction){
    const limit = new Date(new Date().getTime() - 10000)

    const countOfAttempts = await attemptsRepository.countAttempts(req.ip, req.originalUrl, limit)
    if (countOfAttempts >= 5) return res.sendStatus(429)

    const attemptTmp = {
        ip: req.ip,
        requestString: req.url,
        expTime: new Date()
    }
    await attemptsRepository.createAttempt(attemptTmp)
    next()

}
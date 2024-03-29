import {NextFunction, Request, Response} from "express";
import {AttemptsRepository} from "../../repositories/attemptsRepository";

const attemptsRepository = new AttemptsRepository
export async function countAttemptsToRequest( req: Request, res: Response, next: NextFunction){
    const limit = new Date(new Date().getTime() - 10000)

    const countOfAttempts = await attemptsRepository.countAttempts(req.ip, req.originalUrl, limit)
    if (countOfAttempts >= 5) return res.sendStatus(429)

    const attemptTmp = {
        ip: req.ip,
        requestString: req.originalUrl,
        expTime: new Date()
    }

    await attemptsRepository.createAttempt(attemptTmp)
    next()

}
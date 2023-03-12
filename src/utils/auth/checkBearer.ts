import {NextFunction, Request, Response} from "express";
import {jwtService} from "../../application/jwtService";
import * as UserQueryRepo from "../../repositories/queryRepository/userQ/userQ"

export default async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization){
        res.status(401)
        return
    }

    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    const userId = await jwtService.getUserIdByToken(token)
    if (userId) {
        req.user = await UserQueryRepo.getOneUserById(userId.toString())
        next()
        return
    }

    res.sendStatus(401)
}
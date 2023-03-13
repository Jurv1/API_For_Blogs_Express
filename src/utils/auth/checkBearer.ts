import {NextFunction, Request, Response} from "express";
import {jwtService} from "../../application/jwtService";
import * as UserQueryRepo from "../../repositories/queryRepository/userQ/userQ"

export default async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization){
        res.sendStatus(401)
        return
    }

    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    const userId = await jwtService.getUserIdByToken(token)
    if (userId) {
        try {
            req.user = await UserQueryRepo.getOneUserById(userId.toString())
            next()
            return
        } catch (err){
            return res.status(401).json(
                {message: 'Нет доступа'}
            )
        }

    }

    res.sendStatus(401)
}
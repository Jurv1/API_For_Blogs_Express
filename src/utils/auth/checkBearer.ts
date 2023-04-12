import {NextFunction, Request, Response} from "express";
import {jwtService} from "../../application/jwtService";
import {UserQ} from "../../repositories/queryRepository/userQ/userQ";

const userQ = new UserQ
const jwt = new jwtService
export default async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization){
        res.sendStatus(401)
        return
    }

    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    const userId = await jwt.getUserIdByToken(token)
    if (userId) {
        try {
            req.user = await userQ.getOneUserById(userId.toString())
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
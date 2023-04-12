import {NextFunction, Request, Response} from "express";
import {jwtService} from "../../application/jwtService";
import {UserQ} from "../../repositories/queryRepository/userQ/userQ"

const userQ = new UserQ
const jwt = new jwtService
export async function isRefreshTokenInBlackList( req: Request, res: Response, next: NextFunction){
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.sendStatus(401)

    const jwtPayload = await jwt.getPayload(refreshToken)
    if (!jwtPayload) return res.sendStatus(401)

    const user = await userQ.getOneUserById(jwtPayload.userId)
    if (!user) return res.sendStatus(401)

    req.user = user
    next()
}
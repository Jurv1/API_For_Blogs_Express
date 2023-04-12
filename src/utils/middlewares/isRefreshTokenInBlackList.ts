import {NextFunction, Request, Response} from "express";
import {jwtService} from "../../application/jwtService";
import {userQ} from "../../repositories/queryRepository/userQ/userQ"

export async function isRefreshTokenInBlackList( req: Request, res: Response, next: NextFunction){
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.sendStatus(401)

    const jwtPayload = await jwtService.getPayload(refreshToken)
    if (!jwtPayload) return res.sendStatus(401)

    const user = await userQ.getOneUserById(jwtPayload.userId)
    if (!user) return res.sendStatus(401)

    req.user = user
    next()
}
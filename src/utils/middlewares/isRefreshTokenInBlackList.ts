import {NextFunction, Request, Response} from "express";
import {refreshTokensDBController} from "../../db/db";
import {jwtService} from "../../application/jwtService";
import {findOneByDeviceIdUserIdAndLastActiveDate, getOneUserById} from "../../repositories/queryRepository/userQ/userQ"

export async function isRefreshTokenInBlackList( req: Request, res: Response, next: NextFunction){
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.sendStatus(401)

    const jwtPayload = await jwtService.getPayload(refreshToken)
    if (!jwtPayload) return res.sendStatus(401)

    const user = await getOneUserById(jwtPayload.userID)
    if (!user) return res.sendStatus(401)

    const lastActiveDate = jwtService.getLastActiveDate(refreshToken)
    const userSession = await findOneByDeviceIdUserIdAndLastActiveDate(jwtPayload.userID, jwtPayload.deviceId, lastActiveDate)
    if (!userSession) return res.sendStatus(401)

    req.user = user
    next()
}
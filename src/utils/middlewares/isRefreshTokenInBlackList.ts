import {NextFunction, Request, Response} from "express";
import {jwtService} from "../../application/jwtService";
import {findOneByDeviceIdUserIdAndLastActiveDate, getOneUserById} from "../../repositories/queryRepository/userQ/userQ"

export async function isRefreshTokenInBlackList( req: Request, res: Response, next: NextFunction){
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.sendStatus(401)

    const jwtPayload = await jwtService.getPayload(refreshToken)
    if (!jwtPayload) return res.sendStatus(402)

    const user = await getOneUserById(jwtPayload.userId)
    if (!user) return res.sendStatus(403)

    const lastActiveDate = jwtService.getLastActiveDate(refreshToken)
    const userSession = await findOneByDeviceIdUserIdAndLastActiveDate(jwtPayload.userId, jwtPayload.deviceId, lastActiveDate)
    if (!userSession) return res.sendStatus(405)

    req.user = user
    next()
}
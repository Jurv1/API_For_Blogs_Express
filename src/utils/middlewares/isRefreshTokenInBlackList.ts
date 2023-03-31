import {NextFunction, Request, Response} from "express";
import {jwtService} from "../../application/jwtService";
import {getOneUserById} from "../../repositories/queryRepository/userQ/userQ"
import {
    findOneByDeviceIdUserIdAndLastActiveDate,
    getOneDeviceByUserIdAndDeviceId
} from "../../repositories/queryRepository/deviceQ/deviceQ";

export async function isRefreshTokenInBlackList( req: Request, res: Response, next: NextFunction){
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.sendStatus(401)

    const jwtPayload = await jwtService.getPayload(refreshToken)
    if (!jwtPayload) return res.sendStatus(401)

    const user = await getOneUserById(jwtPayload.userId)
    if (!user) return res.sendStatus(401)

    //const lastActiveDate = jwtService.getLastActiveDate(refreshToken)
    //console.log(lastActiveDate, jwtPayload.userId, jwtPayload.deviceId)
    const userSession = await findOneByDeviceIdUserIdAndLastActiveDate(req.ip, jwtPayload.userId,
        req.headers["user-agent"] || "untitled device")
    if (!userSession) return res.sendStatus(403)

    req.user = user
    next()
}
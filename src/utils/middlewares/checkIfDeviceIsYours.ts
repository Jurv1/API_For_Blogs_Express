import {NextFunction, Request, Response} from "express";
import {DeviceQ} from "../../repositories/queryRepository/deviceQ/deviceQ";
import {JWTService} from "../../application/jwtService";
import {UserQ} from "../../repositories/queryRepository/userQ/userQ";

const userQ = new UserQ
const deviceQ = new DeviceQ
const jwt = new JWTService
export async function checkIfDeviceIsYours( req: Request, res: Response, next: NextFunction){

    const refreshToken = req.cookies.refreshToken
    const deviceDeletedId = req.params.deviceId

    const payload = await jwt.getPayload(refreshToken)

    const device = await deviceQ.findOneByDeviceId(deviceDeletedId)

    if (device?.deviceId === payload.deviceId && device?.userId === payload.userId){
        next()
    }
    res.sendStatus(403)


}

export const checkForSameDevice = async (req: Request, res: Response, next: NextFunction) => {
    const title = req.headers["user-agent"] || "untitled device"
    const user  = await userQ.getOneByLoginOrEmail(req.body.loginOrEmail)
    if (!user) return res.sendStatus(401)
    const userId : string = user._id.toString()
    const status = await deviceQ.getOneDeviceByTitleAndUserId(title, userId)
    if (!status) return res.sendStatus(403)
    next()
}

export const checkForSameUser = async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken
    const id = req.params.deviceId
    const userInfo = await jwt.getUserIdByToken(refreshToken)
    const result = await deviceQ.getOneDeviceById(id)
    if (!userInfo) return res.sendStatus(401)
    if(!result) return res.sendStatus(404)
    if (result.userId !== userInfo.toString()) return res.sendStatus(403)
    next()
}
import {NextFunction, Request, Response} from "express";
import {
    findOneByDeviceId, getOneDeviceById, getOneDeviceByTitleAndUserId,
} from "../../repositories/queryRepository/deviceQ/deviceQ";
import {jwtService} from "../../application/jwtService";
import {getOneByLoginOrEmail} from "../../repositories/queryRepository/userQ/userQ";

export async function checkIfDeviceIsYours( req: Request, res: Response, next: NextFunction){

    const refreshToken = req.cookies.refreshToken
    const deviceDeletedId = req.params.deviceId

    const payload = await jwtService.getPayload(refreshToken)

    const device = await findOneByDeviceId(deviceDeletedId)

    if (device?.deviceId === payload.deviceId && device?.userId === payload.userId){
        next()
    }
    res.sendStatus(403)


}

export const checkForSameDevice = async (req: Request, res: Response, next: NextFunction) => {
    const title = req.headers["user-agent"] || "untitled device"
    const user  = await getOneByLoginOrEmail(req.body.loginOrEmail)
    if (!user) return res.sendStatus(401)
    const userId : string = user._id.toString()
    const status = await getOneDeviceByTitleAndUserId(title, userId)
    if (!status) return res.sendStatus(403)
    next()
}

export const checkForSameUser = async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken
    const id = req.params.deviceId
    const userInfo = await jwtService.getUserIdByToken(refreshToken)
    const result = await getOneDeviceById(id)
    if (!userInfo) return res.sendStatus(401)
    if(!result) return res.sendStatus(404)
    if (result.userId !== userInfo.toString()) return res.sendStatus(403)
    next()
}
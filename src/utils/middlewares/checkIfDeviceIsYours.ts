import {NextFunction, Request, Response} from "express";
import {
    findOneByDeviceId,
} from "../../repositories/queryRepository/deviceQ/deviceQ";
import {jwtService} from "../../application/jwtService";

export async function checkIfDeviceIsYours( req: Request, res: Response, next: NextFunction){

    const refreshToken = req.cookies.refreshToken
    const deviceDeletedId = req.params.deviceId

    const payload = await jwtService.getPayload(refreshToken)

    const device = await findOneByDeviceId(deviceDeletedId)

    if (device?.deviceId === payload.deviceId){
        next()
    }
    res.sendStatus(403)


}
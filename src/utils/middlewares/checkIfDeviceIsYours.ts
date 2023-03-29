import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {getOneDeviceByUserIdAndDeviceId} from "../../repositories/queryRepository/deviceQ/deviceQ";

export async function checkIfDeviceIsYours( req: Request, res: Response, next: NextFunction){

    const refreshToken = req.cookies.refreshToken

    const decodedRefresh = jwt.decode(refreshToken, { json: true })

    if (decodedRefresh && decodedRefresh.userId && decodedRefresh.deviceId){

        const result = await getOneDeviceByUserIdAndDeviceId(decodedRefresh.userId, decodedRefresh.deviceId)

        if (result){
            next()
        }

    }

    res.sendStatus(403)

}
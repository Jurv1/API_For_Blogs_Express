import {Request, Response} from "express";
import {
    findOneByDeviceIdUserIdAndTitle,
    getAllDevicesByUserId
} from "../repositories/queryRepository/deviceQ/deviceQ";
import { deleteAllDevicesExceptActive, deleteOneDeviceById } from "../services/deviceService";
import {mapDevices} from "../utils/mappers/deviceMapper";
import {jwtService} from "../application/jwtService";

export async function getAll(req: Request, res: Response){

    const refreshToken = req.cookies.refreshToken
    const payload = await jwtService.getPayload(refreshToken)

    try {
        if (payload && payload.userId){
            const allDevices = await getAllDevicesByUserId(payload.userId)

            if (allDevices){
                return res.status(200).send( mapDevices(allDevices) )
            }
        }
        return res.sendStatus(404)
    } catch (err){
        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })
    }
}

export async function deleteAllExceptActive(req: Request, res: Response){

    const refreshToken = req.cookies.refreshToken
    const payload = await jwtService.getPayload(refreshToken)
    const {userId, deviceId} = payload

    try {
        if (userId && deviceId){
                const isDeleted = await deleteAllDevicesExceptActive(userId, deviceId)
                if (isDeleted) return res.sendStatus(204)
                return res.sendStatus(404)
        }
    } catch (err){
        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })
    }
}

export async function deleteDeviceById(req: Request, res: Response){
    const deviceId = req.params.deviceId

    try {
        const isDeleted = await deleteOneDeviceById(deviceId)

        if (isDeleted) return res.sendStatus(204)
        return res.sendStatus(404)

    } catch (err){
        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })
    }
}
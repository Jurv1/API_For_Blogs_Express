import {Request, Response} from "express";
import {mapDevices} from "../utils/mappers/deviceMapper";
import {JWTService} from "../application/jwtService";
import {DeviceQ} from "../repositories/queryRepository/deviceQ/deviceQ";
import {DeviceService} from "../services/deviceService";

export class SecurityController {
    constructor( protected deviceQ: DeviceQ, protected deviceService: DeviceService, protected jwtService: JWTService) {}
    async getAll(req: Request, res: Response) {

        const refreshToken = req.cookies.refreshToken
        const payload = await this.jwtService.getPayload(refreshToken)

        try {
            if (payload && payload.userId) {
                const allDevices = await this.deviceQ.getAllDevicesByUserId(payload.userId)

                if (allDevices) {
                    return res.status(200).send(mapDevices(allDevices))
                }
            }
            return res.sendStatus(404)
        } catch (err) {
            console.log(err)
            res.status(404).json({
                message: "Can't find el"
            })
        }
    }

    async deleteAllExceptActive(req: Request, res: Response) {

        const refreshToken = req.cookies.refreshToken
        const payload = await this.jwtService.getPayload(refreshToken)
        const {userId, deviceId} = payload

        try {
            if (userId && deviceId) {
                const isDeleted = await this.deviceService.deleteAllDevicesExceptActive(userId, deviceId)
                if (isDeleted) return res.sendStatus(204)
                return res.sendStatus(404)
            }
        } catch (err) {
            console.log(err)
            res.status(404).json({
                message: "Can't find el"
            })
        }
    }

    async deleteDeviceById(req: Request, res: Response) {
        const deviceId = req.params.deviceId

        try {
            const isDeleted = await this.deviceService.deleteOneDeviceById(deviceId)

            if (isDeleted) return res.sendStatus(204)
            return res.sendStatus(404)

        } catch (err) {
            console.log(err)
            res.status(404).json({
                message: "Can't find el"
            })
        }
    }
}

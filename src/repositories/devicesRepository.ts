import {DBDevice, FinalDBDevice} from "../schemas/dbSchemas/DeviceDBSchema";
import {devicesDBController} from "../db/db";
import {JwtPayload} from "jsonwebtoken";

export const deviceRepository = {

    async createNewDevice(device: DBDevice): Promise<FinalDBDevice | null>{
        const result = await devicesDBController.insertOne(device)
        return await devicesDBController.findOne({ _id: result.insertedId })
    },

    async deleteAllExceptActive(userId: string , deviceId: string){
        const result = await devicesDBController.deleteMany({ userId, deviceId: { $ne: deviceId } }, )

        return !!result

    },

    async deleteOneDeviceById(id: string){
        const result = await devicesDBController.deleteOne({ deviceId: id })

        return result.deletedCount === 1
    },

    async updateLastActivity(payload: JwtPayload){
        if(!payload.iat){
            return null
        }
        const result = await devicesDBController.updateOne({ deviceId: payload.deviceId }, {
            $set: {
                lastActiveDate: (new Date(payload.iat * 1000)).toISOString()
            }
        })
        return result.modifiedCount === 1
    },
}
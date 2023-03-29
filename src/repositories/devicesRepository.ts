import {DBDevice, FinalDBDevice} from "../schemas/dbSchemas/DeviceDBSchema";
import {devicesDBController} from "../db/db";
import {ObjectId} from "mongodb";

export const deviceRepository = {

    async createNewDevice(device: DBDevice): Promise<FinalDBDevice | null>{
        const result = await devicesDBController.insertOne(device)
        return await devicesDBController.findOne({ _id: result.insertedId })
    },

    async deleteAllExceptActive(id: ObjectId){
        const result = await devicesDBController.deleteMany({ _id: { $ne: id } }, )

        return result.deletedCount === 1
    },

    async deleteOneDeviceById(id: ObjectId){
        const result = await devicesDBController.deleteOne({ _id: id })

        return result.deletedCount === 1
    },

    async updateLastActivity(deviceId: string , iat: Date){
        await devicesDBController.updateOne({ deviceId: deviceId }, {
            $set: {
                lastActivity: iat
            }
        })
    },
}
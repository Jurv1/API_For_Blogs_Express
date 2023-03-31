import {DBDevice, FinalDBDevice} from "../schemas/dbSchemas/DeviceDBSchema";
import {devicesDBController} from "../db/db";

export const deviceRepository = {

    async createNewDevice(device: DBDevice): Promise<FinalDBDevice | null>{
        const result = await devicesDBController.insertOne(device)
        return await devicesDBController.findOne({ _id: result.insertedId })
    },

    async deleteAllExceptActive(userId: string , deviceId: string){
        const result = await devicesDBController.deleteMany({ userId, deviceId: { $ne: deviceId } }, )

        return result.deletedCount === 1
    },

    async deleteOneDeviceById(id: string){
        const result = await devicesDBController.deleteOne({ deviceId: id })

        return result.deletedCount === 1
    },

    async updateLastActivity(deviceId: string , userId: string){
        const result = await devicesDBController.updateOne({ $and: [{deviceId: deviceId, userId: userId}]  }, {
            $set: {
                lastActiveDate: (new Date()).toISOString()
            }
        })
        return result.modifiedCount === 1
    },
}
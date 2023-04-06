import {DBDevice, FinalDBDevice} from "../schemas/dbSchemas/DeviceDBSchema";
import {JwtPayload} from "jsonwebtoken";
import {Device} from "../schemas/mongooseSchemas/mongooseDeviceSchema";

export const deviceRepository = {

    async createNewDevice(device: DBDevice): Promise<FinalDBDevice | null>{
        const result = await Device.create(device)
        return Device.findOne({_id: result._id});
    },

    async deleteAllExceptActive(userId: string , deviceId: string){
        const result = await Device.deleteMany({ userId, deviceId: { $ne: deviceId } }, )

        return !!result

    },

    async deleteOneDeviceById(id: string){
        const result = await Device.deleteOne({ deviceId: id })

        return result.deletedCount === 1
    },

    async updateLastActivity(payload: JwtPayload){
        if(!payload.iat){
            return null
        }
        const result = await Device.updateOne({ deviceId: payload.deviceId }, {
            $set: {
                lastActiveDate: (new Date(payload.iat * 1000)).toISOString()
            }
        })
        return result.modifiedCount === 1
    },
}
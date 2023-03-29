import {devicesDBController} from "../../../db/db";

export async function getAllDevicesByUserId(userId: string){
    return await devicesDBController.find( { userId: userId } ).toArray()
}

export async function getOneDeviceByIp(ip: string){
    return  await devicesDBController.findOne({ ip: ip })
}

export async function getOneDeviceByUserIdAndDeviceId(userId: string, deviceId: string){
    return await devicesDBController.findOne({ $and: [{userId: userId, deviceId: deviceId}] })
}

import {devicesDBController} from "../../../db/db";

export async function getAllDevicesByUserId(userId: string){
    return await devicesDBController.find( { userId: userId } ).toArray()
}

export async function getOneDeviceByIpAndUserId(ip: string, userId: string){
    return  await devicesDBController.findOne({ ip: ip , userId: userId})
}

export async function getOneDeviceByUserIdAndDeviceId(userId: string, deviceId: string){
    return await devicesDBController.findOne({ $and: [{userId: userId, deviceId: deviceId}] })
}

export async function findOneByDeviceIdUserIdAndTitle(userId: string, ip: string, title: string) {
    return devicesDBController.findOne({$and: [{userId: userId, ip: ip, title: title}]})
}

export async function findOneByDeviceId(deviceId: string) {
    return devicesDBController.findOne({deviceId: deviceId})
}

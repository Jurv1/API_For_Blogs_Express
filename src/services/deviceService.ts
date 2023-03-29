import jwt from "jsonwebtoken";
import {deviceRepository} from "../repositories/devicesRepository";
import {ObjectId} from "mongodb";

export async function deleteAllDevicesExceptActive(id: ObjectId){
    return await deviceRepository.deleteAllExceptActive(id)
}

export async function deleteOneDeviceById(id: ObjectId){
    return await deviceRepository.deleteOneDeviceById(id)
}

export async function createNewDevice(ip: string, title: string, refresh: string){
    const decodedRefresh =  jwt.decode(refresh, {json: true})
    console.log(decodedRefresh)
    if(!decodedRefresh || !decodedRefresh.iat){
        return null
    }
    const deviceTmp = {
        ip: ip,
        title: title,
        lastActivity: decodedRefresh.iat.toString(),
        deviceId: decodedRefresh.deviceId,
        userId: decodedRefresh.userId.toString()
    }
    await deviceRepository.createNewDevice(deviceTmp)

}
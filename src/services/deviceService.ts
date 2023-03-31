import jwt from "jsonwebtoken";
import {deviceRepository} from "../repositories/devicesRepository";

export async function deleteAllDevicesExceptActive( userId: string , deviceId: string){
    return await deviceRepository.deleteAllExceptActive(userId, deviceId)
}

export async function deleteOneDeviceById(id: string){
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
        lastActiveDate: (new Date()).toISOString(),
        deviceId: decodedRefresh.deviceId,
        userId: decodedRefresh.userId.toString()
    }
    await deviceRepository.createNewDevice(deviceTmp)

}
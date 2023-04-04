import jwt, {JwtPayload} from "jsonwebtoken";
import {deviceRepository} from "../repositories/devicesRepository";
import {jwtService} from "../application/jwtService";

export async function deleteAllDevicesExceptActive( userId: string , deviceId: string){
    return await deviceRepository.deleteAllExceptActive(userId, deviceId)
}

export async function deleteOneDeviceById(id: string){
    return await deviceRepository.deleteOneDeviceById(id)
}

export async function createNewDevice(ip: string, title: string, payload: any){
    //const payload = await jwtService.getPayload(refresh)
    console.log(payload)
    if(!payload){
        return null
    }

    const deviceTmp = {
        ip: ip,
        title: title,
        lastActiveDate: (new Date(payload.iat * 1000)).toISOString(),
        deviceId: payload.deviceId,
        userId: payload.userId
    }
    await deviceRepository.createNewDevice(deviceTmp)

}
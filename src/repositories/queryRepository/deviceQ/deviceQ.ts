import {Device} from "../../../schemas/mongooseSchemas/mongooseDeviceSchema";

export async function getAllDevicesByUserId(userId: string){
    return Device.find({userId: userId}).lean();
}

export async function getOneDeviceById(deviceId: string){
    return Device.findOne({deviceId: deviceId});
}

export async function getOneDeviceByTitleAndUserId(title: string, userId: string){
    return Device.findOne({title: title, userId: userId});
}

export async function getOneDeviceByUserIdAndDeviceId(userId: string, deviceId: string){
    return Device.findOne({$and: [{userId: userId, deviceId: deviceId}]});
}

export async function findOneByDeviceIdUserIdAndTitle(userId: string, ip: string, title: string) {
    return Device.findOne({$and: [{userId: userId, ip: ip, title: title}]})
}

export async function findOneByDeviceId(deviceId: string) {
    return Device.findOne({deviceId: deviceId})
}

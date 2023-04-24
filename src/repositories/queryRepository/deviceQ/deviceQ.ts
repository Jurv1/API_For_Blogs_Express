import {Device} from "../../../schemas/mongooseSchemas/mongooseDeviceSchema";
import {injectable} from "inversify";

@injectable()
export class DeviceQ {
    async getAllDevicesByUserId(userId: string) {
        return Device.find({userId: userId}).lean();
    }

    async getOneDeviceById(deviceId: string) {
        return Device.findOne({deviceId: deviceId});
    }

    async getOneDeviceByTitleAndUserId(title: string, userId: string) {
        return Device.findOne({title: title, userId: userId});
    }

    async getOneDeviceByUserIdAndDeviceId(userId: string, deviceId: string) {
        return Device.findOne({$and: [{userId: userId, deviceId: deviceId}]});
    }

    async findOneByDeviceIdUserIdAndTitle(userId: string, ip: string, title: string) {
        return Device.findOne({$and: [{userId: userId, ip: ip, title: title}]})
    }

    async findOneByDeviceId(deviceId: string) {
        return Device.findOne({deviceId: deviceId})
    }
}

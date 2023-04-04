import {FinalDBDevice} from "../../schemas/dbSchemas/DeviceDBSchema";
import {viewDeviceModel} from "../../schemas/presentationSchemas/deviceSchemas";

export function mapDevice(obj: FinalDBDevice): viewDeviceModel{
    return {
        ip: obj.ip,
        title: obj.title,
        lastActiveDate:  obj.lastActiveDate.toString(),
        deviceId: obj.deviceId,
    }
}

export function mapDevices(objs: FinalDBDevice[]): viewDeviceModel[]{
    return objs.map(el => {
        return {
            deviceId: el.deviceId,
            ip: el.ip,
            lastActiveDate: el.lastActiveDate.toString() ,
            title: el.title,
        }
    })
}
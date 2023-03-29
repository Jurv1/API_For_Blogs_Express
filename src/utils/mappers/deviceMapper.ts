import {FinalDBDevice} from "../../schemas/dbSchemas/DeviceDBSchema";
import {viewDeviceModel} from "../../schemas/presentationSchemas/deviceSchemas";

export function mapDevice(obj: FinalDBDevice): viewDeviceModel{
    return {
        ip: obj.ip,
        title: obj.title,
        lastActivity: obj.lastActivity.toString(),
        deviceId: obj.deviceId,
    }
}

export function mapDevices(objs: FinalDBDevice[]): viewDeviceModel[]{
    return objs.map(el => {
        return {

            ip: el.ip,
            title: el.title,
            lastActivity: el.lastActivity.toString(),
            deviceId: el.deviceId,

        }
    })
}
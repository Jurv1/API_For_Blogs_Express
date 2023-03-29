import {FinalDBDevice} from "../../schemas/dbSchemas/DeviceDBSchema";
import {viewDeviceModel} from "../../schemas/presentationSchemas/deviceSchemas";

export function mapDevice(obj: FinalDBDevice): viewDeviceModel{
    return {
        id: obj._id.toString(),
        ip: obj.ip,
        title: obj.title,
        lastActivity: obj.lastActivity,
        deviceId: obj.deviceId,
    }
}

export function mapDevices(objs: FinalDBDevice[]): viewDeviceModel[]{
    return objs.map(el => {
        return {

            id: el._id.toString(),
            ip: el.ip,
            title: el.title,
            lastActivity: el.lastActivity,
            deviceId: el.deviceId,

        }
    })
}
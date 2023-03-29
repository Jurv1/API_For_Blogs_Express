import {FinalDBDevice} from "../../schemas/dbSchemas/DeviceDBSchema";
import {viewDeviceModel} from "../../schemas/presentationSchemas/deviceSchemas";

export function mapDevice(obj: FinalDBDevice): viewDeviceModel{
    return {
        ip: obj.ip,
        title: obj.title,
        lastActivity:  obj.lastActivity,
        deviceId: obj.deviceId,
    }
}

export function mapDevices(objs: FinalDBDevice[]): viewDeviceModel[]{
    return objs.map(el => {
        const lastAct = new Date(el.lastActivity).toString()
        return {

            ip: el.ip,
            title: el.title,
            lastActivity: lastAct ,
            deviceId: el.deviceId,

        }
    })
}
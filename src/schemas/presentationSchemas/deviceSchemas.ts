import {myId} from "./myId";

export type DeviceWithoutId = {
    ip: string,
    title: string,
    lastActivity: string,
    deviceId: string,
}

export type viewDeviceModel = myId & DeviceWithoutId
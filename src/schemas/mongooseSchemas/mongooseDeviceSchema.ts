import {model, Schema} from "mongoose";
import {DBDevice} from "../dbSchemas/DeviceDBSchema";

export const deviceSchema = new Schema<DBDevice>({
    ip: {type: String, required: true},
    title: {type: String, required: true},
    lastActiveDate: String,
    deviceId: String,
    userId: String
})

export const Device = model<DBDevice>("Device", deviceSchema)
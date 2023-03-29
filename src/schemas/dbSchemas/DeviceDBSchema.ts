import {MongoId} from "./MongoIdSchema";

export type DBDevice = {
    ip: string,
    title: string,
    lastActivity: Date,
    deviceId: string,
    userId: string
}

export type FinalDBDevice = MongoId & DBDevice
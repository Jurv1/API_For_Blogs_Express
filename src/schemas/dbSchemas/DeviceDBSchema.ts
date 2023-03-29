import {MongoId} from "./MongoIdSchema";

export type DBDevice = {
    ip: string,
    title: string,
    lastActiveDate: string,
    deviceId: string,
    userId: string
}

export type FinalDBDevice = MongoId & DBDevice
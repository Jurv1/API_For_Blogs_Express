import {ObjectId} from "mongodb";

export type DBUser = {
    login: string,
    email: string,
    password: string,
    passwordSalt: string,
    createdAt: string
}
type MongoId = {
    _id: ObjectId
}

export type FinalDBUser = MongoId & DBUser
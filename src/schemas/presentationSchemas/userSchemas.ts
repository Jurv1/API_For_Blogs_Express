import {myId} from "./myId";

export type UserWithoutId = {
    login: string,
    email: string,
    createdAt: string
}

export type ViewUserModel =  myId & UserWithoutId
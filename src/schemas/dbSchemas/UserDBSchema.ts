import {ObjectId} from "mongodb";

export type DBUser = {
    accountData: {
        login: string,
        email: string,
        password: string,
        passwordSalt: string,
        createdAt: string
    },
    emailConfirmation: {
        confirmationCode: string,
        expirationDate: any,
        isConfirmed: boolean
    }
}
type MongoId = {
    _id: ObjectId
}

export type FinalDBUser = MongoId & DBUser
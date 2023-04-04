import {MongoId} from "./MongoIdSchema";

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
        expirationDate: Date,
        isConfirmed: boolean
    }
}

export type FinalDBUser = MongoId & DBUser
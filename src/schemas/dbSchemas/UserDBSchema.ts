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
    },
    passRecovery: {
        recoveryCode: string | null,
        expirationDate: Date | null,
    }
}

export type FinalDBUser = MongoId & DBUser
import {model, Schema} from "mongoose";
import {DBUser} from "../dbSchemas/UserDBSchema";

export const userSchema = new Schema<DBUser>({
    accountData: {
        login: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        passwordSalt: {type: String, required: true},
        createdAt: String
    },
    emailConfirmation: {
        confirmationCode: {type: String, required: true},
        expirationDate: Date,
        isConfirmed: Boolean
    },
})

export const User = model<DBUser>("User", userSchema)
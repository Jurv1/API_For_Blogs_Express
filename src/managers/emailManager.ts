import {FinalDBUser} from "../schemas/dbSchemas/UserDBSchema";
import { emailAdapter } from "../adapters/emailAdapter";

export const emailManager = {
    async sendEmailConfirmationMessage(user: FinalDBUser | null, code: string){
        if (user) {
            const login = user.accountData.login
            const subject = "Please, to continue work with our service confirm your email"
            const message = `<div>Hello ${login}</div><div>If you want to use our service please confirm your email by the link below</div><a href = https://some-front.com/confirm-registration?code=${code}>click me</a>`

            return await emailAdapter.send(user.accountData.email, subject, message)
        }
        return null
    },

    async sendPasswordRecoveryMessage(user: FinalDBUser | null, code: string){
        if (user){
            const login = user.accountData.login
            const subject = "Password Recovery"
            const message = `<div>Hello ${login}</div><div>To finish password recovery please follow the link below:</div><a href = https://some-front.com/confirm-registration?code=${code}>click me</a>`

            return await emailAdapter.send(user.accountData.email, subject, message)
        }
        return null
    }
}
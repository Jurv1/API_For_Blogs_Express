import {UserQ} from "../repositories/queryRepository/userQ/userQ"
import {UsersRepository} from "../repositories/usersRepository"
import {emailManager} from "../managers/emailManager";
import {v4 as uuidv4} from "uuid";
import {injectable} from "inversify";

@injectable()
export class AuthService {

    constructor( protected usersRepository: UsersRepository, protected userQ: UserQ ) {}
    async confirmEmail(code: string): Promise<boolean> {

        try {
            const user = await this.userQ.getOneByConfirmationCode(code)
            if (!user) return false
            if (user.emailConfirmation.isConfirmed) return false
            if (user.emailConfirmation.confirmationCode !== code) return false
            if (user.emailConfirmation.expirationDate < new Date()) return false

            return await this.usersRepository.updateEmailConfirmation(user._id)
        } catch (err) {
            console.log(err)
            return false
        }

    }

    async resendConfirmationEmail(email: string) {

        const user = await this.userQ.getOneByLoginOrEmail(email)
        if (!user || !user.emailConfirmation.confirmationCode) return false
        const newRegistrationCode = uuidv4()
        try {
            await emailManager.sendEmailConfirmationMessage(user, newRegistrationCode)
        } catch (err) {
            console.log(err)
            return false
        }
        return await this.usersRepository.updateConfirmationCode(user._id, newRegistrationCode)

    }
}
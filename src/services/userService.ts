import {DBUser, FinalDBUser} from "../schemas/dbSchemas/UserDBSchema";
import {UsersRepository} from "../repositories/usersRepository";
import { v4 as uuidv4 } from "uuid"
import add from "date-fns/add"
import bcrypt from "bcrypt"
import {generateHash} from "../utils/bcrypt/generateHash";
import {emailManager} from "../managers/emailManager";
import {User} from "../schemas/mongooseSchemas/mongooseUserSchema";
import {ObjectId} from "mongodb";
import {UserQ} from "../repositories/queryRepository/userQ/userQ";
import {injectable} from "inversify";

@injectable()
export class UserService {
    constructor(protected usersRepository: UsersRepository, protected userQ: UserQ) {}
    async createOneUser(login: string, email: string, password: string, confirmed: boolean): Promise<FinalDBUser | null> {

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await generateHash(password, passwordSalt)

        const newUserTmp: DBUser = {
            accountData: {
                login: login,
                email: email,
                password: passwordHash,
                passwordSalt: passwordSalt,
                createdAt: new Date().toISOString()
            },
            emailConfirmation: {
                confirmationCode: uuidv4(),
                expirationDate: add(new Date(), {
                    hours: 1,
                    minutes: 3
                }),
                isConfirmed: confirmed
            },
            passRecovery: {
                recoveryCode: null,
                expirationDate: null
            }

        }
        const result = await this.usersRepository.createOne(newUserTmp)
        if (!confirmed) {
            try {
                if (result) await emailManager.sendEmailConfirmationMessage(result, result.emailConfirmation.confirmationCode)
            } catch (err) {
                console.log(err)
                return null
            }
        }
        return result

    }

    async checkCredentials(loginOrEmail: string, password: string): Promise<boolean> {

        const user = await this.userQ.getOneByLoginOrEmail(loginOrEmail)

        if (!user) return false

        if (!user.emailConfirmation.isConfirmed) return false

        return await bcrypt.compare(password, user.accountData.password)

    }

    async deleteOneBlog(id: string): Promise<boolean> {

        return await this.usersRepository.deleteOne(id)

    }

    async updatePassInfo(id: ObjectId, recoveryCode: string, expirationDate: Date) {
        const result = await User.updateOne({_id: id}, {
                $set: {
                    "passRecovery.recoveryCode": recoveryCode,
                    "passRecovery.expirationDate": expirationDate,
                },
            }
        )

        return result.modifiedCount === 1
    }

    async makePasswordRecoveryMail(email: string) {

        const user = await this.userQ.getOneByLoginOrEmail(email)

        if (!user) return false
        const userId = user._id;
        const recoveryCode = uuidv4();
        const expirationDate = add(new Date(), {
            hours: 1,
        });
        await this.updatePassInfo(userId, recoveryCode, expirationDate)

        try {
            await emailManager.sendPasswordRecoveryMessage(user, recoveryCode)
        } catch (err) {
            console.log(err)
            return null
        }


        return true

    }

    async updateNewPassword(pass: string, code: string) {

        const user = await this.userQ.getOneByPassCode(code)
        if (!user) return null

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await generateHash(pass, passwordSalt)

        return await this.usersRepository.updatePassword(user._id, passwordSalt, passwordHash)

    }
}
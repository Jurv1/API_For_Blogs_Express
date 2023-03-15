import { userDBController } from "../db/db";
import {DBUser, FinalDBUser} from "../schemas/dbSchemas/UserDBSchema";
import {usersRepository} from "../repositories/usersRepository";
import { v4 as uuidv4 } from "uuid"
import add from "date-fns/add"
import bcrypt from "bcrypt"
import {generateHash} from "../utils/bcrypt/generateHash";

import * as UserQueryRepo from "../repositories/queryRepository/userQ/userQ"
import {emailManager} from "../managers/emailManager";
import {getOneUserById} from "../repositories/queryRepository/userQ/userQ";

export async function createOneUser( login: string, email: string, password: string): Promise<FinalDBUser|null> {

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
            isConfirmed: false
        }

    }
    const result = await usersRepository.createOne(newUserTmp)
    try {
        if (result) await emailManager.sendEmailConfirmationMessage(result ,result.emailConfirmation.confirmationCode)
    } catch (err){
        console.log(err)
        return null
    }
    return result

}

export async function checkCredentials( loginOrEmail: string, password: string ): Promise<boolean> {

    const user = await UserQueryRepo.getOneByLoginOrEmail(loginOrEmail)

    if (!user) return false

    if (!user.emailConfirmation.isConfirmed) return false

    return await bcrypt.compare(password, user.accountData.password)

}

export async function deleteOneBlog(id: string): Promise<boolean> {

    return await usersRepository.deleteOne(id)

}
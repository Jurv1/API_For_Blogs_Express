import { userDBController } from "../db/db";
import {DBUser, FinalDBUser} from "../schemas/dbSchemas/UserDBSchema";
import {usersRepository} from "../repositories/usersRepository";
import bcrypt from "bcrypt"
import {generateHash} from "../utils/bcrypt/generateHash";

export async function createOneUser( login: string, email: string, password: string): Promise<FinalDBUser|null> {

    const passwordSalt = await bcrypt.genSalt(10)
    const passwordHash = await generateHash(password, passwordSalt)

    const newUserTmp: DBUser = {
        login: login,
        email: email,
        password: passwordHash,
        passwordSalt: passwordSalt,
        createdAt: new Date().toISOString()
    }
    const result = await usersRepository.createOne(newUserTmp)
    if (result){
        return await userDBController.findOne({_id: result._id});
    } else return null

}

export async function deleteOneBlog(id: string): Promise<boolean> {

    return await usersRepository.deleteOne(id)

}
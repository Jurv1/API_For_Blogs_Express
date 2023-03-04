import {Request, Response} from "express";
import * as UserQueryRepo from "../repositories/queryRepository/userQ/userQ"
import {generateHash} from "../utils/bcrypt/generateHash";

export async function loginUser(req: Request, res: Response){

    const {loginOrEmail, password} = req.body

    try {
        const user = await UserQueryRepo.getOneByLoginOrPassword(loginOrEmail)

        if(!user){
            res.sendStatus(401)
            return
        }

        const passwordHash = await generateHash(password, user.passwordSalt)

        if (user.password !== passwordHash){
            res.sendStatus(401)
            return
        }
        res.sendStatus(204)

    } catch (err){
        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })
    }
}
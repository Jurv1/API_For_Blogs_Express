import {Request, Response} from "express";
import * as UserQueryRepo from "../repositories/queryRepository/userQ/userQ"
import { checkCredentials } from "../services/userService";
import {jwtService} from "../application/jwtService";

export async function loginUser(req: Request, res: Response){

    const {loginOrEmail, password} = req.body

    try {

        const checkMe = await checkCredentials(loginOrEmail, password)
        if (checkMe){
            const user = await UserQueryRepo.getOneByLoginOrPassword(loginOrEmail)
            if(!user){
                res.sendStatus(401)
                return
            }

            const token = await jwtService.createJWT(user)
            res.status(200).send(token)
        } else {
            res.sendStatus(401)
            return
        }

    } catch (err){
        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })
    }
}

export async function getMe(req: Request, res: Response){
    const result = {
        email: req.user!.email,
        login: req.user!.login,
        userId: req.user!._id
    }
    res.status(200).send(result)
}
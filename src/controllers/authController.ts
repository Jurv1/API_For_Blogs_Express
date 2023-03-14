import {Request, Response} from "express";
import * as UserQueryRepo from "../repositories/queryRepository/userQ/userQ"
import { checkCredentials, createOneUser } from "../services/userService";
import {jwtService} from "../application/jwtService";
import {confirmEmail} from "../services/authService";

export async function loginUser(req: Request, res: Response){

    const {loginOrEmail, password} = req.body

    try {

        const checkMe = await checkCredentials(loginOrEmail, password)
        if (checkMe){
            const user = await UserQueryRepo.getOneByLoginOrEmail(loginOrEmail)
            if(!user){
                res.sendStatus(401)
                return
            }

            const token = await jwtService.createJWT(user)
            res.status(200).json({ accessToken: token})
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
    try {
        const result = {
            email: req.user!.accountData.email,
            login: req.user!.accountData.login,
            userId: req.user!._id
        }
        res.status(200).send(result)
    } catch (err){
        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })
    }

}

export async function registerMe(req: Request, res: Response){
    const {login, password, email} = req.body
    try {
        const user = await createOneUser(login, email, password)
        if(user) {
            res.sendStatus(204)
        } else {
            res.status(400).send
        }
    } catch (err){

    }
}

export async function confirmRegistration(req: Request, res: Response){
    const code= req.body
    const result = await confirmEmail(code)
}

export async function resendRegistrationConfirming(req: Request, res: Response){

}
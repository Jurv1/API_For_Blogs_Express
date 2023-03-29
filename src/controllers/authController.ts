import {Request, Response} from "express";
import * as UserQueryRepo from "../repositories/queryRepository/userQ/userQ"
import { checkCredentials, createOneUser } from "../services/userService";
import {jwtService} from "../application/jwtService";
import {confirmEmail, resendConfirmationEmail} from "../services/authService";
import { createNewDevice } from "../services/deviceService";
import jwt from "jsonwebtoken";
import {deviceRepository} from "../repositories/devicesRepository";
import { getOneDeviceByIp } from "../repositories/queryRepository/deviceQ/deviceQ";


export async function loginUser(req: Request, res: Response){

    const {loginOrEmail, password} = req.body
    const ip = req.ip
    const title = req.headers["user-agent"] || "untitled device"
    console.log(ip, "    ", title)
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode}`)

    try {

        const checkMe = await checkCredentials(loginOrEmail, password)
        if (checkMe){
            const user = await UserQueryRepo.getOneByLoginOrEmail(loginOrEmail)
            console.log(user)

            const token = await jwtService.createJWT(user!, "30m")
            const refreshToken = await jwtService.createJWT(user!, "1h")

            const device = await getOneDeviceByIp(ip)
            if (device){
                const decodedRefresh = jwt.decode(refreshToken, {json: true})

                if(decodedRefresh && decodedRefresh.iat) {

                    const isDevicesWasUpdated =  await deviceRepository.updateLastActivity(device.deviceId, (new Date()).toISOString())

                    if (isDevicesWasUpdated) console.log("It's Ok")
                }

            } else {
                await createNewDevice(ip, title, refreshToken)
            }

            res.cookie('refreshToken', refreshToken, )
                .header('Authorization', token).status(200).json({ accessToken: token})
        } else {
            res.sendStatus(401)
            return
        }
//{httpOnly: true, secure: true}
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
        const user = await createOneUser(login, email, password, false)
        if(user) {
            res.sendStatus(204)
        } else {
            res.status(400).json({
                "errorsMessages": {
                    "message": "s",
                    "field": "login"
                }
            })
        }
    } catch (err){
        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })
    }
}

export async function confirmRegistration(req: Request, res: Response){
    const code = req.body.code
    try {
        const result = await confirmEmail(code)
        if (!result) {
            res.status(400).json({
                "errorsMessages": [
                    {
                        "message": "Something went wrong",
                        "field": "code"
                    }
                ]
            })
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

export async function resendRegistrationConfirming(req: Request, res: Response){
    const email = req.body.email

    try {
        const result = await resendConfirmationEmail(email)
        if (!result){
            res.sendStatus(400)
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

export async function refreshMyToken(req: Request, res: Response){
    const refreshToken = req.cookies.refreshToken

    try {
        const userId = await jwtService.getUserIdByToken(refreshToken)

        if(userId){
         const user = await UserQueryRepo.getOneUserById(userId.toString())
         const accessToken = await jwtService.createJWT(user!, "10s")
         const newRefreshToken = await jwtService.createJWT(user!, "20s")
            await jwtService.addTokenToBlackList(refreshToken)
        //if (!addTokenToBlackList){
            //              return  res.sendStatus(401)
            //          }
         res.cookie('refreshToken', newRefreshToken, {httpOnly: true, secure: true})
             .header('Authorization', accessToken).status(200).json({ accessToken: accessToken})

     } else return res.sendStatus(401)

    }catch(err){
        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })
    }
}

export async function logOut( req: Request, res: Response){
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken) return res.sendStatus(401)

    await jwtService.addTokenToBlackList(refreshToken)

    const decodedRefresh = jwt.decode(refreshToken, {json: true})
    const deviceId = decodedRefresh!.deviceId
    await deviceRepository.deleteOneDeviceById(deviceId)

    return res.sendStatus(204)
}
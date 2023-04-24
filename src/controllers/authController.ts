import {Request, Response} from "express";
import { v4 as uuidv4 } from "uuid"
import {UserQ} from "../repositories/queryRepository/userQ/userQ";
import {AuthService} from "../services/authService";
import {UserService} from "../services/userService";
import {DeviceService} from "../services/deviceService";
import {DevicesRepository} from "../repositories/devicesRepository";
import {JWTService} from "../application/jwtService";
import {injectable} from "inversify";

@injectable()
export class AuthController {

    constructor(protected userService: UserService,
                protected userQ: UserQ,
                protected authService: AuthService,
                protected deviceService: DeviceService,
                protected jwtService: JWTService,
                protected devicesRepository: DevicesRepository) {
    }
    async loginUser(req: Request, res: Response) {

        const {loginOrEmail, password} = req.body
        const ip = req.ip
        const title = req.headers["user-agent"] || "untitled device"
        console.log(ip, "    ", title)
        console.log(`${req.method} ${req.originalUrl} ${res.statusCode}`)

        try {

            const checkMe = await this.userService.checkCredentials(loginOrEmail, password)
            if (checkMe) {
                const user = await this.userQ.getOneByLoginOrEmail(loginOrEmail)
                console.log(user)
                const deviceId = uuidv4()
                const token = await this.jwtService.createJWT(user!, deviceId, "30m")
                const refreshToken = await this.jwtService.createJWT(user!, deviceId, "1h")

                const jwtPayload = await this.jwtService.getPayload(refreshToken)

                await this.deviceService.createNewDevice(ip, title, jwtPayload)

                res.cookie('refreshToken', refreshToken, {httpOnly: true, secure: true})
                    .header('Authorization', token).status(200).json({accessToken: token})
            } else {
                res.sendStatus(401)
                return
            }
        } catch (err) {
            console.log(err)
            res.status(404).json({
                message: "Can't find el"
            })
        }
    }

    async getMe(req: Request, res: Response) {
        try {
            const result = {
                email: req.user!.accountData.email,
                login: req.user!.accountData.login,
                userId: req.user!._id
            }
            res.status(200).send(result)
        } catch (err) {
            console.log(err)
            res.status(404).json({
                message: "Can't find el"
            })
        }

    }

    async registerMe(req: Request, res: Response) {

        const {login, password, email} = req.body
        try {
            const user = await this.userService.createOneUser(login, email, password, false)
            if (user) {
                res.sendStatus(204)
            } else {
                res.status(400).json({
                    "errorsMessages": {
                        "message": "s",
                        "field": "login"
                    }
                })
            }
        } catch (err) {
            console.log(err)
            res.status(404).json({
                message: "Can't find el"
            })
        }
    }

    async recoverMyPassword(req: Request, res: Response) {

        const email = req.body.email

        try {
            await this.userService.makePasswordRecoveryMail(email)

            res.status(204).send("Message sent")

        } catch (err) {
            console.log(err)
            res.status(404).json({
                message: "Can't find el"
            })
        }
    }

    async makeNewPassword(req: Request, res: Response) {
        const {newPassword, recoveryCode} = req.body

        try {

            await this.userService.updateNewPassword(newPassword, recoveryCode)

            res.sendStatus(204)

        } catch (err) {
            console.log(err)
            res.status(404).json({
                message: "Can't find el"
            })
        }
    }

    async confirmRegistration(req: Request, res: Response) {
        const code = req.body.code
        try {
            const result = await this.authService.confirmEmail(code)
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
        } catch (err) {
            console.log(err)
            res.status(404).json({
                message: "Can't find el"
            })
        }
    }

    async resendRegistrationConfirming(req: Request, res: Response) {
        const email = req.body.email

        try {
            const result = await this.authService.resendConfirmationEmail(email)
            if (!result) {
                res.sendStatus(400)
                return
            }

            res.sendStatus(204)
        } catch (err) {
            console.log(err)
            res.status(404).json({
                message: "Can't find el"
            })
        }
    }

    async refreshMyToken(req: Request, res: Response) {
        const refreshToken = req.cookies.refreshToken

        try {
            const userId = await this.jwtService.getUserIdByToken(refreshToken)

            if (userId) {
                const user = await this.userQ.getOneUserById(userId.toString())
                const payload = await this.jwtService.getPayload(refreshToken)
                const accessToken = await this.jwtService.createJWT(user!, payload.deviceId, "10s")
                const newRefreshToken = await this.jwtService.createJWT(user!, payload.deviceId, "20s")
                const newRefreshTokenPayload = await this.jwtService.getPayload(newRefreshToken)
                await this.devicesRepository.updateLastActivity(newRefreshTokenPayload)

                res.cookie('refreshToken', newRefreshToken, {httpOnly: true, secure: true})
                    .header('Authorization', accessToken).status(200).json({accessToken: accessToken})

            } else return res.sendStatus(401)

        } catch (err) {
            console.log(err)
            res.status(404).json({
                message: "Can't find el"
            })
        }
    }

    async logOut(req: Request, res: Response) {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) return res.sendStatus(401)

        const payload = await this.jwtService.getPayload(refreshToken)
        await this.devicesRepository.deleteOneDeviceById(payload.deviceId)

        return res.sendStatus(204)
    }
}
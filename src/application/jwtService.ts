import {FinalDBUser} from "../schemas/dbSchemas/UserDBSchema";
import jwt from "jsonwebtoken"
import {settings} from "../settings";
import {ObjectId} from "mongodb";
import { v4 as uuidv4 } from "uuid"
import {refreshTokensDBController} from "../db/db";

export const jwtService = {
    async createJWT(user: FinalDBUser, exp: string) {
        const deviceId = uuidv4()
        return jwt.sign({userId: user!._id, deviceId}, settings.JWT_SECRET, {expiresIn: exp})
    },
    async getUserIdByToken(token: string){
        try {
            const result: any = jwt.verify(token, settings.JWT_SECRET)
            return new ObjectId(result.userId)
        } catch (err){
            return null
        }
    },
    async addTokenToBlackList(refreshToken: string): Promise<boolean> {
        const payload: any = jwt.decode(refreshToken)
        let expirationDate = payload.exp // seconds * 1000 => date
        expirationDate = new Date(Number(expirationDate * 1000))
        const refreshTokenTmp = {
            refreshToken: refreshToken,
            payload: payload,
            expDate: expirationDate
        }
        const result = await refreshTokensDBController.insertOne(refreshTokenTmp)
        if (result){
            const refreshToken = await refreshTokensDBController.findOne({_id: result})
            return !!refreshToken
        }
        return false
    },

    async getPayload(token: string) {
        try {
            const res: any = jwt.verify(token, settings.JWT_SECRET)
            return res
        } catch (error) {
            return null
        }
    },

    getLastActiveDate(refreshToken: string): string {
        const payload: any = jwt.decode(refreshToken)
        return new Date(payload.iat * 1000).toISOString()
    },


    // CRON | sheduling
    async clearOldTokens(){

    }
}
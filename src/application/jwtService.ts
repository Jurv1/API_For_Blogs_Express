import {FinalDBUser} from "../schemas/dbSchemas/UserDBSchema";
import jwt from "jsonwebtoken"
import {settings} from "../settings";
import {ObjectId} from "mongodb";

export class jwtService {
    async createJWT(user: FinalDBUser, deviceId: string, exp: string) {
        const userId = user!._id.toString()
        return jwt.sign({userId: userId, deviceId: deviceId}, settings.JWT_SECRET, {expiresIn: exp})
    }

    async getUserIdByToken(token: string){
        try {
            const result: any = jwt.verify(token, settings.JWT_SECRET)
            return new ObjectId(result.userId)
        } catch (err){
            return null
        }
    }

    async getPayload(token: string) {
        try {
            const res: any = jwt.verify(token, settings.JWT_SECRET)
            return res
        } catch (error) {
            return null
        }
    }

    // CRON | sheduling
    async clearOldTokens(){

    }
}
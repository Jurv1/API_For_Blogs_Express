import {FinalDBUser} from "../schemas/dbSchemas/UserDBSchema";
import jwt from "jsonwebtoken"
import {settings} from "../settings";
import {ObjectId} from "mongodb";

export const jwtService = {
    async createJWT(user: FinalDBUser) {
        return jwt.sign({userId: user!._id}, settings.JWT_SECRET, {expiresIn: "1h"})
    },
    async getUserIdByToken(token: string){
        try {
            const result: any = jwt.verify(token, settings.JWT_SECRET)
            return new ObjectId(result.userId)
        } catch (err){
            return null
        }
    }
}
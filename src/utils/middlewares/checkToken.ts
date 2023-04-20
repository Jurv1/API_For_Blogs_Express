import {NextFunction, Request, Response} from "express";
import {JWTService} from "../../application/jwtService";
import {UserQ} from "../../repositories/queryRepository/userQ/userQ";

const jwt = new JWTService()
const userQ = new UserQ()
export async function checkToken(req: Request, res: Response, next: NextFunction) {

if (!req.headers.authorization){
    next()
}

const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

const userId = await jwt.getUserIdByToken(token)
if (userId) {
    try {
        req.user = await userQ.getOneUserById(userId.toString())
        next()
        return
    } catch (err){
        console.log(err)
    }
    }
}
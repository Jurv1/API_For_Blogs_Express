import {NextFunction, Request, Response} from "express";
import {refreshTokensDBController} from "../../db/db";
import {jwtService} from "../../application/jwtService";

export async function isRefreshTokenInBlackList( req: Request, res: Response, next: NextFunction){
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken){
        return res.sendStatus(401)
    }
    const checkToken = await refreshTokensDBController.findOne({ refreshToken: refreshToken })
    if (checkToken){
        return res.sendStatus(404)
    }
    const userId = await jwtService.getUserIdByToken(refreshToken)
    if (userId) next()
    else return res.sendStatus(400)
}
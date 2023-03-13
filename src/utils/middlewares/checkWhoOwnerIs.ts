import {NextFunction, Response, Request} from "express";
import {ObjectId} from "mongodb";
import {getOneComment} from "../../repositories/queryRepository/commentQ/commentQ"

export async function checkWhoOwnerIs( req: Request, res: Response, next: NextFunction){
    const myId = req.params.id
    try {
        const foundedEl = await getOneComment(myId)
        if (foundedEl?.commentatorInfo.userId === req.user!._id.toString()) next()
        else res.sendStatus(403)
    } catch (err){

    }
}
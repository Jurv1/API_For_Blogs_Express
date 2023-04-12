import {NextFunction, Response, Request} from "express";
import {commentQ} from "../../repositories/queryRepository/commentQ/commentQ"
import {ObjectId} from "mongodb";

export async function checkWhoOwnerIs( req: Request, res: Response, next: NextFunction){
    const myId = new ObjectId(req.params.id)
    const foundedEl = await commentQ.getOneComment(myId)
    console.log(req.user!._id.toString())
    console.log(foundedEl)
    if ( foundedEl && foundedEl.commentatorInfo.userId === req.user!._id.toString()) {
        console.log(foundedEl)
        next()
    }
    else {
        console.log(foundedEl)
        console.log(foundedEl?.commentatorInfo.userId)
        res.sendStatus(403)
    }

}
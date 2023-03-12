import {Request, Response} from "express";
import * as CommentService from "../services/commentService"
import * as CommentQueryRepo from "../repositories/queryRepository/commentQ/commentQ"

export async function getOneById(req: Request, res: Response){
    const id = req.params.id

    try {
        const comment = await CommentQueryRepo.getOneComment(id)
        comment ? res.status(200).send(comment) : res.sendStatus(404)
    } catch (err){
        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })
    }
}

export async function updateOneById(req: Request, res: Response){
    const id = req.params.commentId
    const content = req.body.content
    try {

        const result = await CommentService.updateOneCommentById(id, content)
        result ? res.sendStatus(204) : res.sendStatus(404)

    } catch (err){
        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })
    }
}

export async function deleteOneById(req: Request, res: Response){
    const id = req.params.commentId
    const userId = req.user!._id.toString()

    try {
        const result = await CommentService.deleteOneCommentById(id, userId)
        result ? res.sendStatus(204) : res.sendStatus(404)
    } catch (err){
        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })
    }
}
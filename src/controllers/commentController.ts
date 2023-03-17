import {Request, Response} from "express";
import * as CommentService from "../services/commentService"
import * as CommentQueryRepo from "../repositories/queryRepository/commentQ/commentQ"
import {ObjectId} from "mongodb";

export async function getOneById(req: Request, res: Response){
    const id = new ObjectId(req.params.id)

    try {
        const result = await CommentQueryRepo.getOneComment(id)

        if (result) {
            res.status(200).send(result)
            return
        } else {
            res.sendStatus(404)
        }
    } catch (err){
        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })
    }
}

export async function updateOneById(req: Request, res: Response){
    const id = req.params.id
    const content = req.body.content
    try {

        const result = await CommentService.updateOneCommentById(id, content)
        if (!result) {
            res.status(404).json({
                message: "Not good"
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

export async function deleteOneById(req: Request, res: Response){
    const id = req.params.id

    try {
        const result = await CommentService.deleteOneCommentById(id)
        if (!result) return res.send(404)
        res.send(204)
    } catch (err){
        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })
    }
}
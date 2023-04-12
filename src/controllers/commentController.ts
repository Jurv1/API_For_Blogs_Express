import {Request, Response} from "express";
import {ObjectId} from "mongodb";
import {CommentQ} from "../repositories/queryRepository/commentQ/commentQ";
import {CommentService} from "../services/commentService";

class CommentController {
    private commentQ: CommentQ;
    private commentService: CommentService;
    constructor() {
        this.commentQ = new CommentQ
        this.commentService = new CommentService
    }
    async getOneById(req: Request, res: Response) {
        const id = new ObjectId(req.params.id)

        try {
            const result = await this.commentQ.getOneComment(id)

            if (result) {
                res.status(200).send(result)
                return
            } else {
                res.sendStatus(404)
            }
        } catch (err) {
            console.log(err)
            res.status(404).json({
                message: "Can't find el"
            })
        }
    }

    async updateOneById(req: Request, res: Response) {
        const id = req.params.id
        const content = req.body.content
        try {

            const result = await this.commentService.updateOneCommentById(id, content)
            if (!result) {
                res.status(404).json({
                    message: "Not good"
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

    async deleteOneById(req: Request, res: Response) {
        const id = req.params.id

        try {
            const result = await this.commentService.deleteOneCommentById(id)
            if (!result) return res.send(404)
            res.send(204)
        } catch (err) {
            console.log(err)
            res.status(404).json({
                message: "Can't find el"
            })
        }
    }
}

export const commentController = new CommentController()
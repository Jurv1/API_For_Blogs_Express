import {Request, Response} from "express";
import {ObjectId} from "mongodb";
import {CommentQ} from "../repositories/queryRepository/commentQ/commentQ";
import {CommentService} from "../services/commentService";
import {injectable} from "inversify";
import {LikesRepository} from "../repositories/likesRepository";

@injectable()
export class CommentController {
    constructor( protected commentQ: CommentQ, protected commentService: CommentService, protected likesRepo: LikesRepository) {}
    async getOneById(req: Request, res: Response) {
        const id = new ObjectId(req.params.id)
        const userId = req.user?._id
        try {
            const result = await this.commentQ.getOneComment(id, userId)

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

    async likeCommentOrPost(req: Request, res: Response){

        const id = req.params.id
        const likeStatus = req.body.likeStatus
        const userId = req.user!._id.toString()
        const userLogin  = req.user!.accountData.login

        try {
            const userStatus = await this.likesRepo.getUserStatusForComment(userId, id)
            if (likeStatus === "None"){
                const result = await this.commentService.deleteLikeDislike(userId, id, userStatus!.userStatus)
                if(result){
                    res.sendStatus(204)
                    return
                }
                return res.sendStatus(404)

            }
            if(likeStatus === "Like"){
                if(userStatus?.userStatus === "Dislike"){
                    //remove dislike and create like
                    await this.commentService.deleteLikeDislike(userId, id, userStatus.userStatus)
                    res.sendStatus(204)
                    return
                }
                else if (userStatus?.userStatus === "Like"){
                    res.sendStatus(204)
                    return
                }
                else {
                    const result =
                        await this.likesRepo.likePostOrComment(id, likeStatus, userId, userLogin)
                    if (result){
                        res.sendStatus(204)
                        return
                    }
                    res.sendStatus(404)
                }
            }
            if(likeStatus === "Dislike"){
                if(userStatus?.userStatus === "Like"){
                    await this.commentService.deleteLikeDislike(userId, id, userStatus.userStatus)
                    const result = await this.likesRepo.likePostOrComment(id,
                        likeStatus, userId, userLogin)
                    if (result){
                        res.sendStatus(204)
                        return
                    }
                    return res.sendStatus(404)
                    //remove like and create dislike
                }
                else if (userStatus?.userStatus === "Dislike"){
                    res.sendStatus(204)
                    return
                }
                else {
                    //create Dislike
                    const result =
                        await this.likesRepo.likePostOrComment(id, likeStatus, userId, userLogin)
                    if (result){
                        res.sendStatus(204)
                        return
                    }
                    res.sendStatus(404)
                }
            }

            res.sendStatus(404)
        } catch (err){

        }
    }

}
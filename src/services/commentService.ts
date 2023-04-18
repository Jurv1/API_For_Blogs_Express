import {CommentRepository} from "../repositories/commentRepository";
import {SortOrder} from "mongoose";
import {DBLike} from "../schemas/dbSchemas/LikesDBSchema";

export class CommentService {
    constructor( protected commentsRepository: CommentRepository) {}
    async updateOneCommentById(id: string, content: string): Promise<boolean> {
        return await this.commentsRepository.updateOne(id, content)
    }

    async deleteOneCommentById(id: string): Promise<boolean> {

        return await this.commentsRepository.deleteOne(id)

    }

    async likeComment(commentId: string, likeStatus: string){
        if (likeStatus === "Like"){
            const LikeTmp: DBLike = {
                userId: "",
                userStatus: likeStatus,
                commentId: commentId
            }
           return await this.commentsRepository.makeLikeForPost(LikeTmp)
        }
        if (likeStatus === "Dislike"){
            const LikeTmp: DBLike = {
                userId: "",
                userStatus: likeStatus,
                commentId: commentId
            }
            return await this.commentsRepository.makeLikeForPost(LikeTmp)
        }
    }

    async updateLikeStatus(id: string, increment: number, likeStatus: string){
        let incField = "None"
        let updateField: { [key: string]: number } = {}
        if (likeStatus === "Like"){
            updateField['likesInfo.likesCount'] = increment
        }
        if (likeStatus === "Dislike"){
            updateField['likesInfo.dislikesCount'] = increment
        }
        console.log(updateField)
        return await this.commentsRepository.updateLikeStatus(id, updateField)
    }
}

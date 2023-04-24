import {CommentRepository} from "../repositories/commentRepository";
import {DBLike} from "../schemas/dbSchemas/LikesDBSchema";
import {injectable} from "inversify";

@injectable()
export class CommentService {
    constructor( protected commentsRepository: CommentRepository) {}
    async updateOneCommentById(id: string, content: string): Promise<boolean> {
        return await this.commentsRepository.updateOne(id, content)
    }

    async deleteOneCommentById(id: string): Promise<boolean> {

        return await this.commentsRepository.deleteOne(id)

    }

    async deleteLikeDislike(userId: string, commentId: string, userStatus: string){

        return await this.commentsRepository.deleteLikeDislike(userId, commentId, userStatus)

    }

    async likeComment(commentId: string, likeStatus: string, userId: string){

            const LikeTmp: DBLike = {
                userId: userId,
                userStatus: likeStatus,
                commentId: commentId
            }
            await this.commentsRepository
            return await this.commentsRepository.makeLikeForPost(LikeTmp)
    }

    async updateLikeStatus(id: string, increment: number, likeStatus: string){
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

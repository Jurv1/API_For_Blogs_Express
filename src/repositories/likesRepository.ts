import {injectable} from "inversify";
import {DBLike} from "../schemas/dbSchemas/LikesDBSchema";
import {Like} from "../schemas/mongooseSchemas/mongooseLikesSchema";

@injectable()
export class LikesRepository{
    async makeLikeForPost(newLike: DBLike){
        return await Like.create(newLike)
    }

    async deleteLikeDislike(userId: string, commentId: string, userStatus: string){
        const result = await Like.deleteOne({ $and: [ {userId: userId}, {commentId: commentId},
                { userStatus: userStatus }] })

        return result.deletedCount === 1
    }

    async getUserStatusForComment(userId: string, commentId: string): Promise<DBLike | null>{
        return Like.findOne(  { $and: [{userId: userId}, {commentPostId: commentId}]})
    }

    async likePostOrComment(commentPostId: string, likeStatus: string, userId: string, userLogin: string){
        const LikeTmp: DBLike = {
            userId: userId,
            userLogin: userLogin,
            userStatus: likeStatus,
            commentPostId: commentPostId,
            addedAt: (new Date()).toISOString()
        }
        //await this.commentsRepository
        return await this.makeLikeForPost(LikeTmp)
    }
}
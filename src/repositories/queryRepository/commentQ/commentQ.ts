import {ObjectId} from "mongodb";
import {viewCommentModel} from "../../../schemas/presentationSchemas/commentSchemas";
import {Comment} from "../../../schemas/mongooseSchemas/mongooseCommentSchema";
import {Like} from "../../../schemas/mongooseSchemas/mongooseLikesSchema";
import {DBLike} from "../../../schemas/dbSchemas/LikesDBSchema";
import {injectable} from "inversify";

@injectable()
export class CommentQ {
    async getOneComment(id: ObjectId, userId?: ObjectId): Promise<viewCommentModel|null> {

        const allLikes = await Like.countDocuments({$and:[{commentId: id}, {userStatus: "Like"}] })
        const allDislikes = await Like.countDocuments({$and:[{commentId: id}, {userStatus: "Dislike"}] })
        console.log(allLikes, allDislikes)
        let userStatus

        const result = await Comment.findById({ _id: id })

        if (userId){
            const like = await this.getUserStatusForComment(userId.toString(), id.toString())
            userStatus = like?.userStatus
        }

        return {
            id: result!._id.toString(),
            content: result!.content,
            commentatorInfo: {
                userId: result!.commentatorInfo.userId,
                userLogin: result!.commentatorInfo.userLogin
            },
            createdAt: result!.createdAt,
            likesInfo: {
                likesCount: allLikes,
                dislikesCount: allDislikes,
                myStatus: userStatus || "None"
            }
        }
        //return mapComment(result)

    }

    async getUserStatusForComment(userId: string, commentId: string): Promise<DBLike | null>{
        return Like.findOne(  { $and: [{userId: userId}, {commentId: commentId}]})
    }
}

import {ObjectId} from "mongodb";
import {mapComment} from "../../../utils/mappers/commentMapper";
import {viewCommentModel} from "../../../schemas/presentationSchemas/commentSchemas";
import {Comment} from "../../../schemas/mongooseSchemas/mongooseCommentSchema";
import {Like} from "../../../schemas/mongooseSchemas/mongooseLikesSchema";
import {DBLike} from "../../../schemas/dbSchemas/LikesDBSchema";

export class CommentQ {
    async getOneComment(id: ObjectId, userId?: ObjectId): Promise<viewCommentModel|null> {

        const allLikes = await Like.countDocuments({$and:[{commentId: id}, {userStatus: "Like"}] })
        const allDislikes = await Like.countDocuments({$and:[{commentId: id}, {userStatus: "Dislike"}] })
        console.log(allLikes, allDislikes)
        let userStatus

        const result = await Comment.findById({ _id: id })

        if (userId){
            const like = await this.getUserStatusForComment(userId.toString())
            userStatus = like?.userStatus
        }

        if(!result){
            console.log("SEX")
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

    async getUserStatusForComment(userId: string): Promise<DBLike | null>{
        return Like.findOne({userId: userId})
    }
}

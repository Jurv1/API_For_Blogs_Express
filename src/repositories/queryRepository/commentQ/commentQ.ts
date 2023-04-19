import {ObjectId} from "mongodb";
import {mapComment} from "../../../utils/mappers/commentMapper";
import {viewCommentModel} from "../../../schemas/presentationSchemas/commentSchemas";
import {Comment} from "../../../schemas/mongooseSchemas/mongooseCommentSchema";
import {Like} from "../../../schemas/mongooseSchemas/mongooseLikesSchema";
import {DBLike} from "../../../schemas/dbSchemas/LikesDBSchema";

export class CommentQ {
    async getOneComment(id: ObjectId): Promise<viewCommentModel|null> {

        const allLikes = await Like.countDocuments({$and:[{commentId: id}, {userStatus: "Like"}] })
        const allDislikes = await Like.countDocuments({$and:[{commentId: id}, {userStatus: "Dislike"}] })
        console.log(allLikes, allDislikes)

        const result = await Comment.findById({ _id: id })

        const like = await this.getUserStatusForComment(result!.commentatorInfo.userId)

        let userStatus = like?.userStatus

        if(!userStatus){
            userStatus = "None"
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
                myStatus: userStatus
            }
        }
        //return mapComment(result)

    }

    async getUserStatusForComment(userId: string): Promise<DBLike | null>{
        return Like.findOne({userId: userId})
    }
}

import {ObjectId} from "mongodb";
import {viewCommentModel} from "../../../schemas/presentationSchemas/commentSchemas";
import {Comment} from "../../../schemas/mongooseSchemas/mongooseCommentSchema";
import {Like} from "../../../schemas/mongooseSchemas/mongooseLikesSchema";
import {injectable} from "inversify";
import {LikesRepository} from "../../likesRepository";

@injectable()
export class CommentQ {

    constructor(protected likesRepo: LikesRepository) {
    }
    async getOneComment(id: ObjectId, userId?: ObjectId): Promise<viewCommentModel|null> {

        const allLikes = await Like.countDocuments({$and:[{commentPostId: id}, {userStatus: "Like"}] })
        const allDislikes = await Like.countDocuments({$and:[{commentPostId: id}, {userStatus: "Dislike"}] })
        console.log(allLikes, allDislikes)
        let userStatus

        const result = await Comment.findById({ _id: id })

        if (userId){
            const like = await this.likesRepo.getUserStatusForComment(userId.toString(), id.toString())
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


}

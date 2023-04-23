import {FinalDBComment} from "../../schemas/dbSchemas/CommentDBSchema";
import {viewCommentModel} from "../../schemas/presentationSchemas/commentSchemas";
import {Like} from "../../schemas/mongooseSchemas/mongooseLikesSchema";
import {ObjectId} from "mongodb";
import {CommentQ} from "../../repositories/queryRepository/commentQ/commentQ";
import {DBLike} from "../../schemas/dbSchemas/LikesDBSchema";

export function mapComment(obj: FinalDBComment): viewCommentModel{
    return {
        id: obj._id.toString(),
        content: obj.content,
        commentatorInfo: obj.commentatorInfo,
        createdAt: obj.createdAt,
        likesInfo: {
            likesCount: obj.likesInfo.likesCount,
            dislikesCount: obj.likesInfo.dislikesCount,
            myStatus: obj.likesInfo.myStatus
        }
    }
}

export async function mapComments(objs: FinalDBComment[], userId?: ObjectId | null): Promise<any> {

    const commentQ = new CommentQ()
    let like: DBLike|null
    let userStatus = "None"

    return await Promise.all(objs.map(async el => {

            const allLikes = await Like.countDocuments({$and: [{commentId: el._id.toString()}, {userStatus: "Like"}]})
            const allDislikes = await Like.countDocuments({$and: [{commentId: el._id.toString()}, {userStatus: "Dislike"}]})
            if(userId){
                like = await Like.findOne({$and: [ {commentId: el._id}, { userId: userId } ]})
                //like = await commentQ.getUserStatusForComment(userId.toString(), el._id.toString())
                if(like){
                    userStatus = like.userStatus
                }
            }

            return {

                id: el._id.toString(),
                content: el.content,
                commentatorInfo: el.commentatorInfo,
                createdAt: el.createdAt,
                likesInfo: {
                    likesCount: allLikes,
                    dislikesCount: allDislikes,
                    myStatus: userStatus
                }

            }
        })
    )

}
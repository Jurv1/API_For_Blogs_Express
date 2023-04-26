import {FinalDBPost} from "../../schemas/dbSchemas/PostDBSchema";
import {viewPostModel} from "../../schemas/presentationSchemas/postSchemas";
import {Like} from "../../schemas/mongooseSchemas/mongooseLikesSchema";
import {ObjectId} from "mongodb";
import {CommentQ} from "../../repositories/queryRepository/commentQ/commentQ";
import {DBLike} from "../../schemas/dbSchemas/LikesDBSchema";
import {DBNewestLikes} from "../../schemas/dbSchemas/NewestLikesDBSchema";
import {LikesRepository} from "../../repositories/likesRepository";

// export function mapPost(obj: FinalDBPost): viewPostModel{
//     return {
//         id: obj._id.toString(),
//         title: obj.title,
//         shortDescription: obj.shortDescription,
//         content: obj.content,
//         blogId: obj.blogId,
//         blogName: obj.blogName,
//         extendedLikesInfo: {
//             likesCount: obj.extendedLikesInfo.likesCount,
//             dislikesCount: obj.extendedLikesInfo.dislikesCount,
//             myStatus: obj.extendedLikesInfo.myStatus,
//         },
//         createdAt: obj.createdAt
//     }
// }

export async function mapPosts(objs: FinalDBPost[], userId?: ObjectId | null): Promise<viewPostModel[]>{

    const likesRepo = new LikesRepository()
    let like: DBLike|null
    let userStatus: string | undefined = "None"



    return await Promise.all( objs.map(async el => {
            const allLikes = await Like.countDocuments({$and: [{commentId: el._id.toString()}, {userStatus: "Like"}]})
            const allDislikes = await Like.countDocuments({$and: [{commentId: el._id.toString()}, {userStatus: "Dislike"}]})
            const lastThreeLikes: Array<DBNewestLikes> = await Like.find({_id: el._id}).limit(3).lean()

            if (userId){
                const like = await likesRepo.getUserStatusForComment(userId.toString(), el._id.toString())
                userStatus = like?.userStatus
            }


        return {
            id: el._id.toString(),
            title: el.title,
            shortDescription: el.shortDescription,
            content: el.content,
            blogId: el.blogId,
            blogName: el.blogName,
            extendedLikesInfo: {
                likesCount: allLikes,
                dislikesCount: allDislikes,
                myStatus: userStatus || "None",
                newestLikes: lastThreeLikes
            },
            createdAt: el.createdAt
        }
    })
    )
}
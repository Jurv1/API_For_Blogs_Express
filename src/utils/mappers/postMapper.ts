import {FinalDBPost} from "../../schemas/dbSchemas/PostDBSchema";
import {viewPostModel} from "../../schemas/presentationSchemas/postSchemas";
import {Like} from "../../schemas/mongooseSchemas/mongooseLikesSchema";
import {ObjectId} from "mongodb";
import {DBLike} from "../../schemas/dbSchemas/LikesDBSchema";
import {LikesRepository} from "../../repositories/likesRepository";
import {mapLikes} from "./likesMapper";

export function mapPost(obj: FinalDBPost): viewPostModel{
    return {
        id: obj._id.toString(),
        title: obj.title,
        shortDescription: obj.shortDescription,
        content: obj.content,
        blogId: obj.blogId,
        blogName: obj.blogName,
        extendedLikesInfo: {
            likesCount: obj.extendedLikesInfo.likesCount,
            dislikesCount: obj.extendedLikesInfo.dislikesCount,
            myStatus: obj.extendedLikesInfo.myStatus,
            newestLikes: obj.extendedLikesInfo.newestLikes || []
        },
        createdAt: obj.createdAt
    }
}

export async function mapPosts(objs: FinalDBPost[], userId?: ObjectId | null): Promise<viewPostModel[]>{

    const likesRepo = new LikesRepository()
    let like: DBLike|null
    let userStatus: string | undefined = "None"



    return await Promise.all( objs.map(async el => {
            const allLikes = await Like.countDocuments({$and: [{commentPostId: el._id.toString()}, {userStatus: "Like"}]})
            const allDislikes = await Like.countDocuments({$and: [{commentPostId: el._id.toString()}, {userStatus: "Dislike"}]})
            console.log(allLikes, allDislikes)
            const lastThreeLikes: any = await Like.find({ $and: [{commentPostId: el._id.toString()}, {userStatus: "Like"}] }).sort({addedAt: -1}).limit(3).lean()

            if (userId){
                like = await likesRepo.getUserStatusForComment(userId.toString(), el._id.toString())
                userStatus = like?.userStatus
            }

            const newestLikes = mapLikes(lastThreeLikes)
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
                newestLikes: newestLikes || []
            },
            createdAt: el.createdAt
        }
    })
    )
}
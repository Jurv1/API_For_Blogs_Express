import {Document, ObjectId} from "mongodb";
import {PostPagination} from "../../../schemas/paginationSchemas/postPaginationSchema";
import {mapPosts} from "../../../utils/mappers/postMapper";
import {CommentPagination} from "../../../schemas/paginationSchemas/commentPaginationSchema";
import {mapComments} from "../../../utils/mappers/commentMapper";
import {Post} from "../../../schemas/mongooseSchemas/mongoosePostSchema";
import {Comment} from "../../../schemas/mongooseSchemas/mongooseCommentSchema";
import {SortOrder} from "mongoose";
import {injectable} from "inversify";
import {Like} from "../../../schemas/mongooseSchemas/mongooseLikesSchema";
import {CommentQ} from "../commentQ/commentQ";
import {viewPostModel} from "../../../schemas/presentationSchemas/postSchemas";
import {DBLike} from "../../../schemas/dbSchemas/LikesDBSchema";
import {mapLikes} from "../../../utils/mappers/likesMapper";
import {LikesRepository} from "../../likesRepository";

@injectable()
export class PostQ {

    constructor(protected commentQ: CommentQ, protected likesRepo: LikesRepository) {
    }
    async getAllPosts(filter: Document, sort: { [key: string]: SortOrder; }, pagination: {
        skipValue: number, limitValue: number,
        pageSize: number, pageNumber: number
    }, userId?: ObjectId | null): Promise<PostPagination> {

        const allPosts = await Post.find(filter).sort(sort).skip(pagination["skipValue"])
            .limit(pagination["limitValue"]).lean()

        const countDocs = await Post.countDocuments(filter)
        const pagesCount = Math.ceil(countDocs / pagination["pageSize"])

        return {
            pagesCount: pagesCount,
            page: pagination["pageNumber"],
            pageSize: pagination["pageSize"],
            totalCount: countDocs,
            items: await mapPosts(allPosts, userId)
        }

    }

    async getOnePost(id: string, userId?: ObjectId | null): Promise<viewPostModel | null> {

        const allLikes = await Like.countDocuments({$and:[{commentPostId: id}, {userStatus: "Like"}] })
        const allDislikes = await Like.countDocuments({$and:[{commentPostId: id}, {userStatus: "Dislike"}] })
        let userStatus

        const result = await Post.findOne({_id: new ObjectId(id)});

        if (result) {
            const lastThreeLikes: Array<DBLike> = await Like.find({_id: result._id}).limit(3).lean()
            if (userId) {
                const like = await this.likesRepo.getUserStatusForComment(userId.toString(), id)
                userStatus = like?.userStatus

            }

            const newLikesArr = mapLikes(lastThreeLikes)

            return {
                id: result._id.toString(),
                title: result.title,
                shortDescription: result.shortDescription,
                content: result.content,
                blogId: result.blogId,
                blogName: result.blogName,
                extendedLikesInfo: {
                    likesCount: allLikes,
                    dislikesCount: allDislikes,
                    myStatus: userStatus || "None",
                    newestLikes: newLikesArr
                },
                createdAt: result.createdAt,
            }
        }

        return null

    }

    async getAllPostsByBlogId(id: string, sort: { [key: string]: SortOrder; }, pagination: {
        skipValue: number, limitValue: number,
        pageSize: number, pageNumber: number
    }, userId?: ObjectId | null): Promise<PostPagination> {
        const countDoc = await Post.countDocuments({blogId: id})
        const pagesCount = Math.ceil(countDoc / pagination["pageSize"])
        const allPosts = await Post.find({blogId: id}).sort(sort)
            .skip(pagination["skipValue"])
            .limit(pagination["limitValue"]).lean()
        return {
            pagesCount: pagesCount,
            page: pagination["pageNumber"],
            pageSize: pagination["pageSize"],
            totalCount: countDoc,
            items: await mapPosts(allPosts, userId)
        }
    }

    async getAllCommentsByPostId(postId: string, sort: { [key: string]: SortOrder; }, pagination: {
        skipValue: number, limitValue: number,
        pageSize: number, pageNumber: number
    }, userId?: ObjectId | null): Promise<CommentPagination> {

        const countDoc = await Comment.countDocuments({postId: postId})
        const pagesCount = Math.ceil(countDoc / pagination["pageSize"])
        const allComments = await Comment.find({postId: postId}).sort(sort)
            .skip(pagination["skipValue"])
            .limit(pagination["limitValue"]).lean()
        return {
            pagesCount: pagesCount,
            page: pagination["pageNumber"],
            pageSize: pagination["pageSize"],
            totalCount: countDoc,
            items: await mapComments(allComments, userId)
        }
    }
}

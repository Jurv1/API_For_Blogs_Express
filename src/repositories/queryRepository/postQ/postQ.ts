import {Document, ObjectId} from "mongodb";
import {PostPagination} from "../../../schemas/paginationSchemas/postPaginationSchema";
import {mapPosts} from "../../../utils/mappers/postMapper";
import {FinalDBPost} from "../../../schemas/dbSchemas/PostDBSchema";
import {CommentPagination} from "../../../schemas/paginationSchemas/commentPaginationSchema";
import {mapComments} from "../../../utils/mappers/commentMapper";
import {Post} from "../../../schemas/mongooseSchemas/mongoosePostSchema";
import {Comment} from "../../../schemas/mongooseSchemas/mongooseCommentSchema";
import {SortOrder} from "mongoose";

class PostQ {
    async getAllPosts(filter: Document, sort: { [key: string]: SortOrder; }, pagination: {
        skipValue: number, limitValue: number,
        pageSize: number, pageNumber: number
    }): Promise<PostPagination> {

        const allPosts = await Post.find(filter).sort(sort).skip(pagination["skipValue"])
            .limit(pagination["limitValue"]).lean()

        const countDocs = await Post.countDocuments(filter)
        const pagesCount = Math.ceil(countDocs / pagination["pageSize"])

        return {
            pagesCount: pagesCount,
            page: pagination["pageNumber"],
            pageSize: pagination["pageSize"],
            totalCount: countDocs,
            items: mapPosts(allPosts)
        }

    }

    async getOnePost(id: string): Promise<FinalDBPost | null> {

        return Post.findOne({_id: new ObjectId(id)});

    }

    async getAllPostsByBlogId(id: string, sort: { [key: string]: SortOrder; }, pagination: {
        skipValue: number, limitValue: number,
        pageSize: number, pageNumber: number
    }): Promise<PostPagination> {
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
            items: mapPosts(allPosts)
        }
    }

    async getAllCommentsByPostId(postId: string, sort: { [key: string]: SortOrder; }, pagination: {
        skipValue: number, limitValue: number,
        pageSize: number, pageNumber: number
    }): Promise<CommentPagination> {
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
            items: mapComments(allComments)
        }
    }
}

export const postQ = new PostQ()
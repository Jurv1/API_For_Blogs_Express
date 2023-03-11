import {Document, ObjectId, Sort} from "mongodb";
import {PostPagination} from "../../../schemas/paginationSchemas/postPaginationSchema";
import {commentDBController, postDBController} from "../../../db/db";
import {mapPosts} from "../../../utils/mappers/postMapper";
import {FinalDBPost} from "../../../schemas/dbSchemas/PostDBSchema";
import {CommentPagination} from "../../../schemas/paginationSchemas/commentPaginationSchema";
import {mapComments} from "../../../utils/mappers/commentMapper";

export async function getAllPosts(filter: Document,sort: Sort, pagination: {skipValue: number, limitValue: number,
    pageSize: number, pageNumber: number}): Promise<PostPagination> {

    const allPosts = await postDBController.find(filter).sort(sort).skip(pagination["skipValue"])
        .limit(pagination["limitValue"]).toArray()

    const countDocs = await postDBController.countDocuments(filter)
    const pagesCount = Math.ceil(countDocs / pagination["pageSize"])

    return {
        pagesCount: pagesCount,
        page: pagination["pageNumber"],
        pageSize: pagination["pageSize"],
        totalCount: countDocs,
        items: mapPosts(allPosts)
    }

}

export async function getOnePost(id: string): Promise<FinalDBPost | null> {

    return await postDBController.findOne({_id: new ObjectId(id)})

}

export async function getAllPostsByBlogId(id: string,sort: Sort, pagination: {skipValue: number, limitValue: number,
    pageSize: number, pageNumber: number}): Promise<PostPagination>{
    const countDoc = await postDBController.countDocuments({blogId: id})
    const pagesCount = Math.ceil(countDoc / pagination["pageSize"])
    const allPosts = await postDBController.find({blogId: id}).sort(sort)
        .skip(pagination["skipValue"])
        .limit(pagination["limitValue"]).toArray()
    return {
        pagesCount: pagesCount,
        page: pagination["pageNumber"],
        pageSize: pagination["pageSize"],
        totalCount: countDoc,
        items: mapPosts(allPosts)
    }
}

export async function getAllCommentsByPostId(postId: string, sort: Sort, pagination: {skipValue: number, limitValue: number,
    pageSize: number, pageNumber: number}): Promise<CommentPagination>{
    const countDoc = await commentDBController.countDocuments({postId : postId})
    const pagesCount = Math.ceil(countDoc / pagination["pageSize"])
    const allComments = await commentDBController.find({postId: postId}).sort(sort)
        .skip(pagination["skipValue"])
        .limit(pagination["limitValue"]).toArray()
    return {
        pagesCount: pagesCount,
        page: pagination["pageNumber"],
        pageSize: pagination["pageSize"],
        totalCount: countDoc,
        items: mapComments(allComments)
    }
}
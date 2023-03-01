import {blogDBController, postDBController} from "../db/db";
import {FinalDBBlog} from "../schemas/dbSchemas/BlogDBSchema";
import {FinalDBPost} from "../schemas/dbSchemas/PostDBSchema";
import {ObjectId, SortDirection} from "mongodb";
import {PostWithoutId} from "../schemas/presentationSchemas/postSchemas";
import {mapBlogs} from "../utils/mappers/blogMapper";
import {mapPosts} from "../utils/mappers/postMapper";
import {PostPagination} from "../schemas/paginationSchemas/postPaginationSchema";

export const postsRepository = {
    async getAll(query: [searchNameTerm: string, sortBy: string,
        sortDirection: SortDirection, pageNumber: string, pageSize: string]): Promise<PostPagination> {
        const searchNameTerm = query[0]
        const sortBy = query[1]
        const sortDirection = query[2]
        const pageNumber = +query[3]
        const pageSize = +query[4]
        const countDoc = await postDBController.count()
        const pagesCount = Math.ceil(countDoc / +pageSize)
        if(searchNameTerm !== "null"){
            const allPosts = await postDBController.find({}).filter({name: {$regex: searchNameTerm,
                    $options: "i"}}).sort({[sortBy]: sortDirection})
                .skip(pageNumber > 0 ? (pageNumber - 1) * pageSize : 0)
                .limit(pageSize > 0 ? pageSize : 0).toArray()

            return {
                pagesCount: pagesCount,
                page: pageNumber,
                pageSize: pageSize,
                totalCount: countDoc,
                items: mapPosts(allPosts)
            }} else {
            const allPosts = await postDBController.find({}).sort({[sortBy]: sortDirection})
                .skip(pageNumber > 0 ? (pageNumber - 1) * pageSize : 0)
                .limit(pageSize > 0 ? pageSize : 0).toArray()
            return {
                pagesCount: pagesCount,
                page: +pageNumber,
                pageSize: +pageSize,
                totalCount: countDoc,
                items: mapPosts(allPosts)
            }
        }
        //return await postDBController.find().toArray()
    },

    async getOne(id: string): Promise<FinalDBPost | null> {
        return await postDBController.findOne({_id: new ObjectId(id)})
    },

    async createOne(newPostTmp: PostWithoutId): Promise<FinalDBPost | null> {

        const resultId = await postDBController.insertOne(newPostTmp)
        return await postDBController.findOne({_id: resultId.insertedId});

    },

    async updateOne(id: string,  title: string, shortDescription: string,
                    content: string, blogId: string): Promise<boolean> {

        const myId  = new ObjectId(id)
        const updatedEl = await postDBController.updateOne({_id: myId},
            {
                $set: {
                    title: title,
                    shortDescription: shortDescription,
                    content: content,
                    blogId: blogId,
                }
            })
        return updatedEl.matchedCount === 1;
    },

    async deleteOne(id: string): Promise<boolean> {

        const myId = new ObjectId(id)
        const result = await postDBController.deleteOne({ _id: myId })
        return result.deletedCount === 1

    },

    async getAllPostsByBlogId(id: string, query: [searchNameTerm: string, sortBy: string,
        sortDirection: SortDirection, pageNumber: string, pageSize: string]): Promise<PostPagination>{
        const sortBy = query[1]
        const sortDirection = query[2]
        const pageNumber = +query[3]
        const pageSize = +query[4]
        const countDoc = await postDBController.count({blogId: id})
        const pagesCount = Math.ceil(countDoc / +pageSize)
        const allPosts = await postDBController.find({blogId: id}).sort({[sortBy]: sortDirection})
            .skip(pageNumber > 0 ? (pageNumber - 1) * pageSize : 0)
            .limit(pageSize > 0 ? pageSize : 0).toArray()
        return {
            pagesCount: pagesCount,
            page: pageNumber,
            pageSize: pageSize,
            totalCount: countDoc,
            items: mapPosts(allPosts)
        }
    }
}

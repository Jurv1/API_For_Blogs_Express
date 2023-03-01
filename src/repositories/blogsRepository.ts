import {blogDBController, postDBController} from "../db/db";
import {DBBlog, FinalDBBlog} from "../schemas/dbSchemas/BlogDBSchema";
import {ObjectId, SortDirection} from "mongodb";
import {BlogWithoutId} from "../schemas/presentationSchemas/blogSchemas";
import {mapBlogs} from "../utils/mappers/blogMapper";
import {BlogPagination} from "../schemas/paginationSchemas/blogPaginationSchema";


export const blogsRepository = {
    async getAll(query: [searchNameTerm: string, sortBy: string,
        sortDirection: SortDirection, pageNumber: string, pageSize: string]): Promise<BlogPagination>{
        const searchNameTerm = query[0]
        const sortBy = query[1]
        const sortDirection = query[2]
        const pageNumber = +query[3]
        const pageSize = +query[4]

        console.log(pageNumber, pageSize)
        const countDoc = await blogDBController.count()
        const pagesCount = Math.ceil(countDoc / +pageSize)
        if(searchNameTerm !== "null"){
            const allBlogs = await blogDBController.find({}).filter({name: {$regex: searchNameTerm,
                    $options: "i"}}).sort({[sortBy]: sortDirection})
                        .skip(pageNumber > 0 ? (pageNumber - 1) * pageSize : 0)
                            .limit(pageSize > 0 ? pageSize : 0).toArray()
            const countMe = await blogDBController.find({}).filter({name: {$regex: searchNameTerm,
                    $options: "i"}}).toArray()
            const pagesCountsss = Math.ceil(countMe.length / +pageSize)
            return {
                pagesCount: pagesCountsss, //костыли
                page: pageNumber,
                pageSize: pageSize,
                totalCount: countMe.length,
                items: mapBlogs(allBlogs)
            }

        } else {
            const allBlogs = await blogDBController.find({}).sort({[sortBy]: sortDirection})
                    .skip(pageNumber > 0 ? (pageNumber - 1) * pageSize : 0)
                        .limit(pageSize > 0 ? pageSize : 0).toArray()
            return {
                pagesCount: pagesCount,
                page: +pageNumber,
                pageSize: +pageSize,
                totalCount: countDoc,
                items: mapBlogs(allBlogs)
            }
        }

    },

    async getOne(id: string): Promise<FinalDBBlog|null> {

        return await blogDBController.findOne({_id: new ObjectId(id)})

    },

    async createOne(newBlogTmp: BlogWithoutId): Promise<FinalDBBlog|null> {

        const resultId = await blogDBController.insertOne(newBlogTmp)
        console.log(resultId)
        return await blogDBController.findOne({_id: resultId.insertedId});

    },

    async updateOne(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
        const myId  = new ObjectId(id)
        const updatedEl = await blogDBController.updateOne({_id: myId},
            {
                $set: {
                    name: name,
                    description: description,
                    websiteUrl: websiteUrl
                }
            })
        return updatedEl.matchedCount === 1;

    },

    async deleteOne(id: string): Promise<boolean> {
        const myId = new ObjectId(id)
        const result = await blogDBController.deleteOne({ _id: myId })
        return result.deletedCount === 1

    },
    async getSort(sortString: string): Promise<DBBlog|null>{

        const result = await blogDBController.findOne({ name: {$regex: `/.*${sortString}.*/`}} )
        console.log(result)
        return result
    },

    //use rejecton
    // async getSortAD(id: string, direction: string|boolean, fieldToSort: keyof DBBlog): Promise<DBBlog|null>{
    //
    //     return await blogDBController.find().sort({name: '-1'})
    //
    // }

}


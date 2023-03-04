import {Document, ObjectId, Sort, SortDirection} from "mongodb";
import {BlogPagination} from "../../../schemas/paginationSchemas/blogPaginationSchema";
import {blogDBController} from "../../../db/db";
import {mapBlogs} from "../../../utils/mappers/blogMapper";
import {FinalDBBlog} from "../../../schemas/dbSchemas/BlogDBSchema";

export async function getAllBlogs(filter: Document,sort: Sort, pagination: {skipValue: number, limitValue: number,
    pageSize: number, pageNumber: number}): Promise<BlogPagination>{

    const allBlogs = await blogDBController.find(filter).sort(sort).skip(pagination["skipValue"])
        .limit(pagination["limitValue"]).toArray()

    const countDocs = await blogDBController.countDocuments(filter)
    const pagesCount = Math.ceil(countDocs / pagination["pageSize"])

    return {
        pagesCount: pagesCount,
        page: pagination["pageNumber"],
        pageSize: pagination["pageSize"],
        totalCount: countDocs,
        items: mapBlogs(allBlogs)
    }
}

export async function getOneBlog(id: string): Promise<FinalDBBlog|null> {

    return await blogDBController.findOne({_id: new ObjectId(id)})

}

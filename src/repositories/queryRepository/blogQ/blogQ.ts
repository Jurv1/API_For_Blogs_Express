import {Document, ObjectId} from "mongodb";
import {BlogPagination} from "../../../schemas/paginationSchemas/blogPaginationSchema";
//import {blogDBController} from "../../../db/db";
import {mapBlogs} from "../../../utils/mappers/blogMapper";
import {FinalDBBlog} from "../../../schemas/dbSchemas/BlogDBSchema";
import {Blog} from "../../../schemas/mongooseSchemas/mongooseBlogSchema";
import {SortOrder} from "mongoose";

export async function getAllBlogs(filter: Document,sort: { [key: string]: SortOrder; }, pagination: {skipValue: number, limitValue: number,
    pageSize: number, pageNumber: number}): Promise<BlogPagination>{

    const allBlogs = await Blog.find(filter).sort(sort).skip(pagination["skipValue"])
        .limit(pagination["limitValue"]).lean()

    const countDocs = await Blog.countDocuments(filter)
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

    return Blog.findOne({_id: new ObjectId(id)});

}

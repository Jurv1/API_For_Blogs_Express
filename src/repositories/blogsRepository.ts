import {blogDBController} from "../db/db";
import {FinalDBBlog} from "../schemas/dbSchemas/BlogDBSchema";
import {ObjectId} from "mongodb";
import {BlogWithoutId} from "../schemas/presentationSchemas/blogSchemas";
import mongoose from "mongoose";
import {Blog} from "../schemas/mongooseSchemas/mongooseBlogSchema";

//todo разобраться с тем, что возвращает mongoose
export const blogsRepository = {

    async createOne(newBlogTmp: BlogWithoutId): Promise<FinalDBBlog|null> {
        //await Blog.create(newBlogTmp)
        const result = await Blog.insertMany(newBlogTmp)
        console.log(result)
        Blog.findById(result)
        const resultId = await blogDBController.insertOne(newBlogTmp)
        //console.log(resultId)
        return await blogDBController.findOne({_id: resultId.insertedId})

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
        const result = await Blog.deleteOne({_id: id})
        //const myId = new ObjectId(id)
        //const result = await blogDBController.deleteOne({ _id: myId })
        return result.deletedCount === 1

    },

}
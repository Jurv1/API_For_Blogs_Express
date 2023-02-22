import {blogDBController} from "../db/db";
import {DBBlog, FinalDBBlog} from "../schemas/dbSchemas/BlogDBSchema";
import {ObjectId, SortDirection} from "mongodb";
import {BlogWithoutId} from "../schemas/presentationSchemas/blogSchemas";


export const blogsRepository = {
    async getAll(): Promise<FinalDBBlog[]>{

        return await blogDBController.find({}).toArray()

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
    async getSort(id: string, blogName: string, sortString: string): Promise<DBBlog|null>{

        return await blogDBController.findOne({id: id, blogName: `/.*${sortString}.*/`} )

    },
    //use rejecton
    // async getSortAD(id: string, direction: string|boolean, fieldToSort: keyof DBBlog): Promise<DBBlog|null>{
    //
    //     return await blogDBController.find().sort({name: '-1'})
    //
    // }

}


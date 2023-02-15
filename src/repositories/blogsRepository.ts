import {blogDBController} from "../db/db";
import {Blog} from "../schemas/blogSchemas";


export const blogsRepository = {
    async getAll(): Promise<Blog[]>{

        return await blogDBController.find({}, {projection: {_id: 0}}).toArray()

    },

    async getOne(id: string): Promise<Blog|null> {

        const result: Blog|null = await blogDBController.findOne({id: id}, { projection: {_id: 0}})
        console.log(result)
        return result

    },

    async createOne(name: string, description: string, websiteUrl: string): Promise<Blog|null> {

        let newBlogTmp = {
            id: (+(new Date())).toString(),
            name: name,
            description: description,
            websiteUrl: websiteUrl
        }
        const result = await blogDBController.insertOne(newBlogTmp)
        return newBlogTmp;

    },

    async updateOne(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {

        const updatedEl = await blogDBController.updateOne({id: id},
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

        const result = await blogDBController.deleteOne({id})
        return result.deletedCount === 1

    }

}
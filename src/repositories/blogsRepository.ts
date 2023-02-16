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

    async createOne(name: string, description: string, websiteUrl: string, isMembership: boolean): Promise<Blog|null> {
        const id = (+(new Date())).toString()
        let newBlogTmp = {
            id: id,
            name: name,
            description: description,
            websiteUrl: websiteUrl,
            isMembership: isMembership || false,
            createdAt: new Date().toISOString()
        }
        await blogDBController.insertOne(newBlogTmp)
        return await blogDBController.findOne({id: id}, {projection: {_id: 0}});

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
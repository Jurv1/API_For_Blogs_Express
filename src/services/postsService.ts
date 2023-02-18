import {blogDBController, postDBController} from "../db/db";
import {Post} from "../schemas/postSchemas";
import {Blog} from "../schemas/blogSchemas";

export const postsService = {
    async getAll() {
        return await postDBController.find({}, {projection: {_id: 0}}).toArray()
    },

    async getOne(id: string): Promise<Post | null> {
        const result: Post|null = await postDBController.findOne({id: id}, { projection: {_id: 0}})
        console.log(result)
        return result
    },

    async createOne(newPostTmp: Post): Promise<Post | null> {

        await postDBController.insertOne(newPostTmp)
        return await postDBController.findOne({id: newPostTmp.id}, {projection: {_id: 0}});

    },

    async updateOne(id: string, blogName: string, title: string, shortDescription: string,
                    content: string, blogId: string): Promise<boolean> {

        const updatedEl = await postDBController.updateOne({id: id},
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

        const result = await postDBController.deleteOne({id})
        return result.deletedCount === 1

    }
}

import {FinalDBBlog} from "../schemas/dbSchemas/BlogDBSchema";
import {ObjectId} from "mongodb";
import {BlogWithoutId} from "../schemas/presentationSchemas/blogSchemas";
import {Blog} from "../schemas/mongooseSchemas/mongooseBlogSchema";
import {injectable} from "inversify";

@injectable()
export class BlogsRepository {
    async createOne(newBlogTmp: BlogWithoutId): Promise<FinalDBBlog|null> {
        const createdBlog = await Blog.create(newBlogTmp)
        return {
            _id: createdBlog._id,
            name: newBlogTmp.name,
            description: newBlogTmp.description,
            websiteUrl: newBlogTmp.websiteUrl,
            createdAt: newBlogTmp.createdAt,
            isMembership: newBlogTmp.isMembership,
        }
    }

    async updateOne(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
        const myId  = new ObjectId(id)
        const updatedEl = await Blog.updateOne({_id: myId},
            {
                $set: {
                    name: name,
                    description: description,
                    websiteUrl: websiteUrl
                }
            })
        return updatedEl.matchedCount === 1;

    }

    async deleteOne(id: string): Promise<boolean> {
        const result = await Blog.deleteOne({_id: id})
        return result.deletedCount === 1

    }
}
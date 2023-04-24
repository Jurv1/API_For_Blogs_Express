import {BlogsRepository} from "../repositories/blogsRepository";
import {FinalDBBlog} from "../schemas/dbSchemas/BlogDBSchema";
import {injectable} from "inversify";

@injectable()
export class BlogService {
    constructor(protected blogsRepository: BlogsRepository) {}
    async createOneBlog(name: string, description: string, websiteUrl: string): Promise<FinalDBBlog | null> {

        let newBlogTmp = {
            name: name,
            description: description,
            websiteUrl: websiteUrl,
            isMembership: false,
            createdAt: new Date().toISOString()
        }
        return await this.blogsRepository.createOne(newBlogTmp)

    }

    async updateOneBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {

        return await this.blogsRepository.updateOne(id, name, description,
            websiteUrl)
    }

    async deleteOneBlog(id: string): Promise<boolean> {

        return await this.blogsRepository.deleteOne(id)

    }
}

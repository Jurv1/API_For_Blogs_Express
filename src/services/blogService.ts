import {blogsRepository} from "../repositories/blogsRepository";
//import {Blog} from "../schemas/presentationSchemas/blogSchemas";
import {blogDBController} from "../db/db";
import {DBBlog, FinalDBBlog} from "../schemas/dbSchemas/BlogDBSchema";

export async function getAllBlogs(): Promise<FinalDBBlog[]> {

        return await blogsRepository.getAll()

}

export async function getOneBlog(id: string): Promise<FinalDBBlog|null> {

    return await blogsRepository.getOne(id)

}

export async function createOneBlog( name: string, description: string, websiteUrl: string): Promise<FinalDBBlog|null> {

        let newBlogTmp = {
            name: name,
            description: description,
            websiteUrl: websiteUrl,
            isMembership: false,
            createdAt: new Date().toISOString()
        }
        const result = await blogsRepository.createOne(newBlogTmp)
        if (result){
            return await blogDBController.findOne({_id: result._id});
        } else return null

}

export async function updateOneBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {

        return await blogsRepository.updateOne(id, name, description,
            websiteUrl)
}

export async function deleteOneBlog(id: string): Promise<boolean> {

        return await blogsRepository.deleteOne(id)

}

export async function getSorted(id: string): Promise<DBBlog|null>{
    return null
}
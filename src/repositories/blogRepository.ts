import {blogsService} from "../services/blogsService";
import {Blog} from "../schemas/blogSchemas";
import {blogDBController} from "../db/db";

export async function getAllBlogs(): Promise<Blog[]> {

        return await blogsService.getAll()

}

export async function getOneBlog(id: string): Promise<Blog|null> {

    return await blogsService.getOne(id)

}

export async function createOneBlog(id: string, name: string, description: string, websiteUrl: string): Promise<Blog|null> {

        let newBlogTmp = {
            id: id,
            name: name,
            description: description,
            websiteUrl: websiteUrl,
            isMembership: false,
            createdAt: new Date().toISOString()
        }
        await blogsService.createOne(newBlogTmp)
    //
        return await blogDBController.findOne({id: id}, {projection: {_id: 0}});
}

export async function updateOneBlog(id: string, name: string, description: string, websiteUrl: string): Promise<Blog|null> {

        const updatedEl = await blogsService.updateOne(id, name, description,
            websiteUrl)
        if (!updatedEl) {
            return  null
        }
        return await blogsService.getOne(id)

}

export async function deleteOneBlog(id: string): Promise<boolean> {

        return await blogsService.deleteOne(id)

}
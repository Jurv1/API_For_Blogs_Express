import {postsRepository} from "../repositories/postsRepository";
import {blogsRepository} from "../repositories/blogsRepository";
import {FinalDBPost} from "../schemas/dbSchemas/PostDBSchema";
import {SortDirection} from "mongodb";
import {PostPagination} from "../schemas/paginationSchemas/postPaginationSchema";

export async function getAllPosts(query: [searchNameTerm: string, sortBy: string,
    sortDirection: SortDirection, pageNumber: string, pageSize: string]): Promise<PostPagination> {

    return await postsRepository.getAll(query)

}

export async function getOnePost(id: string): Promise<FinalDBPost|null> {

    return await postsRepository.getOne(id)

}

export async function createOnePost(id: string, title: string, shortDescription: string, content: string,
                                    blogId: string, blogName: string, createdAt: string): Promise<FinalDBPost|null> {

    const foundedEl = await blogsRepository.getOne(blogId)

    if (foundedEl) {
        const blogName = foundedEl.name
        let newPostTmp = {
            title: title.toString(),
            shortDescription: shortDescription.toString(),
            content: content,
            blogId: blogId,
            blogName: blogName,
            createdAt: new Date().toISOString()
        }
         return await postsRepository.createOne(newPostTmp)
         //return await postDBController.findOne({id: id}, {projection: {_id: 0}})
    } else {
        return null
    }

}

export async function createOnePostByBlogId(title: string, shortDescription: string, content: string, blogId: string):
    Promise<FinalDBPost|null>{

    const foundedEl = await blogsRepository.getOne(blogId)
    if (foundedEl) {
        const blogName = foundedEl.name
        const newPostTmp = {
            title: title.toString(),
            shortDescription: shortDescription.toString(),
            content: content,
            blogId: blogId,
            blogName: blogName,
            createdAt: new Date().toISOString()
        }
        return await postsRepository.createOne(newPostTmp)
    } else {
        return null
    }
}

export async function updateOnePost(id: string, title: string, shortDescription: string, content: string,
                                    blogId: string,): Promise<boolean> {

    return await postsRepository.updateOne( id, title, shortDescription, content, blogId )

}

export async function deleteOnePost(id: string) {
    return await postsRepository.deleteOne(id)

}
import {Request, Response} from "express";
import {postsService} from "../services/postsService";
import {blogsService} from "../services/blogsService";
import {Post} from "../schemas/postSchemas";
import {postDBController} from "../db/db";

export async function getAllPosts(): Promise<Post[]> {

    return await postsService.getAll()

}

export async function getOnePost(id: string): Promise<Post|null> {

    return await postsService.getOne(id)

}

export async function createOnePost(id: string, title: string, shortDescription: string, content: string,
                                    blogId: string, blogName: string, createdAt: string) {

    const foundedEl = await blogsService.getOne(blogId)

    if (foundedEl) {
        const blogName = foundedEl.name
        let newPostTmp = {
            id: id,
            title: title.toString(),
            shortDescription: shortDescription.toString(),
            content: content,
            blogId: blogId,
            blogName: blogName,
            createdAt: new Date().toISOString()
        }
         return await postsService.createOne(newPostTmp)
         //return await postDBController.findOne({id: id}, {projection: {_id: 0}})
    } else {
        return null
    }

}

export async function updateOnePost(id: string, title: string, shortDescription: string, content: string,
                                    blogId: string, blogName: string, createdAt: string) {

    const updatedEl = await postsService.updateOne( id, title, shortDescription, content, blogId, blogName)
    if (!updatedEl) {
        return  null
    }
    return await postsService.getOne(id)

}

export async function deleteOnePost(id: string) {
    return await postsService.deleteOne(id)

}
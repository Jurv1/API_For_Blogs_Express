import {postsRepository} from "../repositories/postsRepository";
import {FinalDBPost} from "../schemas/dbSchemas/PostDBSchema";
import * as BlogQueryRepo from "../repositories/queryRepository/blogQ/blogQ"
import * as PostQueryRepo from "../repositories/queryRepository/postQ/postQ"
import {FinalDBComment} from "../schemas/dbSchemas/CommentDBSchema";

export async function createOnePost(id: string, title: string, shortDescription: string, content: string,
                                    blogId: string, blogName: string, createdAt: string): Promise<FinalDBPost|null> {

    const foundedEl = await BlogQueryRepo.getOneBlog(blogId)

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

    const foundedEl = await BlogQueryRepo.getOneBlog(blogId)
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

export async function createOneCommentByPostId(postId: string, content: string): Promise<FinalDBComment | null> {
    const foundedEl = await PostQueryRepo.getOnePost(postId)
    if (foundedEl) {
        const newCommentTmp = {
            content: content,
            commentatorInfo: {
                userId: "ss",
                userLogin: "ss"
            },
            postId: postId,
            createdAt: new Date().toISOString()
        }
        return await postsRepository.createOneCommentByPostId(newCommentTmp)
    } else return null
}

export async function updateOnePost(id: string, title: string, shortDescription: string, content: string,
                                    blogId: string,): Promise<boolean> {

    return await postsRepository.updateOne( id, title, shortDescription, content, blogId )

}

export async function deleteOnePost(id: string) {

    return await postsRepository.deleteOne(id)

}
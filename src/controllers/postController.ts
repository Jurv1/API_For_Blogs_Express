import {Request, Response} from "express";
import {postsRepository} from "../repositories/postsRepository";
import {blogsRepository} from "../repositories/blogsRepository";

export async function getAllPosts(req: Request, res: Response) {
    try {
        const allBlogs = await postsRepository.getAll()
        res.status(200).send(allBlogs)
    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })
    }
}

export async function getOnePost(req: Request, res: Response) {
    try {
        const id = req.params.id
        const foundedPost = await postsRepository.getOne(id)
        if (foundedPost){
            res.status(204).send(foundedPost)
            return
        }

        res.send(404)
    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })
    }
}

export async function createOnePost(req: Request, res: Response) {
    try {
        const blogId: string = req.body.blogId
        const id = (+(new Date())).toString()
        const foundedEl = await blogsRepository.getOne(blogId)
        console.log(foundedEl)
        if (foundedEl) {
            const blogName = foundedEl.name
            const newPostTmp = await postsRepository.createOne(id, blogName, req.body.title,
                req.body.shortDescription, req.body.content, req.body.blogId)
            res.status(201).send(newPostTmp)
        } else {
            res.status(400).json({
                errorsMessages: [
                    {
                        message: "No such blog",
                        field: "blogId"
                    }
                ]
            })
        }

    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })
    }
}

export async function updateOnePost(req: Request, res: Response) {
    try {
        const id = req.params.id
        const updatedEl = await postsRepository.updateOne(id, req.body.blogName, req.body.title,
            req.body.shortDescription, req.body.content, req.body.blogId)
        if (!updatedEl) {
            res.sendStatus(404)
            return
        }
        const post = await postsRepository.getOne(id)
        res.status(204).send(post)
    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })
    }
}

export async function deleteOnePost(req: Request, res: Response) {
    try {
        const id = req.params.id
        const result = await postsRepository.deleteOne(id)
        if (!result) return res.send(404)
        res.send(204)

    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })
    }
}
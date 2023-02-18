import {Request, Response} from "express";
import * as postRepository from "../repositories/postRepository";
import {Blog} from "../schemas/blogSchemas";
import {postsService} from "../services/postsService";
import {blogsService} from "../services/blogsService";
import {Post} from "../schemas/postSchemas";

export async function getAll (req: Request, res: Response){
    try {
        const allBlogs = await postRepository.getAllPosts()
        res.status(200).send(allBlogs)
    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })
    }
}

export async function getOne (req: Request, res: Response){
    try {
        const id = req.params.id
        const result = await postRepository.getOnePost(id)
        if (result) {
            res.status(200).send(result);
        } else {
            res.sendStatus(404)
        }
    } catch (err){
        res.status(404).json({
            message: "Can't find el"
        })
    }
}

export async function createOne (req: Request, res: Response){
    try {
        const id = (+(new Date())).toString()
        const {title, shortDescription, content, blogId, blogName, createdAt} = req.body
        const result: Post|null = await postRepository.createOnePost(id, title, shortDescription, content, blogId, blogName, createdAt)
        result !== null ? res.status(201).send(result) : res.status(400).json({
            errorsMessages: [
                {
                    message: "No such blog",
                    field: "blogId"
                }
            ]
        })

    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })
    }
}

export async function updateOne (req: Request, res: Response){
    try {
        const id = req.params.id
        const {title, shortDescription, content, blogId, blogName, createdAt} = req.body
        const result = await postRepository.updateOnePost(id, title, shortDescription, content, blogId, blogName, createdAt)
        if (result === null) {
            res.status(404).json({
                message: "Not good"
            })
            return
        }
        res.status(204).send(result)
    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })
    }

}

export async function deleteOne (req: Request, res: Response){
    try {
        const id = req.params.id
        const result = await postRepository.deleteOnePost(id)
        if (!result) return res.send(404)
        res.send(204)

    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })
    }
}
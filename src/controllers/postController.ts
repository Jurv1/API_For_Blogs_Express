import {Request, Response} from "express";
import * as PostService from "../services/postService";
import {FinalDBPost} from "../schemas/dbSchemas/PostDBSchema";
import {mapPost, mapPosts} from "../utils/mappers/postMapper";

//todo вынести синхронку
//todo сделать функцию для трай кэтч (вынести обертку в фун-ию)

export async function getAll (req: Request, res: Response){
    try {
        const allBlogs = await PostService.getAllPosts()
        res.status(200).send(mapPosts(allBlogs))
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
        const result = await PostService.getOnePost(id)
        if (result) {
            res.status(200).send(mapPost(result));
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
        const result: FinalDBPost|null = await PostService.createOnePost(id, title, shortDescription,
            content, blogId, blogName, createdAt)
        result ? res.status(201).send(mapPost(result)) : res.status(400).json({
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
        const {title, shortDescription, content, blogId,  } = req.body
        let result = await PostService.updateOnePost(id, title, shortDescription, content, blogId, )
        if (!result) {
            res.status(404).json({
                message: "Not good"
            })
            return
        }
        //const el = await PostService.getOnePost(id)
        res.sendStatus(204)
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
        const result = await PostService.deleteOnePost(id)
        if (!result) return res.send(404)
        res.send(204)

    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })
    }
}
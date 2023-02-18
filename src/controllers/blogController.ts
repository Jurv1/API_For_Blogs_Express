import {Request, Response} from "express";
import * as BlogRepository from "../repositories/blogRepository";
import {Blog} from "../schemas/blogSchemas";

export async function getAll (req: Request, res: Response){
    try {
        const allBlogs = await BlogRepository.getAllBlogs()
        res.status(200).send(allBlogs)
    } catch (err){
        res.status(404).json({
            message: "Can't find el"
        })
    }
}

export async function getOne (req: Request, res: Response){
    try {
        const id = req.params.id
        const result = await BlogRepository.getOneBlog(id)
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
        const {name, description, websiteUrl} = req.body
        let result: Blog | null = await BlogRepository.createOneBlog(id, name, description, websiteUrl)
        result !== null ? res.status(201).send(result) : res.status(404).json({
            message: "Can't find el"
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
        const {name, description, websiteUrl} = req.body
        const result = await BlogRepository.updateOneBlog(id, name, description, websiteUrl)
        if (!result) {
            res.status(404).json({
                message: "NOT OK"
            })
        }

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
        const result = await BlogRepository.deleteOneBlog(id)
        if (!result) return res.send(404)
        res.send(204)

    } catch (err) {

        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })

    }
}
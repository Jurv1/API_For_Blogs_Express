import {Request, Response} from "express";
import {blogsRepository} from "../repositories/blogsRepository";
import {Blog} from "../schemas/blogSchemas";

export async function getAllBlogs(req: Request, res: Response) {
    try {
        const allBlogs = await blogsRepository.getAll()
        res.status(200).send(allBlogs)
    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })
    }
}

export async function getOneBlog(req: Request, res: Response) {
    const id = req.params.id
    const result: Blog | null  = await blogsRepository.getOne(id)
    let blog: Blog | null = await result
    if (blog) {
        res.status(200).send(blog);
        return
    } else {
        res.sendStatus(404)
        return
    }

    //console.log(result)
    //return result

}

export async function createOneBlog(req: Request, res: Response) {
    try {
        const newBlogTmp = await blogsRepository.createOne(req.body.name, req.body.description,
            req.body.websiteUrl, req.body.isMembership)
        res.status(201).send(newBlogTmp)
    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })
    }
}

export async function updateOneBlog(req: Request, res: Response) {
    try {
        const id = req.params.id
        const updatedEl = await blogsRepository.updateOne(id, req.body.name, req.body.description,
            req.body.websiteUrl)
        if (!updatedEl) res.status(404)
        const blog = await blogsRepository.getOne(id)
        res.status(204).send(blog)
    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })
    }
}

export async function deleteOneBlog(req: Request, res: Response) {
    try {
        const id = req.params.id
        const result = await blogsRepository.deleteOne(id)
        if (!result) return res.send(404)
        res.send(204)
    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })
    }
}
import {Request, Response} from "express";
import findEl from "../utils/findEl";
import {Post} from "../schemas/postSchemas";
import {blogs, posts} from "../db/db";

export const getAll = (req: Request, res: Response) => {
    try {
        res.status(200).send(posts)
    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })
    }
}

export const getOne = (req: Request, res: Response) => {
    try {
        findEl(req, res, posts)
    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })
    }
}

export const createOne = (req: Request, res: Response) => {
    try {
        const blogId = req.body.blogId
        const foundedEl = blogs.find(el => el?.id === blogId)
        if (foundedEl) {
            const blogName = foundedEl.name
            let newPostTmp = {
                id: (+(new Date())).toString(),
                title: req.body.title.toString(),
                shortDescription: req.body.shortDescription.toString(),
                content: req.body.content,
                blogId: req.body.blogId,
                blogName: blogName
            }
            // @ts-ignore
            posts = [...posts ,newPostTmp]
            res.status(201).send(newPostTmp)
            return;
        } else {
            res.status(400).json({ errorsMessages: [
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

export const updateOne = (req: Request, res: Response) => {
    try {
        const id = req.params.id
        let foundedEl = posts.find(el => el?.id === id)

        if (foundedEl) {
            const index = posts.indexOf(foundedEl)
            foundedEl = Object.assign(foundedEl, req.body)
            posts[index] = foundedEl
            res.status(204).send(foundedEl)
            return;
        }
        res.status(404).send("Not ok")
    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })
    }
}

export const deleteOne = (req: Request, res: Response) => {
    try {
        for (let i = 0; i < posts.length; i++) {
            if (posts[i]?.id === req.params.id) {
                posts.splice(i, 1)
                res.send(204)
                return;
            }

        }
        res.status(404).send('Not Ok')
    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })
    }
}
import {Request, Response} from "express";
import findEl from "../utils/findEl";
import {Blog} from "../schemas/blogSchemas";
import {blogs, db} from "../db/db";

export const getAll = (req: Request, res: Response) => {
    try {
        res.status(200).send(blogs)
    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })
    }
}

export const getOne = (req: Request, res: Response) => {
    try {
        findEl(req, res,blogs)
    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })
    }
}

export const createOne = (req: Request, res: Response) => {
    try {
        let newBlogTmp = {
            id: (+(new Date())).toString(),
            name: req.body.name,
            description: req.body.description,
            websiteUrl: req.body.websiteUrl
        }
        blogs.push(newBlogTmp)
        //blogs = [...blogs, newBlogTmp]
        res.status(201).send(newBlogTmp)
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
        let foundedEl = blogs.find(el => el?.id === id)

        if (foundedEl) {
            const index = blogs.indexOf(foundedEl)
            foundedEl = Object.assign(foundedEl, req.body)
            blogs[index] = foundedEl
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
        for (let i = 0; i < blogs.length; i++) {
            if (blogs[i]?.id === req.params.id) {
                blogs.splice(i, 1)
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
import {Request, Response} from "express";
import findEl from "../utils/findEl";

let posts: any[] = []

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

    } catch (err) {

    }
}

export const updateOne = (req: Request, res: Response) => {
    try {

    } catch (err) {

    }
}

export const deleteOne = (req: Request, res: Response) => {
    try {

    } catch (err) {

    }
}
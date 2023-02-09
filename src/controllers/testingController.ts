import {Request, Response} from "express";
import {videos} from "./videoController";
import { blogs } from "./blogController"
import {posts} from "./postController";


export const deleteAll = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        videos = []
        // @ts-ignore
        blogs = []
        // @ts-ignore
        posts = []
        res.send(204)
    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Something is wrong"
        })
    }
}
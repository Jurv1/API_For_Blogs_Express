import {Request, Response} from "express";
import {videos} from "./videoController";
import { blogs } from "./blogController"
import {posts} from "./postController";


export const deleteAll = async (req: Request, res: Response) => {
    try {
        if(videos.length === 0 && blogs.length === 0 && posts.length === 0)  {
            res.status(204)
            .json({"EW": "WE"})
            return;
        }
        else {
            // @ts-ignore
            videos = []
            // @ts-ignore
            blogs = []
            // @ts-ignore
            posts = []
            res.send(204).json({"EW": "WE"})
        }

    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Something is wrong"
        })
    }
}
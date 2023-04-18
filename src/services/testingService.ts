import {Request, Response} from "express";
import {Post} from "../schemas/mongooseSchemas/mongoosePostSchema";
import {VideoModel} from "../schemas/mongooseSchemas/mongooseVideoSchema";
import {Blog} from "../schemas/mongooseSchemas/mongooseBlogSchema";
import {User} from "../schemas/mongooseSchemas/mongooseUserSchema";
import {Comment} from "../schemas/mongooseSchemas/mongooseCommentSchema";
import {Device} from "../schemas/mongooseSchemas/mongooseDeviceSchema";
import {AttemptModel} from "../schemas/mongooseSchemas/mongooseAttemptSchema";
import {Like} from "../schemas/mongooseSchemas/mongooseLikesSchema";

export const deleteAll = async (req: Request, res: Response) => {
    try {
        await Post.deleteMany({})
        await VideoModel.deleteMany({})
        await Blog.deleteMany({})
        await User.deleteMany({})
        await Comment.deleteMany({})
        await Device.deleteMany({})
        await AttemptModel.deleteMany({})
        await Like.deleteMany({})
        res.sendStatus(204)
    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Something is wrong"
        })
    }
}
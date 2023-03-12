import {Request, Response} from "express";
import {blogDBController, commentDBController, postDBController, userDBController, videoDBController} from "../db/db";

export const deleteAll = async (req: Request, res: Response) => {
    try {
        await postDBController.deleteMany({})
        await videoDBController.deleteMany({})
        await blogDBController.deleteMany({})
        await userDBController.deleteMany({})
        await commentDBController.deleteMany({})
        res.sendStatus(204)
    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Something is wrong"
        })
    }
}
import {Request, Response} from "express";
import {videosService} from "../services/videosService";
import {Video} from "../schemas/videoSchemas";

export const getStart = async (req: Request, res: Response) => {
    await res.send("Hi")
}

export async function getAllVideos(req: Request, res: Response) {
    try {
        const allVideos = await videosService.getAll()
        res.status(200).send(allVideos)
    } catch (err) {
        console.log(err)
        res.status(404).json({
            errorsMessages: "Не удалось найти нужную информацию"
        })
    }
}

export async function getOneVideo(req: Request, res: Response) {
    try {
        const id = +req.params.id
        const foundedVideo = await videosService.getOne(id)
        console.log(foundedVideo)
        if (foundedVideo){
            res.status(200).send(foundedVideo)
        } else {
            res.sendStatus(404)
        }
    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })
    }
}

export async function createOneVideo(req: Request, res: Response) {
    try {
        const newVideo = await videosService.createOne(req.body.title, req.body.author,
            req.body?.availableResolutions, req.body?.canBeDownloaded, req.body?.minAgeRestriction,)
        res.status(201).send(newVideo)
    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Something is wrong"
        })
    }
}

export async function updateOneVideo(req: Request, res: Response): Promise<any> {
    try {
        const id = +req.params.id
        const updatedEl = await videosService.updateOne(id, req.body.title, req.body.author,
            req.body?.availableResolutions, req.body?.canBeDownloaded, req.body?.minAgeRestriction)
        if (!updatedEl) return res.send(404)
        const video = await videosService.getOne(id)
        res.status(204).send(video)
    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Something is wrong"
        })
    }
}

export async function deleteOneVideo(req: Request, res: Response) {
    try {
        const id = +req.params.id
        const result = await videosService.deleteOne(id)
        if (!result) return res.send(404)
        res.send(204)
    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Something is wrong"
        })
    }
}



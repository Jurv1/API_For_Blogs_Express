import {Request, Response} from "express";
import {VideosRepository} from "../repositories/videosRepository";

export class VideoService {
    constructor( protected videosRepository: VideosRepository) {}
    getStart = async (req: Request, res: Response) => {
        await res.send("Hi")
    }

    async getAllVideos(req: Request, res: Response) {
        try {
            const allVideos = await this.videosRepository.getAll()
            res.status(200).send(allVideos)
        } catch (err) {
            console.log(err)
            res.status(404).json({
                errorsMessages: "Не удалось найти нужную информацию"
            })
        }
    }

    async getOneVideo(req: Request, res: Response) {
        try {
            const id = +req.params.id
            const foundedVideo = await this.videosRepository.getOne(id)
            console.log(foundedVideo)
            if (foundedVideo) {
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

    async createOneVideo(req: Request, res: Response) {
        try {
            const newVideo = await this.videosRepository.createOne(req.body.title, req.body.author,
                req.body?.availableResolutions, req.body?.canBeDownloaded, req.body?.minAgeRestriction,)
            res.status(201).send(newVideo)
        } catch (err) {
            console.log(err)
            res.status(404).json({
                message: "Something is wrong"
            })
        }
    }

    async updateOneVideo(req: Request, res: Response): Promise<any> {
        try {
            const id = +req.params.id
            const updatedEl = await this.videosRepository.updateOne(id, req.body.title, req.body.author,
                req.body?.availableResolutions, req.body?.canBeDownloaded, req.body?.minAgeRestriction)
            if (!updatedEl) return res.send(404)
            const video = await this.videosRepository.getOne(id)
            res.status(204).send(video)
        } catch (err) {
            console.log(err)
            res.status(404).json({
                message: "Something is wrong"
            })
        }
    }

    async deleteOneVideo(req: Request, res: Response) {
        try {
            const id = +req.params.id
            const result = await this.videosRepository.deleteOne(id)
            if (!result) return res.send(404)
            res.send(204)
        } catch (err) {
            console.log(err)
            res.status(404).json({
                message: "Something is wrong"
            })
        }
    }
}

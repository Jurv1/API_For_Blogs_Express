import {Request, Response} from "express";
import {Video} from "../schemas/schemas";

export let videos: Video[] = [];

export const getStart = async (req: Request, res: Response) => {
    res.send("Hi")
}

export const getAll = async (req: Request, res: Response) => {
    try {
        res.json(videos)
    } catch (err) {
        console.log(err)
        res.status(404).json({
            errorsMessages: "Не удалось найти нужную информацию"
        })
    }
}

export const getOne = async (req: Request, res: Response) => {
    try {
    const id = req.params.id
    const foundedEl = videos.find(el => el?.id === +id)
    if(foundedEl) {
        res.status(200).send(foundedEl)
        return;
    }
    res.status(404).send("Not OK")
    } catch (err){
        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })
    }
}

export const createOne = async (req: Request, res: Response) => {
    try {
        let newVideo = {
            id: +(new Date()),
            title: req.body.title,
            author: req.body.author,
            availableResolutions: req.body.availableResolutions,
            canBeDownloaded: req.body.canBeDownloaded,
            minAgeRestriction: req.body.minAgeRestriction,
            createdAt: (new Date()).toISOString(),
            publicationDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()
        }

        let videoTmp = {
            id: +(new Date()),
            title: req.body.title,
            author: req.body.author,
            availableResolutions: req.body.availableResolutions,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: (new Date()).toISOString(),
            publicationDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()
        }
        newVideo = Object.assign(newVideo, videoTmp)
        videos.push(newVideo)
        res.status(201).send(newVideo)
    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Something is wrong"
        })
    }
}

export const updateOne = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        let foundedEl = videos.find(el => el?.id === +id)

        if (foundedEl) {
            const index = videos.indexOf(foundedEl)
            foundedEl = Object.assign(foundedEl, req.body)
            videos[index] = foundedEl
            res.status(204).send(foundedEl)
            return;
        }
        res.status(404).send("Not ok")
    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Something is wrong"
        })
    }
}

export const deleteOne = async (req: Request, res: Response) => {
    try {
        for (let i = 0; i < videos.length; i++){
            if (videos[i]?.id === +req.params.id){
                videos.splice(i, 1)
                res.send(204)
                return;
            }

        }
        res.status(404).send('Not Ok')
    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Something is wrong"
        })
    }
}

export const deleteAll = async (req: Request, res: Response) => {
    try {
        videos = []
        res.send(204)
    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Something is wrong"
        })
    }
}



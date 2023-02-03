import {Request, Response} from "express";

type Video = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded?: boolean,
    minAgeRestriction?: number | null,
    createdAt?: string,
    publicationDate?: string,
    availableResolutions?:  string[]
} | undefined

let videos: Video[] = [];

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
            id: null,
            title: null,
            author: null,
            availableResolutions: null,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: (new Date()).toISOString(),
            publicationDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()
        }
        newVideo = Object.assign(videoTmp, newVideo)
        videos.push(newVideo)
        res.status(201).send(newVideo)
    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Can't create el"
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
    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Can't update el"
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
    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Can't update el"
        })
    }
}




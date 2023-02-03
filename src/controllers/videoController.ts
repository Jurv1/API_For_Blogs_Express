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

function isIsoDate(str : string) {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
}

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
    } catch (err){
        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })
    }
}

export const createOne = async (req: Request, res: Response) => {
    try {
        if(!(typeof req.body.title === 'string') || req.body.title.length > 40){
            return res.status(400).json({
                "errorsMessages": [
                    {
                        "message": "title",
                        "field": "title"
                    }
                ]
            })
        }
        if(!(typeof req.body.author === 'string') || req.body.author.length > 20){
            return res.status(400).json({
                "errorsMessages": [
                    {
                        "message": "author",
                        "field": "author"
                    }
                ]
            })
        }
        if( req.body.availableResolutions != null && (!(req.body.availableResolutions.length > 0))){
            return res.status(400).json({
                "errorsMessages": [
                    {
                        "message": "availableResolutions",
                        "field": "availableResolutions"
                    }
                ]
            })
        }

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
        if(req.body.title === null || !(typeof req.body.title === 'string') || req.body.title.length > 40){
            return res.status(400).json({
                "errorsMessages": [
                    {
                        "message": "title",
                        "field": "title"
                    }
                ]
            })
        }
        if( req.body.author === null || !(typeof req.body.author === 'string') || req.body.author.length > 20){
            return res.status(400).json({
                "errorsMessages": [
                    {
                        "message": "author",
                        "field": "author"
                    }
                ]
            })
        }
        if( req.body.availableResolutions != null && (!(req.body.availableResolutions.length > 0))){
            return res.status(400).json({
                "errorsMessages": [
                    {
                        "message": "availableResolutions",
                        "field": "availableResolutions"
                    }
                ]
            })
        }
        if( req.body.canBeDownloaded != null && (!(typeof req.body.canBeDownloaded === 'boolean'))){
            return res.status(400).json({
                "errorsMessages": [
                    {
                        "message": "availableResolutions",
                        "field": "availableResolutions"
                    }
                ]
            })
        }
        if( req.body.minAgeRestriction != null && (!(typeof req.body.minAgeRestriction === 'number') || req.body.minAgeRestriction > 18 || req.body.minAgeRestriction < 1)){
            return res.status(400).json({
                "errorsMessages": [
                    {
                        "message": "minAgeRestriction",
                        "field": "minAgeRestriction"
                    }
                ]
            })
        }
        if ( !(req.body.publicationDate !== null) && isIsoDate(req.body.publicationDate) ){
            return res.status(400).json({
                "errorsMessages": [
                    {
                        "message": "minAgeRestriction",
                        "field": "minAgeRestriction"
                    }
                ]
            })
        }

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
            message: "Something is wrong"
        })
    }
}

export const deleteOne = async (req: Request, res: Response) => {

        for (let i = 0; i < videos.length; i++){
            if (videos[i]?.id === +req.params.id){
                videos.splice(i, 1)
                res.send(204)
                return;
            }

        }
    res.send(404)
}

export const deleteAll = async (req: Request, res: Response) => {
    videos = []
    res.send(204)
}



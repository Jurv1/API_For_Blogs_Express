import {Request, Response} from "express";
import {blogDBController, videoDBController} from "../db/db";
import {Video} from "../schemas/videoSchemas";

export const videosService = {
    async getAll() {

        return await videoDBController.find({}, {projection: {_id: 0}}).toArray()

    },

    async getOne(id: number): Promise<Video | null> {

        return await videoDBController.findOne({id: id}, {projection: {_id: 0}})

    },

    async createOne(title: string, author: string, availableResolutions?: Array<string>,
                    canBeDownloaded?: boolean, minAgeRestriction?: number | null): Promise<Video|null> {

        const id = +(new Date())
        let newVideo = {
            id: id,
            title: title,
            author: author,
            availableResolutions: availableResolutions,
            canBeDownloaded: canBeDownloaded,
            minAgeRestriction: minAgeRestriction,
            createdAt: (new Date()).toISOString(),
            publicationDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()
        }

        let videoTmp = {
            id: id,
            title: title,
            author: author,
            availableResolutions: availableResolutions,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: (new Date()).toISOString(),
            publicationDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()
        }
        newVideo = Object.assign(newVideo, videoTmp)
        await videoDBController.insertOne(newVideo)
        return await videoDBController.findOne({id: id}, {projection: {_id: 0}});

    },

    async updateOne(id: number, title: string, author: string, availableResolutions?: Array<string>,
                    canBeDownloaded?: boolean, minAgeRestriction?: number | null): Promise<boolean> {

        const updatedEl = await videoDBController.updateOne({id: id},
            {
                $set: {
                    title: title,
                    author: author,
                    canBeDownloaded: canBeDownloaded,
                    minAgeRestriction: minAgeRestriction,
                    availableResolutions: availableResolutions
                }
            })
        return updatedEl.matchedCount === 1

    },

    async deleteOne(id: number): Promise<boolean> {

        const result = await videoDBController.deleteOne({id})
        return result.deletedCount === 1

    }
}
import {model, Schema} from "mongoose";
import {Video} from "../presentationSchemas/videoSchemas";

export const videoSchema = new Schema<Video>({
    id: Number,
    title: {type: String, required: true},
    author: {type: String, required: true},
    canBeDownloaded: Boolean,
    minAgeRestriction: Number,
    createdAt: String,
    publicationDate: String,
    availableResolutions: [String]
})

export const VideoModel = model<Video>("Video", videoSchema)
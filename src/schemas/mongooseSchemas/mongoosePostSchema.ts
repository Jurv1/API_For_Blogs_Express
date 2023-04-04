import {model, Schema} from "mongoose";
import {DBPost} from "../dbSchemas/PostDBSchema";

export const postSchema = new Schema<DBPost>({
    title: {type: String, required: true},
    shortDescription: {type: String, required: true},
    content: {type: String, required: true},
    blogId: String,
    blogName: String,
    createdAt: String
})

export const Post = model<DBPost>("Post", postSchema)
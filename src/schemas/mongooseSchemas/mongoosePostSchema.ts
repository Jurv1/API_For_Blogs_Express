import {model, Schema, Types} from "mongoose";
import {DBPost} from "../dbSchemas/PostDBSchema";
import {DBNewestLikes} from "../dbSchemas/NewestLikesDBSchema";

export const postSchema = new Schema<DBPost>({
    title: {type: String, required: true},
    shortDescription: {type: String, required: true},
    content: {type: String, required: true},
    extendedLikesInfo: {
        likesCount: Number,
        dislikesCount: Number,
        myStatus: String,
//        newestLikes: Array<DBNewestLikes>
    },
    blogId: String,
    blogName: String,
    createdAt: String
})

export const Post = model<DBPost>("Post", postSchema)
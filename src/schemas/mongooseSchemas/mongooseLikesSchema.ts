import {model, Schema} from "mongoose";
import {DBLike} from "../dbSchemas/LikesDBSchema";

export const likesSchema = new Schema<DBLike>({
    userId: String,
    userStatus: String,
    userLogin: String,
    commentPostId: String,
    addedAt: String
})

export const Like = model("Like", likesSchema)
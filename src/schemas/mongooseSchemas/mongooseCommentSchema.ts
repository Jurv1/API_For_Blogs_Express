import {model, Schema} from "mongoose";
import {DBComment} from "../dbSchemas/CommentDBSchema";

export const commentSchema = new Schema<DBComment>({
    content: {type: String, required: true},
    commentatorInfo: {
        userId: {type: String, required: true},
        userLogin: {type: String, required: true}
    },
    postId: String,
    likesInfo: {
      likesCount: Number,
      dislikesCount: Number,
      myStatus: String,
    },
    createdAt: String
})

export const Comment = model<DBComment>("Comment", commentSchema)
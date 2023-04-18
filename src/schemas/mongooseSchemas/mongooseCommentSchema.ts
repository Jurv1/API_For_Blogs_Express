import {model, Schema} from "mongoose";
import {DBComment} from "../dbSchemas/CommentDBSchema";
import {DBUser} from "../dbSchemas/UserDBSchema";

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
      whoLikedIt: Array<DBUser>
    },
    createdAt: String
})

export const Comment = model<DBComment>("Comment", commentSchema)
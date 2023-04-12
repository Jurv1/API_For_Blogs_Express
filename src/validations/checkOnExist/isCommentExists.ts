import { param } from "express-validator";
import { ObjectId } from "mongodb";
import {CommentQ} from "../../repositories/queryRepository/commentQ/commentQ"

const commentQ = new CommentQ()
export const isCommentExists = param("id").custom(
    async (value) => {
        const result = await commentQ.getOneComment(new ObjectId(value))
        if (!result) throw new Error("No such Comment")
        return true
    }
)
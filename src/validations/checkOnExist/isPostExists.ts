import {param} from "express-validator";
import {ObjectId} from "mongodb";
import {PostQ} from "../../repositories/queryRepository/postQ/postQ";
import {CommentQ} from "../../repositories/queryRepository/commentQ/commentQ";
import {LikesRepository} from "../../repositories/likesRepository";

const likesRepo = new LikesRepository()
const commentQ = new CommentQ(likesRepo)
const postQ = new PostQ(commentQ, likesRepo)
export const isPostExists = param("id").custom(
    async (value) => {
        const result = await postQ.getOnePost(value)
        if (!result) throw new Error("No such Post")
        return true
    }
)
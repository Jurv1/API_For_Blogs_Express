import {ObjectId} from "mongodb";
import {mapComment} from "../../../utils/mappers/commentMapper";
import {viewCommentModel} from "../../../schemas/presentationSchemas/commentSchemas";
import {Comment} from "../../../schemas/mongooseSchemas/mongooseCommentSchema";

class CommentQ {
    async getOneComment(id: ObjectId): Promise<viewCommentModel|null> {

        const result = await Comment.findOne({ _id: new ObjectId(id) })

        if(!result){
            return null
        }

        return mapComment(result)

    }
}

export const commentQ = new CommentQ()
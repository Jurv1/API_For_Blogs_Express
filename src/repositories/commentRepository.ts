import {ObjectId} from "mongodb";
import {Comment} from "../schemas/mongooseSchemas/mongooseCommentSchema";

export class CommentRepository{
    async updateOne(id: string, content: string): Promise<boolean> {
        const myId  = new ObjectId(id)
        const updatedEl = await Comment.updateOne({_id: myId},
            {
                $set: {
                    content: content
                }
            })
        return updatedEl.matchedCount === 1;
    }

    async deleteOne(id: string): Promise<boolean> {
        const myId = new ObjectId(id)
        const result = await Comment.deleteOne({_id: myId})
        return result.deletedCount === 1
    }
}
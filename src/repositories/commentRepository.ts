import {ObjectId} from "mongodb";
import {Comment} from "../schemas/mongooseSchemas/mongooseCommentSchema";
import {injectable} from "inversify";

@injectable()
export class CommentRepository{
    async updateOne(id: string, content: string): Promise<boolean> {
        const myId  = new ObjectId(id)
        const updatedEl = await Comment.updateOne({_id: myId},
            {
                $set: {
                    content: content
                }
            })
        return updatedEl.matchedCount === 1
    }

    async deleteOne(id: string): Promise<boolean> {
        const myId = new ObjectId(id)
        const result = await Comment.deleteOne({_id: myId})
        return result.deletedCount === 1
    }

    async updateLikeStatus(id: string, updateField: { [key: string]: number }){
        const result = await Comment.updateOne({id}, {$inc: {
                updateField
            }
        })

        return result.modifiedCount == 1
    }



}
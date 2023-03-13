import {ObjectId} from "mongodb";
import {commentDBController} from "../db/db";
import {mapComment} from "../utils/mappers/commentMapper";

export const commentsRepository = {

    async updateOne(id: string, content: string): Promise<boolean> {
        const myId  = new ObjectId(id)
        const updatedEl = await commentDBController.updateOne({_id: myId},
            {
                $set: {
                    content: content
                }
            })
        return updatedEl.matchedCount === 1;
    },

    async deleteOne(id: string): Promise<boolean> {
        const myId = new ObjectId(id)
        const a = await commentDBController.findOne({ _id: myId})
        console.log(a)
        const result = await commentDBController.deleteOne({_id: myId})
        //const result = await commentDBController.deleteOne({myId})
        return result.deletedCount === 1
    }
}
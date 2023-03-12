import {ObjectId} from "mongodb";
import {commentDBController} from "../db/db";

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

    async deleteOne(id: string, userId: string): Promise<boolean> {
        const myId = new ObjectId(id)
        const result = await commentDBController.deleteOne({_id: myId})
        return result.deletedCount === 1
    }
}
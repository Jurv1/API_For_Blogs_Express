import {commentDBController, postDBController} from "../db/db";
import {FinalDBPost} from "../schemas/dbSchemas/PostDBSchema";
import {ObjectId} from "mongodb";
import {PostWithoutId} from "../schemas/presentationSchemas/postSchemas";
import {FinalDBComment} from "../schemas/dbSchemas/CommentDBSchema";
import {CommentWithoutId} from "../schemas/presentationSchemas/commentSchemas";

export const postsRepository = {

    async createOne(newPostTmp: PostWithoutId): Promise<FinalDBPost | null> {

        const resultId = await postDBController.insertOne(newPostTmp)
        return await postDBController.findOne({_id: resultId.insertedId});

    },

    async updateOne(id: string,  title: string, shortDescription: string,
                    content: string, blogId: string): Promise<boolean> {

        const myId  = new ObjectId(id)
        const updatedEl = await postDBController.updateOne({_id: myId},
            {
                $set: {
                    title: title,
                    shortDescription: shortDescription,
                    content: content,
                    blogId: blogId,
                }
            })
        return updatedEl.matchedCount === 1;
    },

    async deleteOne(id: string): Promise<boolean> {

        const myId = new ObjectId(id)
        const result = await postDBController.deleteOne({ _id: myId })
        return result.deletedCount === 1

    },

    async createOneCommentByPostId(newCommentTmp: CommentWithoutId): Promise<FinalDBComment | null>{
        const resultId = await commentDBController.insertOne(newCommentTmp)
        return await commentDBController.findOne({_id: resultId.insertedId});
    }
}

import {FinalDBPost} from "../schemas/dbSchemas/PostDBSchema";
import {ObjectId} from "mongodb";
import {PostWithoutId} from "../schemas/presentationSchemas/postSchemas";
import {FinalDBComment} from "../schemas/dbSchemas/CommentDBSchema";
import {CommentWithoutId} from "../schemas/presentationSchemas/commentSchemas";
import {Post} from "../schemas/mongooseSchemas/mongoosePostSchema";
import {Comment} from "../schemas/mongooseSchemas/mongooseCommentSchema";
import {injectable} from "inversify";

@injectable()
export class PostsRepository {
    async createOne(newPostTmp: PostWithoutId): Promise<FinalDBPost | null> {

        const resultId = await Post.create(newPostTmp)
        return Post.findOne({_id: resultId._id});

    }

    async updateOne(id: string,  title: string, shortDescription: string,
                    content: string, blogId: string): Promise<boolean> {

        const myId  = new ObjectId(id)
        const updatedEl = await Post.updateOne({_id: myId},
            {
                $set: {
                    title: title,
                    shortDescription: shortDescription,
                    content: content,
                    blogId: blogId,
                }
            })
        return updatedEl.matchedCount === 1;
    }

    async deleteOne(id: string): Promise<boolean> {

        const myId = new ObjectId(id)
        const result = await Post.deleteOne({ _id: myId })
        return result.deletedCount === 1

    }

    async createOneCommentByPostId(newCommentTmp: CommentWithoutId): Promise<FinalDBComment | null>{
        const resultId = await Comment.create(newCommentTmp)
        return Comment.findOne({_id: resultId._id}).lean()
    }
}

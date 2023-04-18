import {ObjectId} from "mongodb";
import {mapComment} from "../../../utils/mappers/commentMapper";
import {viewCommentModel} from "../../../schemas/presentationSchemas/commentSchemas";
import {Comment} from "../../../schemas/mongooseSchemas/mongooseCommentSchema";
import {Like} from "../../../schemas/mongooseSchemas/mongooseLikesSchema";

export class CommentQ {
    async getOneComment(id: ObjectId): Promise<viewCommentModel|null> {

        const allLikes = await Like.countDocuments({$and:[{commentId: id}, {userStatus: "Like"}] })
        const allDislikes = await Like.countDocuments({$and:[{commentId: id}, {userStatus: "Dislike"}] })
        console.log(allLikes, allDislikes)

        const result = await Comment.findOne({ _id: new ObjectId(id) })

        if(!result){
            return null
        }

        return mapComment(result)

    }
}

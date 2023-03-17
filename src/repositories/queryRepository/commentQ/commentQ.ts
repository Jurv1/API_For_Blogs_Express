import {commentDBController} from "../../../db/db";
import {ObjectId} from "mongodb";
import {mapComment} from "../../../utils/mappers/commentMapper";
import {viewCommentModel} from "../../../schemas/presentationSchemas/commentSchemas";

export async function getOneComment(id: ObjectId): Promise<viewCommentModel|null> {

    const result = await commentDBController.findOne({ _id: new ObjectId(id) })

    if(!result){
        return null
    }

    return mapComment(result)

}
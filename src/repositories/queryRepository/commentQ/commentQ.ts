import {FinalDBComment} from "../../../schemas/dbSchemas/CommentDBSchema";
import {commentDBController} from "../../../db/db";
import {ObjectId} from "mongodb";

export async function getOneComment(id: string): Promise<FinalDBComment|null> {

    return await commentDBController.findOne({ _id: new ObjectId(id) })

}
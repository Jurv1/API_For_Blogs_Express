import {FinalDBComment} from "../../schemas/dbSchemas/CommentDBSchema";
import {viewCommentModel} from "../../schemas/presentationSchemas/commentSchemas";

export function mapComment(obj: FinalDBComment): viewCommentModel{
    return {
        id: obj._id.toString(),
        content: obj.content,
        commentatorInfo: obj.commentatorInfo,
        createdAt: obj.createdAt
    }
}

export function mapComments(objs: FinalDBComment[]): viewCommentModel[]{
    return objs.map(el => {
        return {

            id: el._id.toString(),
            content: el.content,
            commentatorInfo: el.commentatorInfo,
            createdAt: el.createdAt

        }
    })
}
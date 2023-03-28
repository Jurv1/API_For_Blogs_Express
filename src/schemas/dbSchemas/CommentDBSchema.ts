import {MongoId} from "./MongoIdSchema";

export type DBComment = {
    content: string,
    commentatorInfo: {
        userId: string,
        userLogin: string
    },
    postId: string,
    createdAt: string
}

export type FinalDBComment = MongoId & DBComment
import {ObjectId} from "mongodb";

export type DBComment = {
    content: string,
    commentatorInfo: {
        userId: string,
        userLogin: string
    },
    postId: string,
    createdAt: string
}

type MongoId = {
    _id: ObjectId
}

export type FinalDBComment = MongoId & DBComment
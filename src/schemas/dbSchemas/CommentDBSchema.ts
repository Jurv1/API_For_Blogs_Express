import {MongoId} from "./MongoIdSchema";
import {DBUser} from "./UserDBSchema";

export type DBComment = {
    content: string,
    commentatorInfo: {
        userId: string,
        userLogin: string
    },
    likesInfo: {
        likesCount: number,
        dislikesCount: number,
        myStatus: string
    },
    postId: string,
    createdAt: string
}

export type FinalDBComment = MongoId & DBComment
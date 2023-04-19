import {myId} from "./myId";

export type CommentWithoutId = {
    content: string,
    commentatorInfo: {
        userId: string,
        userLogin: string
    },
    postId: string,
    createdAt: string
}

export type viewCommentModel = myId & {
    content: string,
    commentatorInfo: {
        userId: string,
        userLogin: string
    },
    createdAt: string,
    likesInfo: {
        likesCount: number,
        dislikesCount: number,
        myStatus: string
    }
}
export type CommentWithoutId = {
    content: string,
    commentatorInfo: {
        userId: string,
        userLogin: string
    },
    postId: string,
    createdAt: string
}

type myId = {
    id: string
}

export type viewCommentModel = myId & {
    content: string,
    commentatorInfo: {
        userId: string,
        userLogin: string
    },
    createdAt: string
}
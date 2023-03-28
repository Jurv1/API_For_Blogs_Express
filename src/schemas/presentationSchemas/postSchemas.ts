import {myId} from "./myId";

export type PostWithoutId = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}

export type viewPostModel = myId & PostWithoutId
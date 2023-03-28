import {myId} from "./myId";

export type BlogWithoutId = {
    name: string
    description: string
    websiteUrl: string,
    isMembership?: boolean,
    createdAt?: string
}

export type viewBlogModel = myId & BlogWithoutId

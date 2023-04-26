import {myId} from "./myId";
import {DBNewestLikes} from "../dbSchemas/NewestLikesDBSchema";

export type PostWithoutId = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    extendedLikesInfo: {
        likesCount: number,
        dislikesCount: number,
        myStatus: string,
        newestLikes: Array<DBNewestLikes>
    }
    createdAt: string
}

export type viewPostModel = myId & PostWithoutId
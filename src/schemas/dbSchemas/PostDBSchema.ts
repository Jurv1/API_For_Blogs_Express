import {MongoId} from "./MongoIdSchema";
import {DBNewestLikes} from "./NewestLikesDBSchema";

export type DBPost = {
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
    createdAt: string,
}

export type FinalDBPost = MongoId & DBPost
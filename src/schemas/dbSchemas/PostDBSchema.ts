import {MongoId} from "./MongoIdSchema";

export type DBPost = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}

export type FinalDBPost = MongoId & DBPost
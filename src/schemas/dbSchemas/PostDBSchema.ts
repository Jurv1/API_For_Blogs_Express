import {ObjectId} from "mongodb";

export type DBPost = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}

type MongoId = {
    _id: ObjectId
}

export type FinalDBPost = MongoId & DBPost
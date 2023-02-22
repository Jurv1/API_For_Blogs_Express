import {ObjectId} from "mongodb";

export type DBBlog = {
    name: string
    description: string
    websiteUrl: string,
    isMembership?: boolean,
    createdAt?: string
}

type MongoId = {
    _id: ObjectId
}

export type FinalDBBlog = MongoId & DBBlog
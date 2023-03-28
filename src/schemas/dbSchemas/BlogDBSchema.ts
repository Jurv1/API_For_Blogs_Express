import {MongoId} from "./MongoIdSchema";

export type DBBlog = {
    name: string
    description: string
    websiteUrl: string,
    isMembership?: boolean,
    createdAt?: string
}



export type FinalDBBlog = MongoId & DBBlog
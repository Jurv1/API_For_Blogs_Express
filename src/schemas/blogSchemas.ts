import {ObjectId} from "mongodb";

export type Blog = {
    id: string
    name: string
    description: string
    websiteUrl: string,
    isMembership?: boolean,
    createdAt?: string
}
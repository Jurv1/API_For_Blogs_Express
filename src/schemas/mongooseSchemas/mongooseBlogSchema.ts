import {model, Schema} from "mongoose";
import {DBBlog} from "../dbSchemas/BlogDBSchema";

export const blogSchema = new Schema<DBBlog>({
    name: {type: String, required: true},
    description: {type: String, required: true},
    websiteUrl: {type: String, required: true},
    isMembership: Boolean,
    createdAt: String
})

export const Blog = model<DBBlog>("Blog", blogSchema)
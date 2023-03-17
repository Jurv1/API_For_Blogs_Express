import {FinalDBPost} from "../../schemas/dbSchemas/PostDBSchema";
import {viewPostModel} from "../../schemas/presentationSchemas/postSchemas";

export function mapPost(obj: FinalDBPost): viewPostModel{
    return {
        id: obj._id.toString(),
        title: obj.title,
        shortDescription: obj.shortDescription,
        content: obj.content,
        blogId: obj.blogId,
        blogName: obj.blogName,
        createdAt: obj.createdAt
    }
}

export function mapPosts(objs: FinalDBPost[]): viewPostModel[]{
    return objs.map(el => {
        return {
            id: el._id.toString(),
            title: el.title,
            shortDescription: el.shortDescription,
            content: el.content,
            blogId: el.blogId,
            blogName: el.blogName,
            createdAt: el.createdAt
        }
    })
}
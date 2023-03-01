import {DBBlog, FinalDBBlog} from "../../schemas/dbSchemas/BlogDBSchema";
import {viewBlogModel} from "../../schemas/presentationSchemas/blogSchemas";

export function mapBlog(obj: FinalDBBlog): viewBlogModel{
    return {
        id: obj._id.toString(),
        name: obj.name,
        description: obj.description,
        websiteUrl: obj.websiteUrl,
        isMembership: obj.isMembership,
        createdAt: obj.createdAt
    }
}

export function mapBlogs(objs: FinalDBBlog[]): viewBlogModel[]{
    return objs.map(el => {
        return {

            id: el._id.toString(),
            name: el.name,
            description: el.description,
            websiteUrl: el.websiteUrl,
            isMembership: el.isMembership,
            createdAt: el.createdAt

        }
    })
}
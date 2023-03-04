import {DBBlog, FinalDBBlog} from "../../schemas/dbSchemas/BlogDBSchema";
import {viewBlogModel} from "../../schemas/presentationSchemas/blogSchemas";
import {FinalDBUser} from "../../schemas/dbSchemas/UserDBSchema";
import {ViewUserModel} from "../../schemas/presentationSchemas/userSchemas";

export function mapUser(obj: FinalDBUser): ViewUserModel{
    return {

        id: obj._id.toString(),
        login: obj.login,
        email: obj.email,
        createdAt: obj.createdAt
    }
}

export function mapUsers(objs: FinalDBUser[]): ViewUserModel[]{
    return objs.map(el => {
        return {

            id: el._id.toString(),
            login: el.login,
            email: el.email,
            createdAt: el.createdAt

        }
    })
}
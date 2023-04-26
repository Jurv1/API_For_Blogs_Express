import {ViewUserModel} from "../../schemas/presentationSchemas/userSchemas";
import {DBLike} from "../../schemas/dbSchemas/LikesDBSchema";
import {DBNewestLikes} from "../../schemas/dbSchemas/NewestLikesDBSchema";

export function mapLikes(objs: DBLike[]): DBNewestLikes[]{
    return objs.map(el => {
        return {
            addedAt: el.addedAt,
            userId: el.userId,
            login: el.userLogin
        }
    })
}
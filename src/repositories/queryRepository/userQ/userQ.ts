import {Document, Sort} from "mongodb";
import {UserPagination} from "../../../schemas/paginationSchemas/userPaginationSchema";
import {blogDBController, userDBController} from "../../../db/db";
import {mapUsers} from "../../../utils/mappers/userMapper";

export async function getAllUsers(filter: Document,sort: Sort, pagination: {skipValue: number, limitValue: number,
    pageSize: number, pageNumber: number}): Promise<UserPagination>{

    const allUsers = await userDBController.find(filter).sort(sort).skip(pagination["skipValue"])
        .limit(pagination["limitValue"]).toArray()

    const countDocs = await userDBController.countDocuments(filter)
    const c = await userDBController.find(filter).sort(sort).toArray()
    const pagesCount = Math.ceil(c.length / pagination["pageSize"])

    return {
        pagesCount: pagesCount,
        page: pagination["pageNumber"],
        pageSize: pagination["pageSize"],
        totalCount: c.length,
        items: mapUsers(allUsers)
    }

}

export async function getOneByLoginOrPassword(loginOrEmail: string){

    return await userDBController.findOne({$or: [{login: loginOrEmail}, {email: loginOrEmail}]})

}
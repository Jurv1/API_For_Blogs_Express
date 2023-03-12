import {Document, ObjectId, Sort} from "mongodb";
import {UserPagination} from "../../../schemas/paginationSchemas/userPaginationSchema";
import {blogDBController, userDBController} from "../../../db/db";
import {mapUsers} from "../../../utils/mappers/userMapper";
import {FinalDBUser} from "../../../schemas/dbSchemas/UserDBSchema";

export async function getAllUsers(filter: Document,sort: Sort, pagination: {skipValue: number, limitValue: number,
    pageSize: number, pageNumber: number}): Promise<UserPagination>{

    const allUsers = await userDBController.find(filter).sort(sort).skip(pagination["skipValue"])
        .limit(pagination["limitValue"]).toArray()

    const countDocs = await userDBController.countDocuments(filter)
    const pagesCount = Math.ceil(countDocs / pagination["pageSize"])

    return {
        pagesCount: pagesCount,
        page: pagination["pageNumber"],
        pageSize: pagination["pageSize"],
        totalCount: countDocs,
        items: mapUsers(allUsers)
    }

}

export async function getOneByLoginOrPassword(loginOrEmail: string): Promise<FinalDBUser | null>{

    return await userDBController.findOne({$or: [{login: loginOrEmail}, {email: loginOrEmail}]})

}

export async function getOneUserById(id: string){

    return await userDBController.findOne( {_id: new ObjectId(id)} )

}
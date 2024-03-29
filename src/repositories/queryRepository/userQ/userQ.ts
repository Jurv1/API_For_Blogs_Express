import {Document, ObjectId} from "mongodb";
import {UserPagination} from "../../../schemas/paginationSchemas/userPaginationSchema";
import {mapUsers} from "../../../utils/mappers/userMapper";
import {FinalDBUser} from "../../../schemas/dbSchemas/UserDBSchema";
import {SortOrder} from "mongoose";
import {User} from "../../../schemas/mongooseSchemas/mongooseUserSchema";
import {injectable} from "inversify";

@injectable()
export class UserQ {
    async getAllUsers(filter: Document, sort: { [key: string]: SortOrder; }, pagination: {
        skipValue: number, limitValue: number,
        pageSize: number, pageNumber: number
    }): Promise<UserPagination> {

        const allUsers = await User.find(filter).sort(sort).skip(pagination["skipValue"])
            .limit(pagination["limitValue"]).lean()

        const countDocs = await User.countDocuments(filter)
        const pagesCount = Math.ceil(countDocs / pagination["pageSize"])

        return {
            pagesCount: pagesCount,
            page: pagination["pageNumber"],
            pageSize: pagination["pageSize"],
            totalCount: countDocs,
            items: mapUsers(allUsers)
        }

    }

    async getOneByLoginOrEmail(loginOrEmail: string): Promise<FinalDBUser | null> {

        return User.findOne({$or: [{"accountData.login": loginOrEmail}, {"accountData.email": loginOrEmail}]})

    }

    async getOneByConfirmationCode(confirmationCode: string): Promise<FinalDBUser | null> {

        return User.findOne({"emailConfirmation.confirmationCode": confirmationCode})

    }

    async getOneByPassCode(code: string) {

        return User.findOne({"passRecovery.recoveryCode": code})

    }

    async getOneUserById(id: string) {

        return User.findOne({_id: new ObjectId(id)})

    }
}

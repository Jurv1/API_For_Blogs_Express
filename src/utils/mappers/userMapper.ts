import {FinalDBUser} from "../../schemas/dbSchemas/UserDBSchema";
import {ViewUserModel} from "../../schemas/presentationSchemas/userSchemas";

export function mapUser(obj: FinalDBUser): ViewUserModel{
    return {

        id: obj._id.toString(),
        login: obj.accountData.login,
        email: obj.accountData.email,
        ifCon: obj.emailConfirmation.isConfirmed,
        createdAt: obj.accountData.createdAt
    }
}

export function mapUsers(objs: FinalDBUser[]): ViewUserModel[]{
    return objs.map(el => {
        return {

            id: el._id.toString(),
            login: el.accountData.login,
            email: el.accountData.email,
            ifCon: el.emailConfirmation.isConfirmed,
            createdAt: el.accountData.createdAt

        }
    })
}
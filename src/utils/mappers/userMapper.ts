import {FinalDBUser} from "../../schemas/dbSchemas/UserDBSchema";
import {ViewUserModel} from "../../schemas/presentationSchemas/userSchemas";

export function mapUser(obj: FinalDBUser): ViewUserModel{
    return {

        id: obj._id.toString(),
        login: obj.accountData.login,
        email: obj.accountData.email,
        confirmationCode: obj.emailConfirmation.confirmationCode,
        createdAt: obj.accountData.createdAt
    }
}

export function mapUsers(objs: FinalDBUser[]): ViewUserModel[]{
    return objs.map(el => {
        return {

            id: el._id.toString(),
            login: el.accountData.login,
            email: el.accountData.email,
            confirmationCode: el.emailConfirmation.confirmationCode,
            createdAt: el.accountData.createdAt

        }
    })
}
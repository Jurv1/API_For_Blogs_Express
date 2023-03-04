import {ViewUserModel} from "../presentationSchemas/userSchemas";


export type UserPagination = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: ViewUserModel[]
}
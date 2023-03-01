import {viewPostModel} from "../presentationSchemas/postSchemas";

export type PostPagination = {
    pagesCount?: number
    page?: number
    pageSize?: number
    totalCount?: number
    items: viewPostModel[]
}
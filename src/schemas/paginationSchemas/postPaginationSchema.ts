import {FinalDBPost} from "../dbSchemas/PostDBSchema";

export type PostPagination = {
    pagesCount?: number
    page?: number
    pageSize?: number
    totalCount?: number
    items: FinalDBPost[]
}
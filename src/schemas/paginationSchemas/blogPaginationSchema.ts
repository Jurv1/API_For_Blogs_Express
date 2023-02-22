import {FinalDBBlog} from "../dbSchemas/BlogDBSchema";

export type BlogPagination = {
    pagesCount?: number
    page?: number
    pageSize?: number
    totalCount?: number
    items: FinalDBBlog[]
}
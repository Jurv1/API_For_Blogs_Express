import {viewBlogModel} from "../presentationSchemas/blogSchemas";

export type BlogPagination = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: viewBlogModel[]
}
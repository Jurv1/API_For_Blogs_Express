import {viewCommentModel} from "../presentationSchemas/commentSchemas";

export type CommentPagination = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: viewCommentModel[]
}
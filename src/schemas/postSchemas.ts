export type Post = {
    id: string,
    title: string,
    shortDescription: string,
    content?: string,
    blogId?: string,
} | undefined
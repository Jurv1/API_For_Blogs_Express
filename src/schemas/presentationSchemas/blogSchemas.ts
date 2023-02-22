export type BlogWithoutId = {
    name: string
    description: string
    websiteUrl: string,
    isMembership?: boolean,
    createdAt?: string
}

type myId = {
    id: string
}

export type viewBlogModel = myId & BlogWithoutId

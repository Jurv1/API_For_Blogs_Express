export type PostWithoutId = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}

type myId = {
    id: string
}

export type viewPostModel = myId & PostWithoutId
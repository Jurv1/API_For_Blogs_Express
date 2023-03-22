export type UserWithoutId = {
    login: string,
    email: string,
    createdAt: string
}

type MyId = {
    id: string
}

export type ViewUserModel =  MyId & UserWithoutId
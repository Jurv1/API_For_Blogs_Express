export type UserWithoutId = {
    login: string,
    email: string,
    ifCon: boolean,
    createdAt: string
}

type MyId = {
    id: string
}

export type ViewUserModel =  MyId & UserWithoutId
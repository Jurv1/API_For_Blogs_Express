export type UserWithoutId = {
    login: string,
    email: string,
    confirmationCode: string,
    createdAt: string
}

type MyId = {
    id: string
}

export type ViewUserModel =  MyId & UserWithoutId
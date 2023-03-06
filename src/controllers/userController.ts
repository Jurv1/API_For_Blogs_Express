import {userDBController} from "../db/db";
import {FinalDBUser} from "../schemas/dbSchemas/UserDBSchema";
import {ObjectId, SortDirection} from "mongodb";
import {Request, Response} from "express";

import * as UserService from "../services/userService"
import * as UserQueryRepo from "../repositories/queryRepository/userQ/userQ"
import {mapUser} from "../utils/mappers/userMapper";
import {ViewUserModel} from "../schemas/presentationSchemas/userSchemas";
import {queryValidator} from "../utils/queryValidators/sortQueryValidator";
import {usersRepository} from "../repositories/usersRepository";
import {filterQueryValid} from "../utils/queryValidators/filterQueryValid";
import {makePagination} from "../utils/paggination/paggination";
import QueryString from "qs";

export async function getAll(req: Request | Request<{}, {}, {}, {searchLoginTerm: string;
                                                                            searchEmailTerm: string;
                                                                            sortBy: string;
                                                                            sortDirection: SortDirection;
                                                                            pageNumber: string;
                                                                            pageSize: string}>, res: Response){

    let {searchLoginTerm, searchEmailTerm, sortBy, sortDirection, pageNumber, pageSize} = req.query
    console.log(searchLoginTerm, searchEmailTerm, sortBy, sortDirection, pageNumber, pageSize)

    const sort = queryValidator(sortBy as string, sortDirection as SortDirection)
    const filter = filterQueryValid(undefined, searchLoginTerm as string, searchEmailTerm as string)
    const pagination = makePagination(pageNumber as string, pageSize as string)

    try {

        const allUsers = await UserQueryRepo.getAllUsers(filter, sort, pagination)

        if(allUsers.items.length === 0){
            res.sendStatus(404)
            return

        }

        res.status(200).send(allUsers)

    } catch (err){
        res.status(404).json({
            message: "Can't find el"
        })
    }
}

export async function createOne(req: Request, res: Response){
    const {login, email, password} = req.body
    try {
        const result: FinalDBUser|null = await UserService.createOneUser(login, email, password)
        if(result)  {
            const viewBlog: ViewUserModel = mapUser(result)
            res.status(201).send(viewBlog)
        } else res.status(404).json({
            message: "Can't find el"
        })
    } catch (err){
        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })
    }
}

export async function deleteOne(req: Request, res: Response){
    const id = req.params.id
    try {

        const result = await UserService.deleteOneBlog(id)
        if (!result) return res.send(404)
        res.send(204)

    } catch (err){

        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })

    }
}
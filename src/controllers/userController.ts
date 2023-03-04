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

export async function getAll(req: Request<{}, {}, {}, {searchLoginTerm: string, searchEmailTerm: string, sortBy: string,
    sortDirection: SortDirection, pageNumber: string, pageSize: string}> ,res: Response){

    let {searchLoginTerm, searchEmailTerm, sortBy, sortDirection, pageNumber, pageSize} = req.query

    const sort = queryValidator(sortBy, sortDirection)
    const filter = filterQueryValid(searchLoginTerm, searchEmailTerm)
    const pagination = makePagination(pageNumber, pageSize)

    try {

        const allUsers = await UserQueryRepo.getAllUsers(filter, sort, pagination)

        if(allUsers.items.length === 0){
            res.sendStatus(404)
        }

        res.status(200).send(allUsers)

    } catch (err){
        res.status(404).json({
            message: "Can't find el"
        })
    }
    const allUsers = await userDBController.find().toArray()
    res.status(200).send(allUsers)
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
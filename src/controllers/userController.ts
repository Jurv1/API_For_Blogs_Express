import {FinalDBUser} from "../schemas/dbSchemas/UserDBSchema";
import { SortDirection} from "mongodb";
import {Request, Response} from "express";
import {mapUser} from "../utils/mappers/userMapper";
import {ViewUserModel} from "../schemas/presentationSchemas/userSchemas";
import {queryValidator} from "../utils/queryValidators/sortQueryValidator";
import {filterQueryValid} from "../utils/queryValidators/filterQueryValid";
import {makePagination} from "../utils/paggination/paggination";
import {UserQ} from "../repositories/queryRepository/userQ/userQ";
import {UserService} from "../services/userService";

class UserController {

    private userQ: UserQ
    private userService: UserService
    constructor() {
        this.userQ = new UserQ()
        this.userService = new UserService()
    }
    async getAll(req: Request | Request<{}, {}, {}, {
        searchLoginTerm: string;
        searchEmailTerm: string;
        sortBy: string;
        sortDirection: SortDirection;
        pageNumber: string;
        pageSize: string
    }>, res: Response) {

        let {searchLoginTerm, searchEmailTerm, sortBy, sortDirection, pageNumber, pageSize} = req.query
        console.log(searchLoginTerm, searchEmailTerm, sortBy, sortDirection, pageNumber, pageSize)

        const sort = queryValidator(sortBy as string, sortDirection as SortDirection)
        const filter = filterQueryValid(undefined, searchLoginTerm as string, searchEmailTerm as string)
        const pagination = makePagination(pageNumber as string, pageSize as string)

        try {

            const allUsers = await this.userQ.getAllUsers(filter, sort, pagination)

            if (!allUsers) {
                res.sendStatus(404)
                return
            }

            res.status(200).send(allUsers)

        } catch (err) {
            res.status(404).json({
                message: "Can't find el"
            })
        }
    }

    async createOne(req: Request, res: Response) {
        const {login, email, password} = req.body
        try {
            const result: FinalDBUser | null = await this.userService.createOneUser(login, email, password, true)
            if (result) {
                const viewUser: ViewUserModel = mapUser(result)
                res.status(201).send(viewUser)
            } else res.status(404).json({
                message: "Can't find el"
            })
        } catch (err) {
            console.log(err)
            res.status(404).json({
                message: "Can't find el"
            })
        }
    }

    async deleteOne(req: Request, res: Response) {
        const id = req.params.id
        try {

            const result = await this.userService.deleteOneBlog(id)
            if (!result) return res.send(404)
            res.send(204)

        } catch (err) {

            console.log(err)
            res.status(404).json({
                message: "Can't find el"
            })

        }
    }
}

export const userController = new UserController()
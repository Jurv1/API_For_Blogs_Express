import {Request, Response, Router} from "express";
import * as UserController from "../controllers/userController"
import checkAuth from "../utils/checkAuth";
import {userValidator} from "../validations/userValidator";
export const userRouter = Router({})

userRouter.get('/', UserController.getAll) // UserController.getAll
userRouter.post('/',checkAuth, userValidator,  UserController.createOne)
userRouter.delete('/:id', checkAuth, UserController.deleteOne)

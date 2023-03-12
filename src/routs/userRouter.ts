import {Router} from "express";
import * as UserController from "../controllers/userController"
import checkAuth from "../utils/auth/checkAuth";
import {userValidator} from "../validations/userValidator";
import handleErr from "../utils/handleErr";
export const userRouter = Router({})

userRouter.get('/', checkAuth,   UserController.getAll) // UserController.getAll
userRouter.post('/',checkAuth, userValidator, handleErr, UserController.createOne)
userRouter.delete('/:id', checkAuth, UserController.deleteOne)

userRouter.get('/', checkAuth, )

import {Router} from "express";
import checkAuth from "../utils/auth/checkAuth";
import {userValidator} from "../validations/bodyValidations/user/userValidator";
import handleErr from "../utils/handleErr";
import {userController} from "../controllers/userController";
export const userRouter = Router({})

userRouter.get('/', checkAuth,   userController.getAll.bind(userController))
userRouter.post('/',checkAuth, userValidator, handleErr, userController.createOne.bind(userController))
userRouter.delete('/:id', checkAuth, userController.deleteOne.bind(userController))


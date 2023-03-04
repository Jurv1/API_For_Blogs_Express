import {Router} from "express";
import {loginValid} from "../validations/authValid";
import {loginUser} from "../controllers/authController";

export const authRouter = Router({})

authRouter.post('/login', loginValid, loginUser)
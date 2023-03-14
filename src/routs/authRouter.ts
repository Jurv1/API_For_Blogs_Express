import {Router} from "express";
import {loginValid} from "../validations/authValid";
import * as LoginController from "../controllers/authController";
import checkBearer from "../utils/auth/checkBearer";

export const authRouter = Router({})

authRouter.post('/login', loginValid, LoginController.loginUser)
authRouter.post('/registration', LoginController.registerMe)
authRouter.post('/registration-confirmation', LoginController.confirmRegistration)
authRouter.post('/registration-email-resending', LoginController.resendRegistrationConfirming)

authRouter.get('/me', checkBearer, LoginController.getMe)
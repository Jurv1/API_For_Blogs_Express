import {Router} from "express";
import {loginValid} from "../validations/bodyValidations/auth/authValid";
import * as LoginController from "../controllers/authController";
import checkBearer from "../utils/auth/checkBearer";
import {userValidator} from "../validations/bodyValidations/user/userValidator";
import {registrationCodeValid} from "../validations/bodyValidations/auth/registrationCodeValid";

export const authRouter = Router({})

authRouter.post('/login', loginValid, LoginController.loginUser)
authRouter.post('/registration', userValidator, LoginController.registerMe)
authRouter.post('/registration-confirmation', registrationCodeValid, LoginController.confirmRegistration)
authRouter.post('/registration-email-resending', LoginController.resendRegistrationConfirming)

authRouter.get('/me', checkBearer, LoginController.getMe)
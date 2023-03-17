import {Router} from "express";
import {loginValid} from "../validations/bodyValidations/auth/authValid";
import * as LoginController from "../controllers/authController";
import checkBearer from "../utils/auth/checkBearer";
import {userValidator} from "../validations/bodyValidations/user/userValidator";
import {registrationCodeValid} from "../validations/bodyValidations/auth/registrationCodeValid";
import handleErr from "../utils/handleErr";
import {emailValid} from "../validations/bodyValidations/auth/emailValid";
import {isCommentExists} from "../validations/checkOnExist/isUserConfirmedAlready";
import {isEmailOrLoginExists} from "../validations/checkOnExist/isEmailOrLoginExists";

export const authRouter = Router({})

authRouter.post('/login', loginValid, handleErr, LoginController.loginUser)
authRouter.post('/registration', isEmailOrLoginExists("email"), isEmailOrLoginExists("login"),
    userValidator, handleErr, LoginController.registerMe)
authRouter.post('/registration-confirmation', registrationCodeValid, handleErr, LoginController.confirmRegistration)
authRouter.post('/registration-email-resending', emailValid, isCommentExists, handleErr, LoginController.resendRegistrationConfirming)

authRouter.get('/me', checkBearer, LoginController.getMe)
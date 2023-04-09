import {Router} from "express";
import {loginValid} from "../validations/bodyValidations/auth/authValid";
import * as LoginController from "../controllers/authController";
import checkBearer from "../utils/auth/checkBearer";
import {userValidator} from "../validations/bodyValidations/user/userValidator";
import {registrationCodeValid} from "../validations/bodyValidations/auth/registrationCodeValid";
import handleErr from "../utils/handleErr";
import {emailValid} from "../validations/bodyValidations/auth/emailValid";
import {isEmailOrLoginExists} from "../validations/checkOnExist/isEmailOrLoginExists";
import {isUserConfirmedAlready} from "../validations/checkOnExist/isUserConfirmedAlready";
import {isRefreshTokenInBlackList} from "../utils/middlewares/isRefreshTokenInBlackList";
import {countAttemptsToRequest} from "../utils/middlewares/countAttemptsToRequest";
import {passAndCodeValid} from "../validations/bodyValidations/auth/passAndCodeValid";
import {isPassCodeValid} from "../validations/bodyValidations/auth/isPassCodeValid";

export const authRouter = Router({})

authRouter.post('/login', countAttemptsToRequest, loginValid,  handleErr, LoginController.loginUser)

authRouter.post('/registration', countAttemptsToRequest, isEmailOrLoginExists("email"), isEmailOrLoginExists("login"),
    userValidator, handleErr, LoginController.registerMe)
authRouter.post('/registration-confirmation', countAttemptsToRequest, registrationCodeValid, handleErr, LoginController.confirmRegistration)
authRouter.post('/registration-email-resending', countAttemptsToRequest, emailValid, isUserConfirmedAlready, handleErr, LoginController
    .resendRegistrationConfirming)
authRouter.post('/refresh-token', countAttemptsToRequest, isRefreshTokenInBlackList, LoginController.refreshMyToken)

authRouter.post("/password-recovery", countAttemptsToRequest, emailValid, handleErr, LoginController.recoverMyPassword)
authRouter.post("/new-password", countAttemptsToRequest, passAndCodeValid, isPassCodeValid, handleErr, LoginController.makeNewPassword)

authRouter.post('/logout', isRefreshTokenInBlackList, LoginController.logOut)

authRouter.get('/me', checkBearer, LoginController.getMe)
import {Router} from "express";
import {loginValid} from "../validations/bodyValidations/auth/authValid";
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
import {authController} from "../controllers/authController";

export const authRouter = Router({})

authRouter.post('/login', countAttemptsToRequest, loginValid,  handleErr, authController.loginUser)

authRouter.post('/registration', countAttemptsToRequest, isEmailOrLoginExists("email"), isEmailOrLoginExists("login"),
    userValidator, handleErr, authController.registerMe)
authRouter.post('/registration-confirmation', countAttemptsToRequest, registrationCodeValid, handleErr, authController.confirmRegistration)
authRouter.post('/registration-email-resending', countAttemptsToRequest, emailValid, isUserConfirmedAlready, handleErr, authController
    .resendRegistrationConfirming)
authRouter.post('/refresh-token', countAttemptsToRequest, isRefreshTokenInBlackList, authController.refreshMyToken)

authRouter.post("/password-recovery", countAttemptsToRequest, emailValid, handleErr, authController.recoverMyPassword)
authRouter.post("/new-password", countAttemptsToRequest, passAndCodeValid, isPassCodeValid, handleErr, authController.makeNewPassword)

authRouter.post('/logout', isRefreshTokenInBlackList, authController.logOut)

authRouter.get('/me', checkBearer, authController.getMe)
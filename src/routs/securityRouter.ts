import {Router} from "express";
import {checkForSameUser} from "../utils/middlewares/checkIfDeviceIsYours";
import {isRefreshTokenInBlackList} from "../utils/middlewares/isRefreshTokenInBlackList";
import {container} from "../compositionRoot";
import {SecurityController} from "../controllers/securityController";

export const securityRouter = Router({})

const securityController = container.resolve(SecurityController)

securityRouter.get('/devices', isRefreshTokenInBlackList, securityController.getAll.bind(securityController))

securityRouter.delete('/devices', isRefreshTokenInBlackList,
    securityController.deleteAllExceptActive.bind(securityController))
securityRouter.delete('/devices/:deviceId', isRefreshTokenInBlackList, checkForSameUser,
    securityController.deleteDeviceById.bind(securityController))
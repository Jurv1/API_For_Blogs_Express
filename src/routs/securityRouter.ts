import {Router} from "express";
import {checkForSameDevice, checkForSameUser, checkIfDeviceIsYours} from "../utils/middlewares/checkIfDeviceIsYours";
import {isRefreshTokenInBlackList} from "../utils/middlewares/isRefreshTokenInBlackList";
import {securityController} from "../controllers/securityController";

export const securityRouter = Router({})

securityRouter.get('/devices', isRefreshTokenInBlackList, securityController.getAll)

securityRouter.delete('/devices', isRefreshTokenInBlackList, securityController.deleteAllExceptActive)
securityRouter.delete('/devices/:deviceId', isRefreshTokenInBlackList, checkForSameUser, securityController.deleteDeviceById)
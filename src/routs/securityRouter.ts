import {Router} from "express";
import * as DeviceController from "../controllers/securityController"
import {checkIfDeviceIsYours} from "../utils/middlewares/checkIfDeviceIsYours";
import {isRefreshTokenInBlackList} from "../utils/middlewares/isRefreshTokenInBlackList";

export const securityRouter = Router({})

securityRouter.get('/devices', isRefreshTokenInBlackList, DeviceController.getAll)

securityRouter.delete('/devices', isRefreshTokenInBlackList, DeviceController.deleteAllExceptActive)
securityRouter.delete('/devices/:deviceId', isRefreshTokenInBlackList, checkIfDeviceIsYours, DeviceController.deleteDeviceById)
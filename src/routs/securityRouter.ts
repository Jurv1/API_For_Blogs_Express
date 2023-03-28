import {Router} from "express";
import * as DeviceController from "../controllers/securityController"

export const securityRouter = Router({})

securityRouter.get('/devices', DeviceController.getAll)

securityRouter.delete('/devices', DeviceController.deleteAllExceptActive)
securityRouter.delete('/devices/:deviceId', DeviceController.deleteDeviceById)
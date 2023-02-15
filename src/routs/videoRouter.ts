import {Router} from "express";
import * as VideoController from "../controllers/videoController";
import {videoValidation} from "../validations/videoValidation";
import handleErr from "../utils/handleErr";

export const videoRouter = Router({})

videoRouter.get('/', VideoController.getAllVideos)
videoRouter.get('/:id', VideoController.getOneVideo)

videoRouter.post('/', videoValidation, handleErr, VideoController.createOneVideo)

videoRouter.put('/:id',  videoValidation, handleErr, VideoController.updateOneVideo)

videoRouter.delete('/:id', VideoController.deleteOneVideo)
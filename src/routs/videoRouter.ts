import {Router} from "express";
import * as VideoController from "../controllers/videoController";
import {videoValidation} from "../validations/videoValidation";
import handleErr from "../utils/handleErr";

export const videoRouter = Router({})

videoRouter.get('/', VideoController.getAll)
videoRouter.get('/:id', VideoController.getOne)

videoRouter.post('/', videoValidation, handleErr, VideoController.createOne)

videoRouter.put('/:id',  videoValidation, handleErr, VideoController.updateOne)

videoRouter.delete('/:id', VideoController.deleteOne)
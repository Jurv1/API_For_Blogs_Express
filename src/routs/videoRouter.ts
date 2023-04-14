import {Router} from "express";
import {videoValidation} from "../validations/bodyValidations/video/videoValidation";
import handleErr from "../utils/handleErr";
import {videoService} from "../compositionRoot";

export const videoRouter = Router({})

videoRouter.get('/', videoService.getAllVideos.bind(videoService))
videoRouter.get('/:id', videoService.getOneVideo.bind(videoService))

videoRouter.post('/', videoValidation, handleErr, videoService.createOneVideo.bind(videoService))

videoRouter.put('/:id',  videoValidation, handleErr, videoService.updateOneVideo.bind(videoService))

videoRouter.delete('/:id', videoService.deleteOneVideo.bind(videoService))
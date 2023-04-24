import {Router} from "express";
import {videoValidation} from "../validations/bodyValidations/video/videoValidation";
import handleErr from "../utils/handleErr";
import {container} from "../compositionRoot";
import {VideoService} from "../services/videoService";

export const videoRouter = Router({})

export const videoService = container.resolve(VideoService)

videoRouter.get('/', videoService.getAllVideos.bind(videoService))
videoRouter.get('/:id', videoService.getOneVideo.bind(videoService))

videoRouter.post('/', videoValidation, handleErr, videoService.createOneVideo.bind(videoService))

videoRouter.put('/:id',  videoValidation, handleErr, videoService.updateOneVideo.bind(videoService))

videoRouter.delete('/:id', videoService.deleteOneVideo.bind(videoService))
import {Router} from "express";
import * as VideoRepository from "../services/videoService";
import {videoValidation} from "../validations/videoValidation";
import handleErr from "../utils/handleErr";

export const videoRouter = Router({})

videoRouter.get('/', VideoRepository.getAllVideos)
videoRouter.get('/:id', VideoRepository.getOneVideo)

videoRouter.post('/', videoValidation, handleErr, VideoRepository.createOneVideo)

videoRouter.put('/:id',  videoValidation, handleErr, VideoRepository.updateOneVideo)

videoRouter.delete('/:id', VideoRepository.deleteOneVideo)
import {Router} from "express";
import * as CommentController from "../controllers/commentController"
import checkBearer from "../utils/auth/checkBearer";
import {commentValid} from "../validations/commentValid";
import handleErr from "../utils/handleErr";

export const commentRouter = Router({})

commentRouter.get('/:id', CommentController.getOneById)

commentRouter.put('/:commentId', checkBearer, commentValid, handleErr, CommentController.updateOneById)

commentRouter.delete('/:id', checkBearer, CommentController.deleteOneById)
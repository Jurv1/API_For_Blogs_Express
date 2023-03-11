import {Router} from "express";
import * as CommentController from "../controllers/commentController"

export const commentRouter = Router({})

commentRouter.get('/:id', CommentController.getOneById)

commentRouter.put('/:commentId', CommentController.updateOneById)

commentRouter.delete('/:id', CommentController.deleteOneById)
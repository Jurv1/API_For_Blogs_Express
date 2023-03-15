import {Router} from "express";
import * as CommentController from "../controllers/commentController"
import checkBearer from "../utils/auth/checkBearer";
import {commentValid} from "../validations/bodyValidations/comment/commentValid";
import {checkWhoOwnerIs} from "../utils/middlewares/checkWhoOwnerIs"
import handleErr from "../utils/handleErr";
import {isCommentExists} from "../validations/checkOnExist/isCommentExists";

export const commentRouter = Router({})

commentRouter.get('/:id', CommentController.getOneById)

commentRouter.put('/:id', isCommentExists, handleErr, checkBearer, checkWhoOwnerIs, commentValid, handleErr, CommentController.updateOneById)

commentRouter.delete('/:id', isCommentExists, handleErr, checkBearer, checkWhoOwnerIs, CommentController.deleteOneById)
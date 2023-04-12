import {Router} from "express";
import checkBearer from "../utils/auth/checkBearer";
import {commentValid} from "../validations/bodyValidations/comment/commentValid";
import {checkWhoOwnerIs} from "../utils/middlewares/checkWhoOwnerIs"
import handleErr from "../utils/handleErr";
import {isCommentExists} from "../validations/checkOnExist/isCommentExists";
import {commentController} from "../controllers/commentController";

export const commentRouter = Router({})

commentRouter.get('/:id', commentController.getOneById)

commentRouter.put('/:id', isCommentExists, handleErr, checkBearer, checkWhoOwnerIs, commentValid, handleErr, commentController.updateOneById)

commentRouter.delete('/:id', isCommentExists, handleErr, checkBearer, checkWhoOwnerIs, commentController.deleteOneById)
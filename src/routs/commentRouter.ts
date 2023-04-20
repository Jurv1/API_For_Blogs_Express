import {Router} from "express";
import checkBearer from "../utils/auth/checkBearer";
import {commentValid} from "../validations/bodyValidations/comment/commentValid";
import {checkWhoOwnerIs} from "../utils/middlewares/checkWhoOwnerIs"
import handleErr from "../utils/handleErr";
import {isCommentExists} from "../validations/checkOnExist/isCommentExists";
import {commentController} from "../compositionRoot";
import {likeValid} from "../validations/bodyValidations/comment/likeValid";
import {checkToken} from "../utils/middlewares/checkToken";

export const commentRouter = Router({})

commentRouter.get('/:id', checkToken, commentController.getOneById.bind(commentController))

commentRouter.put('/:id', isCommentExists, handleErr, checkBearer, checkWhoOwnerIs, commentValid, handleErr,
    commentController.updateOneById.bind(commentController))
commentRouter.put("/:id/like-status", checkBearer, likeValid, isCommentExists, handleErr,
    commentController.likeComment.bind(commentController))

commentRouter.delete('/:id', isCommentExists, handleErr, checkBearer, checkWhoOwnerIs,
    commentController.deleteOneById.bind(commentController))
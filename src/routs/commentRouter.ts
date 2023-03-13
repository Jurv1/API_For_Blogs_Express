import {Router} from "express";
import * as CommentController from "../controllers/commentController"
import checkBearer from "../utils/auth/checkBearer";
import {commentValid} from "../validations/commentValid";
import {checkWhoOwnerIs} from "../utils/middlewares/checkWhoOwnerIs"
import handleErr from "../utils/handleErr";

export const commentRouter = Router({})

commentRouter.get('/:id', CommentController.getOneById)

commentRouter.put('/:id', checkBearer, checkWhoOwnerIs, commentValid, handleErr, CommentController.updateOneById)

commentRouter.delete('/:id', checkBearer, checkWhoOwnerIs, CommentController.deleteOneById)
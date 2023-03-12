import {Router} from "express";
import * as PostController from "../controllers/postController";
import checkAuth from "../utils/auth/checkAuth";
import {postValidation} from "../validations/postValidator";
import handleErr from "../utils/handleErr";
import checkBearer from "../utils/auth/checkBearer";
import {commentValid} from "../validations/commentValid";

export const postRouter = Router({})

postRouter.get('/', PostController.getAll)
postRouter.get('/:id', PostController.getOne)
postRouter.get('/:postId/comments', PostController.getAllCommentsByPostId)


postRouter.post('/', checkAuth, postValidation, handleErr,  PostController.createOne)
postRouter.post('/:postId/comments', checkBearer, commentValid, handleErr, PostController.createOneCommentByPostId)

postRouter.put('/:id', checkAuth, postValidation, handleErr, PostController.updateOne)

postRouter.delete('/:id', checkAuth, PostController.deleteOne)
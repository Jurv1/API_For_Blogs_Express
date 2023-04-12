import {Router} from "express";
import checkAuth from "../utils/auth/checkAuth";
import {postValidation} from "../validations/bodyValidations/post/postValidator";
import handleErr from "../utils/handleErr";
import checkBearer from "../utils/auth/checkBearer";
import {commentValid} from "../validations/bodyValidations/comment/commentValid";
import {postController} from "../controllers/postController";

export const postRouter = Router({})

postRouter.get('/', postController.getAll)
postRouter.get('/:id', postController.getOne)
postRouter.get('/:postId/comments', postController.getAllCommentsByPostId)


postRouter.post('/', checkAuth, postValidation, handleErr,  postController.createOne)
postRouter.post('/:postId/comments', checkBearer, commentValid, handleErr, postController.createOneCommentByPostId)

postRouter.put('/:id', checkAuth, postValidation, handleErr, postController.updateOne)

postRouter.delete('/:id', checkAuth, postController.deleteOne)
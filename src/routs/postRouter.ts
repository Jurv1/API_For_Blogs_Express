import {Router} from "express";
import checkAuth from "../utils/auth/checkAuth";
import {postValidation} from "../validations/bodyValidations/post/postValidator";
import handleErr from "../utils/handleErr";
import checkBearer from "../utils/auth/checkBearer";
import {commentValid} from "../validations/bodyValidations/comment/commentValid";
import {postController} from "../controllers/postController";

export const postRouter = Router({})

postRouter.get('/', postController.getAll.bind(postController))
postRouter.get('/:id', postController.getOne.bind(postController))
postRouter.get('/:postId/comments', postController.getAllCommentsByPostId.bind(postController))


postRouter.post('/', checkAuth, postValidation, handleErr,  postController.createOne.bind(postController))
postRouter.post('/:postId/comments', checkBearer, commentValid, handleErr,
    postController.createOneCommentByPostId.bind(postController))

postRouter.put('/:id', checkAuth, postValidation, handleErr, postController.updateOne.bind(postController))

postRouter.delete('/:id', checkAuth, postController.deleteOne.bind(postController))
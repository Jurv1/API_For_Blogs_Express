import {Router} from "express";
import * as PostController from "../controllers/postController";
import checkAuth from "../utils/checkAuth";
import {postValidation} from "../validations/postValidator";
import handleErr from "../utils/handleErr";

export const postRouter = Router({})

postRouter.get('/', PostController.getAllPosts)
postRouter.get('/:id', PostController.getOnePost)

postRouter.post('/', checkAuth, postValidation, handleErr,  PostController.createOnePost)

postRouter.put('/:id', checkAuth, postValidation, handleErr, PostController.updateOnePost)

postRouter.delete('/:id', checkAuth, PostController.deleteOnePost)
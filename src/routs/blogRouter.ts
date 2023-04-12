import {Router} from "express";
import * as BlogController from "../controllers/blogController";
import checkAuth from "../utils/auth/checkAuth";
import {blogValidation} from "../validations/bodyValidations/blog/blogValidator";
import handleErr from "../utils/handleErr";
import {postValid} from "../validations/bodyValidations/post/postValidator";
import {blogController} from "../controllers/blogController";
import {postController} from "../controllers/postController";

export const blogRouter = Router({})

blogRouter.get('/', blogController.getAll)
blogRouter.get('/:id', blogController.getOne)
blogRouter.get('/:blogId/posts', postController.getPostsByBlogId)

blogRouter.post('/', checkAuth, blogValidation, handleErr, blogController.createOne)
blogRouter.post('/:blogId/posts', checkAuth, postValid, handleErr, postController.createOneByBlogId)

blogRouter.put('/:id', checkAuth, blogValidation, handleErr, blogController.updateOne)

blogRouter.delete('/:id', checkAuth, blogController.deleteOne)

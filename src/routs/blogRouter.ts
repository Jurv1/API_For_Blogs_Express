import {Router} from "express";
import checkAuth from "../utils/auth/checkAuth";
import {blogValidation} from "../validations/bodyValidations/blog/blogValidator";
import handleErr from "../utils/handleErr";
import {postValid} from "../validations/bodyValidations/post/postValidator";
import {blogController} from "../controllers/blogController";
import {postController} from "../controllers/postController";

export const blogRouter = Router({})

blogRouter.get('/', blogController.getAll.bind(blogController))
blogRouter.get('/:id', blogController.getOne.bind(blogController))
blogRouter.get('/:blogId/posts', postController.getPostsByBlogId.bind(postController))

blogRouter.post('/', checkAuth, blogValidation, handleErr, blogController.createOne.bind(blogController))
blogRouter.post('/:blogId/posts', checkAuth, postValid, handleErr, postController.createOneByBlogId.bind(postController))

blogRouter.put('/:id', checkAuth, blogValidation, handleErr, blogController.updateOne.bind(blogController))

blogRouter.delete('/:id', checkAuth, blogController.deleteOne.bind(blogController))

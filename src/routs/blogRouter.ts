import {Router} from "express";
import * as BlogController from "../controllers/blogController";
import { getPostsByBlogId, createOneByBlogId } from "../controllers/postController"
import checkAuth from "../utils/checkAuth";
import {blogValidation} from "../validations/blogValidator";
import handleErr from "../utils/handleErr";
import {postValid} from "../validations/postValidator";

export const blogRouter = Router({})

blogRouter.get('/', BlogController.getAll)
blogRouter.get('/:id', BlogController.getOne)
blogRouter.get('/:blogId/posts', getPostsByBlogId)

blogRouter.post('/', checkAuth, blogValidation, handleErr, BlogController.createOne)
blogRouter.post('/:blogId/posts', checkAuth, postValid, handleErr, createOneByBlogId)

blogRouter.put('/:id', checkAuth, blogValidation, handleErr, BlogController.updateOne)

blogRouter.delete('/:id', checkAuth, BlogController.deleteOne)

blogRouter.get('/s', BlogController.getSortedByName)
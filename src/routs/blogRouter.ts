import {Router} from "express";
import * as BlogController from "../controllers/blogController";
import checkAuth from "../utils/checkAuth";
import {blogValidation} from "../validations/blogValidator";
import handleErr from "../utils/handleErr";
import {Request, Response} from "express";
import { Blog } from "../schemas/blogSchemas";

export const blogRouter = Router({})

blogRouter.get('/', BlogController.getAllBlogs)
blogRouter.get('/:id', BlogController.getOneBlog)

blogRouter.post('/', checkAuth, blogValidation, handleErr, BlogController.createOneBlog)

blogRouter.put('/:id', checkAuth, blogValidation, handleErr, BlogController.updateOneBlog)

blogRouter.delete('/:id', checkAuth, BlogController.deleteOneBlog)
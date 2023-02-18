import {Router} from "express";
import * as BlogController from "../controllers/blogController";
import checkAuth from "../utils/checkAuth";
import {blogValidation} from "../validations/blogValidator";
import handleErr from "../utils/handleErr";

export const blogRouter = Router({})

blogRouter.get('/', BlogController.getAll)
blogRouter.get('/:id', BlogController.getOne)

blogRouter.post('/', checkAuth, blogValidation, handleErr, BlogController.createOne)

blogRouter.put('/:id', checkAuth, blogValidation, handleErr, BlogController.updateOne)

blogRouter.delete('/:id', checkAuth, BlogController.deleteOne)
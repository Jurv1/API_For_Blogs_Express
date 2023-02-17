import { body } from "express-validator";
import { CustomValidator } from "express-validator/src/base";
import {blogsRepository} from "../repositories/blogsRepository";
export const findByIdBlogs : CustomValidator = async value => {
    const foundBlog = await blogsRepository.getOne(value);
    if (!foundBlog) {
        throw new Error('not blogId')
    }
};

export const postValidation = [
    body('title').exists().bail()
        .trim().isLength({min: 1, max: 30}).bail()
            .isString(),
    body('shortDescription').exists().bail()
        .trim().isLength({min: 1, max: 100}).bail()
            .isString(),
    body('content').exists().bail()
        .trim().isLength({min: 1, max: 1000}).bail()
            .isString(),
    body('blogId').exists().bail()
        .trim().isString().custom(findByIdBlogs),
    body('blogName').trim().optional().isString(),
    body('createdAt').optional().matches(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/)
]
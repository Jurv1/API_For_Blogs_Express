import { body } from "express-validator";
import { CustomValidator } from "express-validator/src/base";
import * as BlogQueryRepo from "../../../repositories/queryRepository/blogQ/blogQ"
const checkBlogId : CustomValidator = async value => {
    const foundedEl = await BlogQueryRepo.getOneBlog(value);
    if (!foundedEl) {
        throw new Error('no such Blog')
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
        .trim().isString().custom(checkBlogId),
    body('blogName').trim().optional().isString(),
    body('createdAt').optional().matches(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/)
]

export const postValid = [
    body('title').exists().bail()
        .trim().isLength({min: 1, max: 30}).bail()
        .isString(),
    body('shortDescription').exists().bail()
        .trim().isLength({min: 1, max: 100}).bail()
        .isString(),
    body('content').exists().bail()
        .trim().isLength({min: 1, max: 1000}).bail()
        .isString(),
    body('blogName').trim().optional().isString(),
    body('createdAt').optional().matches(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/)
]
import {Request, Response} from "express";
import {FinalDBPost} from "../schemas/dbSchemas/PostDBSchema";
import {mapPost} from "../utils/mappers/postMapper";
import {SortDirection} from "mongodb";
import {queryValidator} from "../utils/queryValidators/sortQueryValidator";
import {filterQueryValid} from "../utils/queryValidators/filterQueryValid";
import {makePagination} from "../utils/paggination/paggination";
import {FinalDBComment} from "../schemas/dbSchemas/CommentDBSchema";
import {mapComment} from "../utils/mappers/commentMapper";
import {PostQ} from "../repositories/queryRepository/postQ/postQ";
import {PostService} from "../services/postService";

//todo сделать функцию для трай кэтч (вынести обертку в фун-ию)

class PostController {
    private postService: PostService;
    private postQ: PostQ;
    constructor() {
        this.postQ = new PostQ()
        this.postService = new PostService()
    }
    async getAll(req: Request<{}, {}, {}, {
        searchNameTerm: string, sortBy: string,
        sortDirection: SortDirection, pageNumber: string, pageSize: string
    }>, res: Response) {

        let {searchNameTerm, sortBy, sortDirection, pageNumber, pageSize} = req.query

        const sort = queryValidator(sortBy, sortDirection)
        const filter = filterQueryValid(searchNameTerm)
        const pagination = makePagination(pageNumber, pageSize)

        try {
            const allPosts = await this.postQ.getAllPosts(filter, sort, pagination)
            if (allPosts.items.length === 0) {
                res.sendStatus(404)
                return
            }

            res.status(200).send(allPosts)

        } catch (err) {
            console.log(err)
            res.status(404).json({
                message: "Can't find el"
            })
        }
    }

    async getOne(req: Request, res: Response) {
        try {
            const id = req.params.id
            const result = await this.postQ.getOnePost(id)
            if (result) {
                res.status(200).send(mapPost(result));
            } else {
                res.sendStatus(404)
            }
        } catch (err) {
            res.status(404).json({
                message: "Can't find el"
            })
        }
    }

    async getPostsByBlogId(req: Request<{
        blogId: string;
    }, {}, {}, {
        searchNameTerm: string, sortBy: string,
        sortDirection: SortDirection, pageNumber: string, pageSize: string
    }>, res: Response) {
        const id = req.params.blogId
        let {sortBy, sortDirection, pageNumber, pageSize} = req.query

        const sort = queryValidator(sortBy, sortDirection)
        const pagination = makePagination(pageNumber, pageSize)

        try {
            const allPosts = await this.postQ.getAllPostsByBlogId(id, sort, pagination)

            if (allPosts.items.length === 0) {
                res.sendStatus(404)
                return

            }

            res.status(200).send(allPosts)

        } catch (err) {
            console.log(err)
            res.status(404).json({
                message: "Can't find el"
            })
        }
    }

    async getAllCommentsByPostId(req: Request<{ postId: string }, {}, {}, {
        sortBy: string,
        sortDirection: SortDirection, pageNumber: string, pageSize: string
    }>, res: Response) {

        const postId = req.params.postId

        const {sortBy, sortDirection, pageNumber, pageSize} = req.query

        const sort = queryValidator(sortBy, sortDirection)
        const pagination = makePagination(pageNumber, pageSize)

        try {

            const allComments = await this.postQ.getAllCommentsByPostId(postId, sort, pagination)
            if (allComments.items.length === 0) {
                res.sendStatus(404)
                return
            }
            res.status(200).send(allComments)

        } catch (err) {
            console.log(err)
            res.status(404).json({
                message: "Can't find el"
            })
        }
    }

    async createOne(req: Request, res: Response) {
        try {
            const id = (+(new Date())).toString()
            const {title, shortDescription, content, blogId, blogName, createdAt} = req.body
            const result: FinalDBPost | null = await this.postService.createOnePost(id, title, shortDescription,
                content, blogId, blogName, createdAt)
            result ? res.status(201).send(mapPost(result)) : res.status(400).json({
                errorsMessages: [
                    {
                        message: "No such blog",
                        field: "blogId"
                    }
                ]
            })

        } catch (err) {
            console.log(err)
            res.status(404).json({
                message: "Can't find el"
            })
        }
    }

    async createOneByBlogId(req: Request, res: Response) {
        const blogId = req.params.blogId
        const {title, shortDescription, content} = req.body
        try {
            const result: FinalDBPost | null = await this.postService.createOnePostByBlogId(title, shortDescription, content, blogId)
            result ? res.status(201).send(mapPost(result)) : res.status(404).json({
                errorsMessages: [
                    {
                        message: "No such blog",
                        field: "blogId"
                    }
                ]
            })
        } catch (err) {
            console.log(err)
            res.status(404).json({
                message: "Can't find el"
            })
        }
    }

    async createOneCommentByPostId(req: Request, res: Response) {
        const postId = req.params.postId
        const content = req.body.content
        const userId = req.user!._id.toString()
        const userLogin = req.user!.accountData.login

        try {
            const result: FinalDBComment | null = await this.postService.createOneCommentByPostId(postId, content, userId, userLogin)
            result ? res.status(201).send(mapComment(result)) : res.status(404).json({
                errorsMessages: [
                    {
                        message: "No such post",
                        field: "postId"
                    }
                ]
            })
        } catch (err) {
            console.log(err)
            res.status(404).json({
                message: "Can't find el"
            })
        }
    }

    async updateOne(req: Request, res: Response) {
        try {
            const id = req.params.id
            const {title, shortDescription, content, blogId,} = req.body
            let result = await this.postService.updateOnePost(id, title, shortDescription, content, blogId,)
            if (!result) {
                res.status(404).json({
                    message: "Not good"
                })
                return
            }
            //const el = await PostService.getOnePost(id)
            res.sendStatus(204)
        } catch (err) {
            console.log(err)
            res.status(404).json({
                message: "Can't find el"
            })
        }

    }

    async deleteOne(req: Request, res: Response) {
        try {
            const id = req.params.id
            const result = await this.postService.deleteOnePost(id)
            if (!result) return res.send(404)
            res.send(204)

        } catch (err) {
            console.log(err)
            res.status(404).json({
                message: "Can't find el"
            })
        }
    }
}

export const postController = new PostController()
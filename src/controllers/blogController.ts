import {Request, Response} from "express";
import {viewBlogModel} from "../schemas/presentationSchemas/blogSchemas";
import {FinalDBBlog} from "../schemas/dbSchemas/BlogDBSchema";
import {mapBlog} from "../utils/mappers/blogMapper";
import {queryValidator} from "../utils/queryValidators/sortQueryValidator";
import {filterQueryValid} from "../utils/queryValidators/filterQueryValid";
import {makePagination} from "../utils/paggination/paggination";
import {SortOrder} from "mongoose";
import {BlogQ} from "../repositories/queryRepository/blogQ/blogQ";
import {BlogService} from "../services/blogService";
import {injectable} from "inversify";

@injectable()
export class BlogController {
    constructor( protected blogService: BlogService,  protected blogQ: BlogQ) {}
    async getAll(req: Request<{}, {}, {}, {
        searchNameTerm: string, sortBy: string,
        sortDirection: SortOrder, pageNumber: string, pageSize: string
    }>, res: Response) {

        let {searchNameTerm, sortBy, sortDirection, pageNumber, pageSize} = req.query

        const filter = filterQueryValid(searchNameTerm)
        const sort = queryValidator(sortBy, sortDirection)
        const pagination = makePagination(pageNumber, pageSize)

        try {
            const allBlogs = await this.blogQ.getAllBlogs(filter, sort, pagination)
            if (allBlogs.items.length === 0) {
                res.sendStatus(404)
                return
            }
            res.status(200).send(allBlogs)
        } catch (err) {
            res.status(404).json({
                message: "Can't find el"
            })
        }
    }

    async getOne(req: Request, res: Response) {

        const id = req.params.id

        try {
            const result = await this.blogQ.getOneBlog(id)
            result ? res.status(200).send(mapBlog(result)) : res.sendStatus(404)
        } catch (err) {
            res.status(404).json({
                message: "Can't find el"
            })
        }
    }

    async createOne(req: Request, res: Response) {

        const {name, description, websiteUrl} = req.body

        try {
            let result: FinalDBBlog | null = await this.blogService.createOneBlog(name, description, websiteUrl)
            if (result) {
                const viewBlog: viewBlogModel = mapBlog(result)
                res.status(201).send(viewBlog)
            } else res.status(404).json({
                message: "Can't find el"
            })
        } catch (err) {
            console.log(err)
            res.status(404).json({
                message: "Can't find el"
            })
        }
    }

    async updateOne(req: Request, res: Response) {

        const id = req.params.id
        const {name, description, websiteUrl} = req.body

        try {
            const result = await this.blogService.updateOneBlog(id, name, description, websiteUrl)
            if (!result) {
                res.status(404).json({
                    message: "NOT OK"
                })
                return
            }

            res.sendStatus(204)

        } catch (err) {
            console.log(err)
            res.status(404).json({
                message: "Can't find el"
            })
        }

    }

    async deleteOne(req: Request, res: Response) {
        const id = req.params.id
        try {

            const result = await this.blogService.deleteOneBlog(id)
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

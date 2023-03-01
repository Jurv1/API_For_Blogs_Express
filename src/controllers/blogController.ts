import {Request, Response} from "express";
import * as BlogService from "../services/blogService";
import {viewBlogModel} from "../schemas/presentationSchemas/blogSchemas";
import {DBBlog, FinalDBBlog} from "../schemas/dbSchemas/BlogDBSchema";
import {mapBlog, mapBlogs} from "../utils/mappers/blogMapper";
import {blogsRepository} from "../repositories/blogsRepository";
import {queryValidator} from "../utils/queryValidators/blogQueryValidator";
import {SortDirection} from "mongodb";

export async function getAll (req: Request<{}, {}, {}, {searchNameTerm: string, sortBy: string,
    sortDirection: SortDirection, pageNumber: string, pageSize: string}>, res: Response){

    let {searchNameTerm, sortBy, sortDirection, pageNumber, pageSize} = req.query
    const query = queryValidator(searchNameTerm, sortBy, sortDirection, pageNumber, pageSize)

    try {
        console.log(query)
        const allBlogs = await BlogService.getAllBlogs(query)
        allBlogs ? res.status(200).send(allBlogs) : res.sendStatus(404)
    } catch (err){
        res.status(404).json({
            message: "Can't find el"
        })
    }
}

export async function getOne (req: Request, res: Response){

    const id = req.params.id

    try {
        const result = await BlogService.getOneBlog(id)
        result ? res.status(200).send(mapBlog(result)) : res.sendStatus(404)
    } catch (err){
        res.status(404).json({
            message: "Can't find el"
        })
    }
}

export async function createOne (req: Request, res: Response){

    const {name, description, websiteUrl} = req.body

    try {
        let result: FinalDBBlog | null = await BlogService.createOneBlog( name, description, websiteUrl)
        if(result)  {
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

export async function updateOne (req: Request, res: Response){

    const id = req.params.id
    const {name, description, websiteUrl} = req.body

    try {
        const result = await BlogService.updateOneBlog(id, name, description, websiteUrl)
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

export async function deleteOne (req: Request, res: Response){
    const id = req.params.id
    try {

        const result = await BlogService.deleteOneBlog(id)
        if (!result) return res.send(404)
        res.send(204)

    } catch (err) {

        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })

    }
}

export async function getSortedByName(req: Request, res: Response){
    try {
        const {sortString} = req.query

        const result = await blogsRepository.getSort("c")
        res.status(200).send(result)
    } catch (err){

        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })

    }
}


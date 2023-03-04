import {Request, Response} from "express";
import * as PostService from "../services/postService";
import * as PostQueryRepo from "../repositories/queryRepository/postQ/postQ"
import {FinalDBPost} from "../schemas/dbSchemas/PostDBSchema";
import {mapPost} from "../utils/mappers/postMapper";
import {SortDirection} from "mongodb";
import {queryValidator} from "../utils/queryValidators/sortQueryValidator";
import {filterQueryValid} from "../utils/queryValidators/filterQueryValid";
import {makePagination} from "../utils/paggination/paggination";

//todo вынести синхронку
//todo сделать функцию для трай кэтч (вынести обертку в фун-ию)

export async function getAll (req: Request<{}, {}, {}, {searchNameTerm: string, sortBy: string,
    sortDirection: SortDirection, pageNumber: string, pageSize: string}>, res: Response){

    let {searchNameTerm, sortBy, sortDirection, pageNumber, pageSize} = req.query

    const sort = queryValidator(sortBy, sortDirection)
    const filter = filterQueryValid(searchNameTerm)
    const pagination = makePagination(pageNumber, pageSize)

    try {
        const allPosts = await PostQueryRepo.getAllPosts(filter, sort, pagination)
        allPosts ? res.status(200).send(allPosts) : res.sendStatus(404)
    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })
    }
}

export async function getOne (req: Request, res: Response){
    try {
        const id = req.params.id
        const result = await PostQueryRepo.getOnePost(id)
        if (result) {
            res.status(200).send(mapPost(result));
        } else {
            res.sendStatus(404)
        }
    } catch (err){
        res.status(404).json({
            message: "Can't find el"
        })
    }
}

export async function getPostsByBlogId(req: Request<{
    blogId: string;
}, {}, {}, {searchNameTerm: string, sortBy: string,
    sortDirection: SortDirection, pageNumber: string, pageSize: string}>, res: Response){
    const id = req.params.blogId
    let {searchNameTerm, sortBy, sortDirection, pageNumber, pageSize} = req.query

    const sort = queryValidator(sortBy, sortDirection)
    const pagination = makePagination(pageNumber, pageSize)

    try {
        const allPosts = await PostQueryRepo.getAllPostsByBlogId(id, sort, pagination)

        if(allPosts.items.length === 0){
            res.sendStatus(404)
            return
        }

        res.status(200).send(allPosts)

    }catch (err){
        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })
    }
}

export async function createOne (req: Request, res: Response){
    try {
        const id = (+(new Date())).toString()
        const {title, shortDescription, content, blogId, blogName, createdAt} = req.body
        const result: FinalDBPost|null = await PostService.createOnePost(id, title, shortDescription,
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

export async function createOneByBlogId (req: Request, res: Response) {
    const blogId = req.params.blogId
    const {title, shortDescription, content} = req.body
    try {
        const result: FinalDBPost|null = await PostService.createOnePostByBlogId(title, shortDescription, content, blogId)
        result ? res.status(201).send(mapPost(result)) : res.status(404).json({
            errorsMessages: [
                {
                    message: "No such blog",
                    field: "blogId"
                }
            ]
        })
    } catch (err){
        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })
    }
}

export async function updateOne (req: Request, res: Response){
    try {
        const id = req.params.id
        const {title, shortDescription, content, blogId,  } = req.body
        let result = await PostService.updateOnePost(id, title, shortDescription, content, blogId, )
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

export async function deleteOne (req: Request, res: Response){
    try {
        const id = req.params.id
        const result = await PostService.deleteOnePost(id)
        if (!result) return res.send(404)
        res.send(204)

    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "Can't find el"
        })
    }
}


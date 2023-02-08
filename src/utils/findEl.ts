import {Request, Response} from "express";
import {Video} from "../schemas/videoSchemas";
import {Post} from "../schemas/postSchemas";
import {Blog} from "../schemas/blogSchemas";

export default (req: Request, res: Response, collection: Video[]|Post[]|Blog[] ) => {
    const id = req.params.id
    // @ts-ignore
    const foundedEl = collection.find(el => el?.id === +id)
    if (foundedEl) {
        res.status(200).send(foundedEl)
        return;
    }
    res.status(404).send("Not OK")
}
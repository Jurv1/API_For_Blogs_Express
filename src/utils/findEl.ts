// import {Request, Response} from "express";
// import {Video} from "../schemas/videoSchemas";
// import {Post} from "../schemas/postSchemas";
// import {Blog} from "../schemas/blogSchemas";
// import {client} from "../db/db";
// //Video[]|Post[]|Blog[]
// export default async (req: Request, res: Response, collection: string ): Promise<Video|Post|Blog|null> => {
//     const id = req.params.id
//     const foundedEl = await client.db("platform").collection(`${collection}`).findOne({ id: id }, {projection: {_id: 0}})
//     //const foundedEl = collection.find(el => el?.id == id)
//     if (foundedEl) {
//         return foundedEl;
//     } else {
//         return null
//     }
//     res.status(404).send("Not OK")
// }
//изменить фун-ию ()
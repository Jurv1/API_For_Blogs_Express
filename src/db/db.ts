import { MongoClient } from "mongodb";
import {Blog} from "../schemas/blogSchemas";
import {Post} from "../schemas/postSchemas";
import {Video} from "../schemas/videoSchemas";

import * as dotenv from 'dotenv'
dotenv.config()

const mongoURI = process.env.MONGO_URI
console.log(mongoURI)
if (!mongoURI){
    throw new Error("No URL")
}
export const client = new MongoClient(mongoURI)
export async function runDb(){
    try {
        await client.connect()
        await client.db("products").command({ ping: 1 })
        console.log("DB OK")
    } catch (err){
        await client.close()
    }
}

export const blogDBController = client.db().collection<Blog>("blogs")
export const postDBController = client.db().collection<Post>("posts")
export const videoDBController = client.db().collection<Video>("videos")
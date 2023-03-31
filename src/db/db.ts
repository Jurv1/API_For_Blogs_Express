import { MongoClient } from "mongodb";
import {DBBlog} from "../schemas/dbSchemas/BlogDBSchema";
import {Video} from "../schemas/presentationSchemas/videoSchemas";

import * as dotenv from 'dotenv'
import {DBPost} from "../schemas/dbSchemas/PostDBSchema";
import {DBUser} from "../schemas/dbSchemas/UserDBSchema";
import {DBComment} from "../schemas/dbSchemas/CommentDBSchema";
import {DBDevice} from "../schemas/dbSchemas/DeviceDBSchema";
import {Attempt} from "../schemas/presentationSchemas/attemptSchema";
dotenv.config()

const mongoURI = "mongodb://localhost:27017"


//process.env.MONGO_URI

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

export const blogDBController = client.db().collection<DBBlog>("blogs")
export const postDBController = client.db().collection<DBPost>("posts")
export const videoDBController = client.db().collection<Video>("videos")
export const userDBController = client.db().collection<DBUser>("users")
export const commentDBController = client.db().collection<DBComment>("comments")
export const refreshTokensDBController = client.db().collection("refreshTokens")
export const devicesDBController = client.db().collection<DBDevice>("devices")
export const attemptsDBController = client.db().collection<Attempt>("attempts")
import express from 'express'
import bodyParser from "body-parser";
import cors from 'cors'

import * as VideoController from "./controllers/videoController";
import * as BlogController from "./controllers/blogController";
import * as PostController from "./controllers/postController";
import * as testingController from "./controllers/testingController"

import {createVideoValid} from "./validations/createVideoValid";
import {updateVideoValid} from "./validations/updateVideoValid";

import { postValidation } from "./validations/postValidator"
import { blogValidation } from "./validations/blogValidator"
import { videoValidation } from "./validations/videoValidation";

import checkAuth from './utils/checkAuth.js'
import handleErr from "./utils/handleErr";

const app = express()
const port = 3003

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)
const allowedOrigins = ['http://localhost:3003'];

const options: cors.CorsOptions = {
    origin: allowedOrigins
};

// Then pass these options to cors:
app.use(cors(options));


app.get('/', VideoController.getStart)

app.get('/videos', VideoController.getAll)
app.get('/videos/:id', VideoController.getOne)

app.post('/videos', videoValidation, handleErr, VideoController.createOne)

app.put('/videos/:id',  videoValidation, handleErr, VideoController.updateOne)

app.delete('/videos/:id', VideoController.deleteOne)

app.get('/blogs', BlogController.getAll)
app.get('/blogs/:id', BlogController.getOne)
app.post('/blogs', checkAuth, blogValidation, handleErr, BlogController.createOne)
app.put('/blogs/:id', checkAuth, blogValidation, handleErr, BlogController.updateOne)
app.delete('/blogs/:id', checkAuth, BlogController.deleteOne)

app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postValidation, handleErr,  PostController.createOne)
app.put('/posts/:id', checkAuth, postValidation, handleErr, PostController.updateOne)
app.delete('/posts/:id', checkAuth, PostController.deleteOne)

app.delete('/testing/all-data', testingController.deleteAll)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
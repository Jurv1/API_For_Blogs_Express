import express from 'express'
import bodyParser from "body-parser";
import cors from 'cors'

import * as VideoController from "./controllers/videoController";
import * as testingController from "./controllers/testingController"

import {postRouter} from "./routs/postRouter";
import {blogRouter} from "./routs/blogRouter";
import {videoRouter} from "./routs/videoRouter";

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

app.use('/videos', videoRouter)
app.use('/blogs', blogRouter)
app.use('/posts', postRouter)

app.delete('/testing/all-data', testingController.deleteAll)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
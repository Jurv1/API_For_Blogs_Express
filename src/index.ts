import express from 'express'
import bodyParser from "body-parser";
import cors from 'cors'
import cookieParser from "cookie-parser";
import * as testingController from "./services/testingService"

import {postRouter} from "./routs/postRouter";
import {blogRouter} from "./routs/blogRouter";
import {videoRouter} from "./routs/videoRouter";
import {runDb} from "./db/db";
import {userRouter} from "./routs/userRouter";
import {authRouter} from "./routs/authRouter";
import {commentRouter} from "./routs/commentRouter";
import {securityRouter} from "./routs/securityRouter";
import {videoService} from "./services/videoService";

export const app = express()
const port = 3003

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)
const allowedOrigins = ['http://localhost:3003'];

const options: cors.CorsOptions = {
    origin: allowedOrigins
};

// Then pass these options to cors:
app.use(cors(options))
app.use(cookieParser())

app.set('trust proxy', true)

app.get('/', videoService.getStart)

app.use('/videos', videoRouter)

app.use('/blogs', blogRouter)

app.use('/posts', postRouter)

app.use('/users', userRouter)

app.use('/auth', authRouter)

app.use('/comments', commentRouter)

app.use('/security', securityRouter)

app.delete('/testing/all-data', testingController.deleteAll)

const startApp = async () => {
    await runDb()
    app.listen(port,  () => {
        console.log(`Example app listening on port ${port}`)
    })
}

startApp()
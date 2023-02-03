import express from 'express'
import bodyParser from "body-parser";
import cors from 'cors'
import {videoValidation} from "./validations/videoValidation";
import * as VideoController from "./controllers/videoController";
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



app.get('/videos', VideoController.getAll)
app.get('/videos/:id', VideoController.getOne)

app.post('/videos',  videoValidation, handleErr, VideoController.createOne)

app.put('/videos/:id', videoValidation, handleErr, VideoController.updateOne)

app.delete('/videos/:id', VideoController.deleteOne)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
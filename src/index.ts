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


app.get('/', VideoController.getStart)
app.get('/api/videos', VideoController.getAll)
app.get('/api/videos/:id', VideoController.getOne)

app.post('/api/videos', VideoController.createOne)

app.put('/api/videos/:id', VideoController.updateOne)

app.delete('/api/videos/:id', VideoController.deleteOne)
app.delete('/api/testing/all-data', VideoController.deleteAll)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
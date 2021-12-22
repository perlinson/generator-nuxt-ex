import mongoose from './services/mongoose'
import express from './services/express'
import api from './api'

const app = express('', api)
// const server = http.createServer(app)

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_ALTA_USER}:${process.env.MONGO_ALTA_PWD}@cluster0.gysem.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
)
mongoose.Promise = Promise

export default app

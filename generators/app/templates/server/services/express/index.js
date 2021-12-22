import express from 'express'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import { errorHandler as queryErrorHandler } from 'querymen'
import { errorHandler as bodyErrorHandler } from 'bodymen'
// import { env } from '../../config'

export default (apiRoot, routes) => {
  const app = express()

  app.use(cors())

  /* istanbul ignore next */
  // if (env === 'production' || env === 'development') {
  //   app.use(compression())
  //   app.use(morgan('dev'))
  // }

  app.use(compression())
  app.use(morgan('dev'))

  app.use(express.urlencoded({ limit: '50mb', extended: false }))
  app.use(express.json({ limit: '50mb' }))
  app.use(apiRoot, routes)
  app.use(queryErrorHandler())
  app.use(bodyErrorHandler())

  return app
}

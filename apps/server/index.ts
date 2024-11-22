import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { handle } from 'hono/aws-lambda'
import { userRouter } from './src/routers/user.router'

const app = new Hono().basePath('/api').use(cors())

const apiRouter = app.route('/user', userRouter)

export const handler = handle(apiRouter)

export type ApiSpec = typeof apiRouter

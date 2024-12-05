import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { handle } from 'hono/aws-lambda'
import { storyRouter } from './src/routers/story.router.ts'
import { itemRouter } from './src/routers/item.router.ts'

const app = new Hono().basePath('/api').use(cors())

const apiRouter = app.route('/item', itemRouter).route('/story', storyRouter)

export const handler = handle(apiRouter)

export type ApiSpec = typeof apiRouter

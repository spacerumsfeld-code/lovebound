import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { handle } from 'hono/aws-lambda'
import { storyRouter } from './src/routers/story.router.ts'
import { itemRouter } from './src/routers/item.router.ts'
import { paymentRouter } from './src/routers/payment.router.ts'

const app = new Hono().basePath('/api').use(cors())

const apiRouter = app
    .route('/story', storyRouter)
    .route('/item', itemRouter)
    .route('/payment', paymentRouter)

export const handler = handle(apiRouter)

export type ApiSpec = typeof apiRouter

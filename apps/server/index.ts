import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { handle } from 'hono/aws-lambda'
import { userRouter } from './src/routers/user.router'
import { storyRouter } from './src/routers/story.router'
import { itemRouter } from './src/routers/item.router'
import { paymentRouter } from './src/routers/payment.router'

const app = new Hono().basePath('/api').use(cors())

const apiRouter = app
    .route('/user', userRouter)
    .route('/story', storyRouter)
    .route('/item', itemRouter)
    .route('/payment', paymentRouter)

export const handler = handle(apiRouter)

export enum RouterEnum {
    User = 'userRouter',
    Story = 'storyRouter',
    Item = 'itemRouter',
    payment = 'paymentRouter',
}
export type ApiSpec = typeof apiRouter

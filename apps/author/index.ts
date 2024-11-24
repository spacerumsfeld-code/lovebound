import { Hono } from 'hono'
import { Story } from '@core'

const app = new Hono()

app.post('/create-story', async (c, input) => {
    const body = await c.req.json()
    const { title, scenario, tensionLevel, theme, tone, setting } = body
    console.info('body', body)

    // generateContent!

    // createStory in our records

    // publish to queue letting everyone know!

    // generateImage

    // perhaps with url optimistic update of our records so user can see images faster

    // upload to s3, update our records with coverUrl

    // let user know!

    // if present, begin working on voiceover.
    return c.json({})
})

export default app

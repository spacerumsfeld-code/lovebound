import { Hono } from 'hono'
import { Story, createStorySchema } from '@core'
import { handleAsync } from '@utils'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { publishStoryCreatedEvent } from '@clients/queue.client.ts'
import { generateStoryCover } from '@clients/openai.client.ts'
import { uploadBase64Image } from '@clients/s3.client.ts'

const app = new Hono()

app.post(
    '/create-story',
    zValidator('json', z.object(createStorySchema)),
    async (c) => {
        const { userId, title, scenario, tensionLevel, theme, tone, setting } =
            c.req.valid('json')

        const [generatedStoryContentResponse, generateContentError] =
            await handleAsync(
                Story.generateStoryContent({
                    userId,
                    title,
                    scenario: scenario ?? null,
                    tensionLevel,
                    theme,
                    tone,
                    setting,
                }),
            )
        if (generateContentError) {
            console.error('oops', generateContentError)
            return
        }
        const generatedStoryContent = generatedStoryContentResponse!.content

        const [createdStory, createStoryError] = await handleAsync(
            Story.createStory({
                ownerId: userId,
                title: title,
                scenario: scenario ?? null,
                tensionLevel: tensionLevel,
                theme: theme,
                tone: tone,
                setting: setting,
                content: generatedStoryContent!,
            }),
        )
        if (createStoryError) {
            console.error('oops', createStoryError)
            return
        }

        // publish to queue letting everyone know!
        const [__, publishError] = await handleAsync(
            publishStoryCreatedEvent({
                userId,
                title,
                storyId: createdStory!.id,
            }),
        )
        if (publishError) {
            console.error('oops', publishError)
            return
        }

        const [coverImageData, coverImageError] = await handleAsync(
            generateStoryCover({
                title,
                setting,
            }),
        )
        if (coverImageError) {
            console.error('oops', coverImageError)
            return
        }
        console.info('coverImageData', coverImageData)

        const [coverImageUrl, coverImageUploadError] = await handleAsync(
            uploadBase64Image(coverImageData!),
        )
        if (coverImageUploadError) {
            console.error('oops', coverImageUploadError)
            return
        }
        console.info(coverImageUrl)

        const [___, updateStoryError] = await handleAsync(
            Story.updateStory({
                id: createdStory!.id,
                coverImageUrl: coverImageUrl!,
            }),
        )
        if (updateStoryError) {
            console.error('oops', updateStoryError)
            return
        }

        return c.json({})
    },
)

export default app

import { StorySubmittedEvent } from '@core'
import { SQSEvent, SQSRecord } from 'aws-lambda'
import { Story } from '@core'
import { handleAsync } from '@utils'
import { publishStoryCreatedEvent } from '@clients/queue.client.ts'
import { generateStoryCover } from '@clients/openai.client.ts'
import { uploadBase64Image } from '@clients/s3.client.ts'

// @todo: provide run-time validation of events. (zod probably)

export const handler = async (event: SQSEvent) => {
    const records: SQSRecord[] = event.Records
    const { eventType, data } = JSON.parse(records[0].body)

    switch (eventType) {
        case 'story.submitted':
            console.info('Processing story submitted event')
            const [generatedStoryContentResponse, generateContentError] =
                await handleAsync(
                    Story.generateStoryContent({
                        ...(data as StorySubmittedEvent['data']),
                    }),
                )
            if (generateContentError) {
                console.error('oops', generateContentError)
                return
            }
            const generatedStoryContent = generatedStoryContentResponse!.content

            const [createdStory, createStoryError] = await handleAsync(
                Story.createStory({
                    ownerId: data.ownerId,
                    title: data.title,
                    scenario: data.scenario,
                    tensionLevel: data.tensionLevel,
                    theme: data.theme,
                    tone: data.tone,
                    setting: data.setting,
                    content: generatedStoryContent!,
                }),
            )
            if (createStoryError) {
                console.error('oops', createStoryError)
                return
            }

            const [__, publishError] = await handleAsync(
                publishStoryCreatedEvent({
                    title: data.title,
                    storyId: createdStory!.id,
                    theme: data.theme,
                    setting: data.setting,
                }),
            )
            if (publishError) {
                console.error('oops', publishError)
                return
            }

            return {
                statusCode: 200,
                body: JSON.stringify({
                    success: true,
                    message: 'Story created successfully',
                }),
            }
        case 'story.created':
            console.info('Processing story created event')

            const [coverImageData, coverImageError] = await handleAsync(
                generateStoryCover({
                    title: data.title,
                    setting: data.setting,
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

            // notifications to user
            console.info('all done')
            return {
                statusCode: 200,
                body: JSON.stringify({
                    success: true,
                    message: 'Story submitted successfully',
                }),
            }
        default:
            console.log('Unknown event type')
            return {
                statusCode: 200,
                body: JSON.stringify({
                    success: false,
                    message: 'Unknown event type',
                }),
            }
    }
}

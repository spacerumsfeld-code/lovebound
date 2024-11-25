import {
    storySubmittedEventSchema,
    Story,
    storyCreatedEventSchema,
    Connection,
} from '@core'
import { handleAsync, extractFulfilledValues } from '@utils'
import { SQSEvent, SQSRecord } from 'aws-lambda'
import { publishStoryCreatedEvent } from '@clients/queue.client.ts'
import {
    generateStoryCover,
    generateStoryNarration,
} from '@clients/openai.client.ts'
import {
    uploadAudioFromBuffer,
    uploadImageFromUrl,
} from '@clients/s3.client.ts'
import { LengthToWordEnum } from '@client-types/story/story.model.ts'

export const handler = async (event: SQSEvent) => {
    const records: SQSRecord[] = event.Records
    const { eventType, data } = JSON.parse(records[0].body)

    switch (eventType) {
        case 'story.submitted':
            console.info('Processing story submitted event')
            const {
                data: storySubmittedData,
                success,
                error: storySubmittedError,
            } = storySubmittedEventSchema.safeParse(data)
            if (!success) {
                console.error(
                    'Invalid story submitted event',
                    storySubmittedError,
                )
                return
            }

            const {
                ownerId,
                title,
                scenario,
                tensionLevel,
                theme,
                tone,
                setting,
                length,
                includeNarration,
            } = storySubmittedData

            const [generatedStoryContentResponse, generateContentError] =
                await handleAsync(
                    Story.generateStoryContent({
                        title,
                        scenario: scenario ?? null,
                        tensionLevel,
                        theme,
                        tone,
                        setting,
                        wordCount: LengthToWordEnum[length],
                    }),
                )
            if (generateContentError) {
                console.error('oops', generateContentError)
                return
            }
            const generatedStoryContent =
                generatedStoryContentResponse!.content!

            const [createdStory, createStoryError] = await handleAsync(
                Story.createStory({
                    length,
                    ownerId,
                    title,
                    scenario: scenario ?? null,
                    tensionLevel,
                    theme,
                    tone,
                    setting,
                    content: generatedStoryContent,
                }),
            )
            if (createStoryError) {
                console.error('oops', createStoryError)
                return
            }

            // lets let the user know their story was created
            const [_, postToConnectionError] = await handleAsync(
                Connection.postToConnection({
                    userId: ownerId,
                    data: {
                        type: 'story.created',
                        storyId: createdStory!.id,
                    },
                }),
            )
            if (postToConnectionError) {
                console.error(postToConnectionError)
                return
            }

            const [__, publishError] = await handleAsync(
                publishStoryCreatedEvent({
                    includeNarration,
                    ownerId,
                    title,
                    storyId: createdStory!.id,
                    setting,
                    content: generatedStoryContent,
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
                    message: 'Author informed of story submission',
                }),
            }
        case 'story.created':
            console.info('Processing story created event')
            // validate event
            const {
                data: storyCreatedData,
                success: storyCreatedSuccess,
                error,
            } = storyCreatedEventSchema.safeParse(data)

            if (!storyCreatedSuccess) {
                console.error('Invalid story created event', error)
                return
            }

            const {
                includeNarration: gIncludeNarration,
                ownerId: gOwnerId,
                title: gTitle,
                storyId,
                setting: gSetting,
                content,
            } = storyCreatedData

            const generationPromiseResults = await Promise.allSettled([
                generateStoryCover({
                    title: gTitle,
                    setting: gSetting,
                }),
                gIncludeNarration
                    ? generateStoryNarration({
                          content,
                      })
                    : Promise.resolve(null),
            ])
            const { fulfilledValues, hasRejections } = extractFulfilledValues(
                generationPromiseResults,
            )
            if (hasRejections) {
                console.error('oops', generationPromiseResults)
                return
            }
            const [coverImageData, narrationBuffer] = fulfilledValues

            const uploadPromiseResults = await Promise.allSettled([
                uploadImageFromUrl(coverImageData!),
                uploadAudioFromBuffer(narrationBuffer!),
            ])
            const {
                fulfilledValues: uploadFulfilledValues,
                hasRejections: uploadHasRejections,
            } = extractFulfilledValues(uploadPromiseResults)
            if (uploadHasRejections) {
                console.error('oops', uploadPromiseResults)
                return
            }
            const [coverUrl, narrationUrl] = uploadFulfilledValues

            const [___, updateStoryError] = await handleAsync(
                Story.updateStory({
                    id: storyId,
                    coverUrl: coverUrl!,
                    narrationUrl: narrationUrl!,
                }),
            )
            if (updateStoryError) {
                console.error('oops', updateStoryError)
                return
            }

            return {
                statusCode: 200,
                body: JSON.stringify({
                    success: true,
                    message: 'User informed of story creation',
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

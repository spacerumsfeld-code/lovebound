import { Story, Connection, ZCreateStory, ZStoryCreatedEvent } from '@core'
import { handleAsync, extractFulfilledValues } from '@utils'
import { publishStoryCreatedEvent } from '@clients/queue.client.ts'
import { SQSEvent, SQSRecord } from 'aws-lambda'
import {
    generateStoryCover,
    generateStoryNarration,
} from '@clients/openai.client.ts'
import {
    uploadAudioFromBuffer,
    uploadImageFromUrl,
} from '@clients/s3.client.ts'

export const handler = async (event: SQSEvent) => {
    const records: SQSRecord[] = event.Records
    const { eventType, data } = JSON.parse(records[0].body)

    switch (eventType) {
        case 'story.submitted':
            console.info('Processing story submitted event')

            const { data: storyData, error: validationError } =
                ZCreateStory.safeParse(data)
            if (validationError) {
                console.error('Invalid story submitted event', validationError)
                return {
                    statusCode: 200,
                    body: JSON.stringify({
                        success: false,
                        message: 'Invalid story submitted event',
                    }),
                }
            }

            const { ownerId, title, theme, scenes, length, genre } = storyData
            const miniScene = scenes.pop()

            const [generatedStoryContentResponse, generateContentError] =
                await handleAsync(
                    Story.generateMiniContent({
                        tensionLevel: miniScene!.tensionLevel,
                        theme,
                        tone: miniScene!.tone,
                        setting: miniScene!.setting,
                        genre,
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
                    theme,
                    genre,
                }),
            )
            if (createStoryError) {
                console.error('oops', createStoryError)
                return
            }

            const [createdScene, createSceneError] = await handleAsync(
                Story.createScene({
                    storyId: createdStory!.id,
                    content: generatedStoryContent,
                    narrationUrl: null,
                    orderIndex: 0,
                    tone: miniScene!.tone,
                    setting: miniScene!.setting,
                    tensionLevel: miniScene!.tensionLevel,
                }),
            )
            if (createSceneError) {
                console.error('oops', createSceneError)
                return
            }

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
            }

            const [__, publishError] = await handleAsync(
                publishStoryCreatedEvent({
                    ...storyData,
                    storyId: createdStory!.id,
                    scenes: [
                        {
                            id: createdScene!.id,
                            ...miniScene!,
                            content: generatedStoryContent,
                        },
                    ],
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
            const {
                data: storyCreatedData,
                success: storyCreatedSuccess,
                error,
            } = ZStoryCreatedEvent.safeParse(data)
            if (!storyCreatedSuccess) {
                console.error('Invalid story created event', error)
                return
            }

            const {
                includeNarration: gIncludeNarration,
                storyId,
                scenes: gScenes,
            } = storyCreatedData
            const miniSceneAgain = gScenes.pop()

            const generationPromiseResults = await Promise.allSettled([
                generateStoryCover({
                    title: storyCreatedData.title,
                    setting: miniSceneAgain!.setting,
                }),
                gIncludeNarration
                    ? generateStoryNarration({
                          content: miniSceneAgain!.content,
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
                }),
            )
            if (updateStoryError) {
                console.error('oops', updateStoryError)
                return
            }

            const [____, updateSceneError] = await handleAsync(
                Story.updateScene({
                    id: miniSceneAgain!.id,
                    narrationUrl: narrationUrl!,
                }),
            )
            if (updateSceneError) {
                console.error('oops', updateSceneError)
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

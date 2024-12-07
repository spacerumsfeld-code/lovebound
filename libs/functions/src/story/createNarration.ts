import { orchestrationClient } from '@clients/orchestration.client.ts'
import { uploadAudioFromBuffer } from '@clients/s3.client.ts'
import { Notification, Story } from '@core'
import { handleAsync } from '@utils'

export const createNarration = orchestrationClient.createFunction(
    { id: 'create.narration' },
    { event: 'create.narration' },
    async ({ event, step }) => {
        console.info(
            `Invoked orchestration.createNarration with data: ${JSON.stringify(
                event.data,
            )}`,
        )
        const { data } = event

        const [generatedContentBuffer, generateNarrationContentError] =
            await handleAsync(
                Story.generateNarration({ content: data.content }),
            )
        if (generateNarrationContentError) {
            console.error(
                'generateNarrationContentError',
                generateNarrationContentError,
            )
            return
        }
        const { buffer } = generatedContentBuffer!

        const [uploadUrl, uploadError] = await step.run(
            'Upload Narration to S3',
            () => handleAsync(uploadAudioFromBuffer(buffer)),
        )
        if (uploadError) {
            console.error('uploadUrlError', uploadError)
            return
        }

        const [_, updateSceneError] = await step.run(
            'Update scene with narrationUrl',
            () =>
                handleAsync(
                    Story.updateScene({
                        id: data.sceneId,
                        narrationUrl: uploadUrl!,
                    }),
                ),
        )
        if (updateSceneError) {
            console.error('updateSceneError', updateSceneError)
            return
        }

        const [__, postToConnectionError] = await step.run(
            'Post to connection',
            () =>
                handleAsync(
                    Notification.postToConnection({
                        userId: data.ownerId,
                        data: {
                            type: 'story.complete',
                            payload: {
                                storyId: data.storyId,
                            },
                        },
                    }),
                ),
        )
        if (postToConnectionError) {
            console.error('postToConnectionError', postToConnectionError)
        }

        await orchestrationClient.send({
            name: 'finish.story',
            data: { storyId: data.storyId, ownerId: data.ownerId },
        })

        return { status: 'initiated' }
    },
)

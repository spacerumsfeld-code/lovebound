import { orchestrationClient } from '@clients/orchestration.client'
import { s3Client } from '@clients/s3.client'
import { Notification, Story } from '@core'
import { handleAsync } from '@utils'

export const createNarration = orchestrationClient.createFunction(
    { id: 'create.narration' },
    { event: 'create.narration' },
    async ({ event, step }) => {
        console.info(
            `📨 Invoked orchestration.createNarration with data: ${JSON.stringify(
                event.data,
            )}`,
        )
        const { data } = event

        const [generatedContentBuffer, generateNarrationContentError] =
            await handleAsync(
                Story.generateNarration({
                    content: data.content,
                    voice: data.voice,
                }),
            )
        if (generateNarrationContentError) {
            console.error(
                `📨❌ Error generating narration content: ${generateNarrationContentError}`,
            )
            return {
                status: 'failed',
                error: generateNarrationContentError,
            }
        }
        const { buffer } = generatedContentBuffer!

        const [uploadUrl, uploadError] = await step.run(
            'Upload Narration to S3',
            () =>
                handleAsync(
                    s3Client.uploadAudioFromBuffer(buffer, data.storyId),
                ),
        )
        if (uploadError) {
            console.error(
                `📨❌ Error uploading narration to S3: ${uploadError}`,
            )
            return {
                status: 'failed',
                error: uploadError,
            }
        }

        const [, updateSceneError] = await step.run(
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
            console.error(
                `📨❌ Error updating scene with narrationUrl: ${updateSceneError}`,
            )
            return {
                status: 'failed',
                error: updateSceneError,
            }
        }

        const [, postToConnectionError] = await step.run(
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
            console.error(
                `📨❌ Error posting to connection: ${postToConnectionError}`,
            )
            return {
                status: 'failed',
                error: postToConnectionError,
            }
        }

        await orchestrationClient.send({
            name: 'finish.story',
            data: { storyId: data.storyId, ownerId: data.ownerId },
        })

        return { status: 'initiated' }
    },
)

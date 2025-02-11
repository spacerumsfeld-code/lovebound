import { orchestrationClient } from '@clients/orchestration.client'
import { s3Client } from '@clients/s3.client'
import { Story, Notification } from '@core'
import { handleAsync } from '@utils'

export const createCover = orchestrationClient.createFunction(
    { id: 'create.cover' },
    { event: 'create.cover' },
    async ({ event, step }) => {
        console.info(
            `Invoked orchestration.createCover with data: ${JSON.stringify(
                event.data,
            )}`,
        )
        const { data } = event

        const [imageUrl, createImageError] = await step.run(
            'Create cover image',
            () =>
                handleAsync(
                    Story.createStoryCover({
                        genre: data.genre,
                        theme: data.theme,
                        setting: data.setting,
                    }),
                ),
        )
        if (createImageError) {
            console.error('createImageError', createImageError)
            return
        }

        const [uploadUrl, uploadError] = await step.run(
            'Upload Narration to S3',
            () => handleAsync(s3Client.uploadImageFromUrl(imageUrl!)),
        )
        if (uploadError) {
            console.error('uploadUrlError', uploadError)
            return
        }

        const [, updateStoryError] = await step.run(
            'Update story with cover url',
            () =>
                handleAsync(
                    Story.updateStory({
                        id: data.storyId,
                        coverUrl: uploadUrl!,
                    }),
                ),
        )
        if (updateStoryError) {
            console.error('updateStoryError', updateStoryError)
            return
        }

        const [, postToConnectionError] = await step.run(
            'Post to connection',
            () =>
                handleAsync(
                    Notification.postToConnection({
                        userId: data.ownerId,
                        data: {
                            type: 'cover.created',
                        },
                    }),
                ),
        )
        if (postToConnectionError) {
            console.error('postToConnectionError', postToConnectionError)
        }

        return { status: 'initiated' }
    },
)

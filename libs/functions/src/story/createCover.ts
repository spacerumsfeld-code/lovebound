import { orchestrationClient } from '@clients/orchestration.client'
import { s3Client } from '@clients/s3.client'
import { Story, Notification } from '@core'
import { handleAsync } from '@utils'
import { Resource } from 'sst'

process.env.ENVIRONMENT = Resource.Environment.value

export const createCover = orchestrationClient.createFunction(
    { id: 'create.cover' },
    { event: 'create.cover' },
    async ({ event, step }) => {
        console.info(
            `📨 Invoked orchestration.createCover with data: ${JSON.stringify(
                event.data,
            )}`,
        )
        const { data } = event

        if (process.env.ENVIRONMENT === 'development') {
            console.info(`📨 Skipping create cover in development`)
            return { status: 'skipped' }
        }

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
            console.error(
                `📨❌ Error creating cover image: ${createImageError}`,
            )
            return {
                status: 'failed',
                error: createImageError,
            }
        }

        const [uploadUrl, uploadError] = await step.run(
            'Upload Narration to S3',
            () => handleAsync(s3Client.uploadImageFromUrl(imageUrl!)),
        )
        if (uploadError) {
            console.error(`📨❌ Error uploading cover image: ${uploadError}`)
            return {
                status: 'failed',
                error: uploadError,
            }
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
            console.error(
                `📨❌ Error updating story with cover url: ${updateStoryError}`,
            )
            return {
                status: 'failed',
                error: updateStoryError,
            }
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
            console.error(
                `📨❌ Error posting to connection: ${postToConnectionError}`,
            )
            return {
                status: 'failed',
                error: postToConnectionError,
            }
        }

        return { status: 'initiated' }
    },
)

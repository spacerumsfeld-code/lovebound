import { orchestrationClient } from '@clients/orchestration.client.ts'
import { Connection, Story } from '@core'
import { handleAsync } from '@utils'

export const finishShortStory = orchestrationClient.createFunction(
    { id: 'finish.short.story' },
    { event: 'finish.short.story' },
    async ({ event, step }) => {
        console.info(
            `Invoked orchestration.finishShortStory with data: ${JSON.stringify(
                event.data,
            )}`,
        )
        const { data } = event

        const [_, updateStoryError] = await step.run(
            'Update Story as Complete in DB',
            () =>
                handleAsync(
                    Story.updateStory({
                        id: data.storyId,
                        inProgress: false,
                    }),
                ),
        )
        if (updateStoryError) {
            console.error('oops', updateStoryError)
            return
        }

        const [__, postToConnectionError] = await step.run(
            'Post to connection',
            () =>
                handleAsync(
                    Connection.postToConnection({
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
            console.error(postToConnectionError)
        }

        return { status: 'initiated' }
    },
)

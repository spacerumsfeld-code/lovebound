import { orchestrationClient } from '@clients/orchestration.client.ts'
import { Notification, Story } from '@core'
import { handleAsync } from '@utils'

export const finishStory = orchestrationClient.createFunction(
    { id: 'finish.story' },
    { event: 'finish.story' },
    async ({ event, step }) => {
        console.info(
            `Invoked orchestration.finishStory with data: ${JSON.stringify(
                event.data,
            )}`,
        )
        const { data } = event

        const [_, updateStoryError] = await step.run(
            'Mark Story as Complete',
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
            console.error(postToConnectionError)
        }

        return { status: 'initiated' }
    },
)

import { orchestrationClient } from '@clients/orchestration.client.ts'

export const finishShortStory = orchestrationClient.createFunction(
    { id: 'finish.short.story' },
    { event: 'finish.short.story' },
    async ({ event, step }) => {
        console.info(
            `Invoked orchestration.finishShortStory with data: ${JSON.stringify(
                event.data,
            )}`,
        )

        return { status: 'initiated' }
    },
)

import { orchestrationClient } from '@clients/orchestration.client.ts'

export const startShortStory = orchestrationClient.createFunction(
    { id: 'start.short.story' },
    { event: 'start.short.story' },
    async ({ event }) => {
        console.info(
            `Invoked orchestration.startShortStoryCreation with data: ${JSON.stringify(
                event.data,
            )}`,
        )
        const { data } = event

        await orchestrationClient.send({
            name: 'create.scene',
            data: { ...data, sceneNumber: 1 },
        })

        return { status: 'initiated' }
    },
)

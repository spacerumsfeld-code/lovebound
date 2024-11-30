import { orchestrationClient } from '@clients/orchestration.client.ts'

export const startStoryCreation = orchestrationClient.createFunction(
    { id: 'start.story' },
    { event: 'start.story' },
    async ({ event }) => {
        console.info(
            `Invoked orchestration.startStoryCreation with data: ${JSON.stringify(
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

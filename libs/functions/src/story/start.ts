import { orchestrationClient } from '@clients/orchestration.client'
import { resolvePromises } from '@utils'

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

        resolvePromises([
            {
                promise: orchestrationClient.send({
                    name: 'create.cover',
                    data: {
                        storyId: data.storyId,
                        ownerId: data.ownerId,
                        genre: data.genre.name,
                        theme: data.theme.name,
                        setting: data.scenes[0].setting.name,
                    },
                }),
            },
            {
                promise: orchestrationClient.send({
                    name: 'create.scene',
                    data: { ...data, sceneNumber: 1 },
                }),
            },
        ])

        return { status: 'initiated' }
    },
)

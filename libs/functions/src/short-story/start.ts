import { orchestrationClient } from '@clients/orchestration.client.ts'
import { Story } from '@core'
import { handleAsync } from '@utils'

export const startShortStory = orchestrationClient.createFunction(
    { id: 'start.short.story' },
    { event: 'start.short.story' },
    async ({ event, step }) => {
        console.info(
            `Invoked orchestration.startShortStoryCreation with data: ${JSON.stringify(
                event.data,
            )}`,
        )
        const { data } = event

        // @TODO once we have cache of coverUrl per combination of inputs, write it to story here.
        const [createdStory, createStoryError] = await step.run(
            'Create Story in DB',
            () =>
                handleAsync(
                    Story.createStory({
                        length: data.length,
                        ownerId: data.ownerId,
                        title: data.title,
                        genre: data.genre,
                        theme: data.theme,
                    }),
                ),
        )
        if (createStoryError) {
            console.error('oops', createStoryError)
            return
        }

        await orchestrationClient.send({
            name: 'create.scene',
            data: { ...data, storyId: createdStory!.id, sceneNumber: 1 },
        })

        return { status: 'initiated', storyId: createdStory!.id }
    },
)

import { cacheClient } from '@clients/cache.client.ts'
import { orchestrationClient } from '@clients/orchestration.client.ts'
import { Story } from '@core'
import { handleAsync } from '@utils'

export const createScene = orchestrationClient.createFunction(
    { id: 'create.scene' },
    { event: 'create.scene' },
    async ({ event, step }) => {
        console.info(
            `Invoked orchestration.createScene with data: ${JSON.stringify(
                event.data,
            )}`,
        )
        const { data } = event

        const prompt = (await cacheClient.get<string>(
            `prompt:short:scene:${data.sceneNumber}`,
        )) as string
        const lastSceneSummary = await cacheClient.get<string>(
            `short:scene:${data.sceneNumber - 1}:summary`,
        )
        const scene = data.scenes.shift()!
        const { tone, setting, tensionLevel } = scene
        const { genre, theme, title } = data
        const finalPrompt =
            prompt +
            JSON.stringify({
                genre,
                theme,
                title,
                tone,
                setting,
                tensionLevel,
                lastSceneSummary,
            })

        const [sceneContentAndSummary, generateSceneContentError] =
            await step.run('Generate Scene Content', () =>
                handleAsync(
                    Story.generateSceneContent({
                        prompt: finalPrompt,
                    }),
                ),
            )
        if (generateSceneContentError) {
            console.error('oops', generateSceneContentError)
            return
        }

        const { content } = sceneContentAndSummary!
        const parsedContent = content.split('###Summary###')
        const summary = parsedContent.pop()!
        const finalContent = parsedContent.pop()!

        const [_, createSceneError] = await step.run('Create Scene in DB', () =>
            handleAsync(
                Story.createScene({
                    storyId: data.storyId,
                    content: finalContent,
                    narrationUrl: null,
                    orderIndex: data.sceneNumber,
                    tone: scene.tone,
                    setting: scene.setting,
                    tensionLevel: scene.tensionLevel,
                }),
            ),
        )
        if (createSceneError) {
            console.error('oops', createSceneError)
            return
        }

        switch (data.sceneNumber === 3) {
            case true:
                await orchestrationClient.send({
                    name: 'finish.short.story',
                    data: { storyId: data.storyId, ownerId: data.ownerId },
                })
                break
            case false:
                await cacheClient.set(
                    `short:scene:${data.sceneNumber}:summary`,
                    summary,
                )
                await orchestrationClient.send({
                    name: 'create.scene',
                    data: { ...data, sceneNumber: data.sceneNumber + 1 },
                })
                break
            default:
                break
        }

        return { status: 'initiated' }
    },
)

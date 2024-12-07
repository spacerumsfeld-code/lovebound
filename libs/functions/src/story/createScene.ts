import { cacheClient } from '@clients/cache.client.ts'
import { orchestrationClient } from '@clients/orchestration.client.ts'
import { Notification, Story } from '@core'
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

        let prompt: string
        switch (data.length === 23) {
            case true:
                prompt = (await cacheClient.get<string>(
                    `prompt:mini`,
                )) as string
                break
            case false:
                prompt = (await cacheClient.get<string>(
                    `prompt:short:scene:${data.sceneNumber}`,
                )) as string
                break
            default:
                break
        }

        const lastSceneSummary = await cacheClient.get<string>(
            `short:scene:${data.storyId}:${data.sceneNumber - 1}:summary`,
        )
        const scene = data.scenes.shift()!
        const { tone, setting, tensionLevel } = scene
        const { genre, theme, title } = data
        const finalPrompt =
            prompt! +
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

        const [createdScene, createSceneError] = await step.run(
            'Create Scene in DB',
            () =>
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

        const [__, postToConnectionError] = await step.run(
            'Post to connection',
            () =>
                handleAsync(
                    Notification.postToConnection({
                        userId: data.ownerId,
                        data: {
                            type: 'scene.written',
                            payload: {
                                sceneNumber: data.sceneNumber,
                            },
                        },
                    }),
                ),
        )
        if (postToConnectionError) {
            console.error(postToConnectionError)
        }

        switch (data.length === 23) {
            case true:
                if (data.includeNarration) {
                    await orchestrationClient.send({
                        name: 'create.narration',
                        data: {
                            ownerId: data.ownerId,
                            storyId: data.storyId,
                            sceneId: createdScene!.id,
                            content: finalContent,
                        },
                    })
                }

                await orchestrationClient.send({
                    name: 'finish.story',
                    data: { storyId: data.storyId, ownerId: data.ownerId },
                })
                break
            case false:
                if (data.sceneNumber === 3) {
                    await orchestrationClient.send({
                        name: 'finish.story',
                        data: { storyId: data.storyId, ownerId: data.ownerId },
                    })
                } else {
                    await cacheClient.set(
                        `short:scene:${data.storyId}:${data.sceneNumber}:summary`,
                        summary,
                    )
                    await orchestrationClient.send({
                        name: 'create.scene',
                        data: { ...data, sceneNumber: data.sceneNumber + 1 },
                    })
                }
                break
            default:
                break
        }

        return { status: 'initiated' }
    },
)

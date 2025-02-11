import { cacheClient } from '@clients/cache.client'
import { orchestrationClient } from '@clients/orchestration.client'
import { Notification, Story } from '@core'
import { handleAsync, resolvePromises } from '@utils'

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
        switch (data.length.name) {
            case 'Mini':
                prompt = (await cacheClient.get<string>(`prompt:mini`))!
                break
            case 'Short':
                prompt = (await cacheClient.get<string>(
                    `prompt:short:scene:${data.sceneNumber}`,
                ))!
                break
            default:
                prompt = ''
                break
        }

        const priorSceneSummary = await cacheClient.get<string>(
            `short:scene:${data.storyId}:${data.sceneNumber - 1}:summary`,
        )
        const scene = data.scenes.shift()!
        const { tone, setting, tensionLevel } = scene
        const { genre, theme } = data
        const {
            results: [genrePrompt, themePrompt, tonePrompt, tensionPrompt],
        } = await resolvePromises([
            {
                promise: cacheClient.get<string>(`prompt:rich:${genre.name}`),
            },
            {
                promise: cacheClient.get<string>(`prompt:rich:${theme.name}`),
            },
            {
                promise: cacheClient.get<string>(`prompt:rich:${tone.name}`),
            },
            {
                promise: cacheClient.get<string>(
                    `prompt:rich:${tensionLevel.name}`,
                ),
            },
        ])

        const finalPrompt = prompt
            .replace('[genre_instructions]', genrePrompt!)
            .replace('[theme_instructions]', themePrompt!)
            .replace('[tone_instructions]', tonePrompt!)
            .replace('[tension_level_instructions]', tensionPrompt!)
            .replace('[setting]', setting!.name)
            .replace('[priorSceneSummary]', priorSceneSummary!)

        const allPromptsExist = Boolean(
            genrePrompt && themePrompt && tonePrompt && tensionPrompt,
        )
        if (!allPromptsExist) {
            console.error('❌ Not all prompts retrieved from cacheClient', {
                genrePrompt,
                themePrompt,
                tonePrompt,
                tensionPrompt,
            })
        }

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
                        tone: scene.tone.id,
                        setting: scene.setting.id,
                        tensionLevel: scene.tensionLevel.id,
                    }),
                ),
        )
        if (createSceneError) {
            console.error('oops', createSceneError)
            return
        }

        const [, postToConnectionError] = await step.run(
            'Post to connection',
            () =>
                handleAsync(
                    Notification.postToConnection({
                        userId: data.ownerId,
                        data: {
                            type: 'scene.written',
                            payload: {
                                sceneNumber: data.sceneNumber,
                                length: data.length.name,
                            },
                        },
                    }),
                ),
        )
        if (postToConnectionError) {
            console.error(postToConnectionError)
        }

        switch (data.length.name) {
            case 'Mini':
                if (data.includeNarration) {
                    await orchestrationClient.send({
                        name: 'create.narration',
                        data: {
                            ownerId: data.ownerId,
                            storyId: data.storyId,
                            sceneId: createdScene!.id,
                            content: finalContent,
                            voice: data.narrationVoice!,
                        },
                    })
                } else {
                    await orchestrationClient.send({
                        name: 'finish.story',
                        data: { storyId: data.storyId, ownerId: data.ownerId },
                    })
                }
                break
            case 'Short':
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

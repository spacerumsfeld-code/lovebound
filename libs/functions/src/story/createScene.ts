import { StoryLengthEnum } from '@client-types/item/item.model'
import { cacheClient } from '@clients/cache.client'
import { orchestrationClient } from '@clients/orchestration.client'
import { Notification, Story } from '@core'
import { handleAsync, resolvePromises } from '@utils'

export const createScene = orchestrationClient.createFunction(
    { id: 'create.scene' },
    { event: 'create.scene' },
    async ({ event, step }) => {
        console.info(
            `📨 Invoked orchestration.createScene with data: ${JSON.stringify(event.data)}`,
        )
        const { data } = event

        let promptKey: string
        switch (data.length.name) {
            case StoryLengthEnum.Mini:
                promptKey = `prompt:mini`
                break
            case StoryLengthEnum.Short:
                promptKey = `prompt:short:scene:${data.sceneNumber}`
                break
            case StoryLengthEnum.Novelette:
                promptKey = `prompt:novelette:scene:${data.sceneNumber}`
                break
            default:
                throw new Error(`Unsupported story length: ${data.length.name}`)
        }

        const prompt = (await cacheClient.get<string>(promptKey))!

        const [, sceneKeys] = await cacheClient.scan(0, {
            match: `${data.length.name.toLowerCase()}:scene:${data.storyId}:*`,
        })
        const [priorSceneSummaries, getSummariesError] = await handleAsync(
            Promise.all(sceneKeys.map((key) => cacheClient.get(key))),
        )
        if (getSummariesError) {
            console.error(
                `📨❌ Error getting prior scene summaries: ${getSummariesError.message}`,
            )
            return { status: 'failed', message: getSummariesError.message }
        }

        let characterNames: { name1: string; name2: string } | null = null
        if (data.sceneNumber > 1) {
            characterNames = await cacheClient.get<{
                name1: string
                name2: string
            }>(`story:${data.storyId}:names`)
            if (!characterNames) {
                console.error(
                    `📨❌ No character names found for story ${data.storyId}`,
                )
                return {
                    status: 'failed',
                    message: 'Character names not found',
                }
            }
        }

        const scene = data.scenes.shift()!
        const { tone, setting, tensionLevel } = scene
        const { genre, theme } = data
        const {
            results: [genrePrompt, themePrompt, tonePrompt, tensionPrompt],
        } = await resolvePromises([
            { promise: cacheClient.get<string>(`prompt:rich:${genre.name}`) },
            { promise: cacheClient.get<string>(`prompt:rich:${theme.name}`) },
            { promise: cacheClient.get<string>(`prompt:rich:${tone.name}`) },
            {
                promise: cacheClient.get<string>(
                    `prompt:rich:${tensionLevel.name}`,
                ),
            },
        ])

        let finalPrompt = prompt
            .replace('[genre_instructions]', genrePrompt || '')
            .replace('[theme_instructions]', themePrompt || '')
            .replace('[tone_instructions]', tonePrompt || '')
            .replace('[tension_level_instructions]', tensionPrompt || '')
            .replace('[setting]', setting?.name || '')
            .replace(
                '[priorSceneSummaries]',
                JSON.stringify(priorSceneSummaries || []),
            )

        if (characterNames && data.sceneNumber > 1) {
            finalPrompt = finalPrompt
                .replace('[character1_name]', characterNames.name1)
                .replace('[character2_name]', characterNames.name2)
        }

        const allPromptsExist = Boolean(
            genrePrompt && themePrompt && tonePrompt && tensionPrompt,
        )
        if (!allPromptsExist) {
            console.error(
                `📨❌ Not all prompts retrieved: ${JSON.stringify({ genrePrompt, themePrompt, tonePrompt, tensionPrompt })}`,
            )
        }

        const [sceneResponse, generateSceneContentError] = await step.run(
            'Generate Scene Content',
            () =>
                handleAsync(
                    Story.generateSceneContent({
                        prompt: finalPrompt,
                    }),
                ),
        )
        if (generateSceneContentError) {
            console.error(
                `📨❌ Error generating scene: ${generateSceneContentError.message}`,
            )
            return { status: 'failed', error: generateSceneContentError }
        }

        const { character1, character2, content, summary } =
            sceneResponse!.content

        if (data.sceneNumber === 1) {
            const names = { name1: character1, name2: character2 }
            await cacheClient.set(
                `story:${data.storyId}:names`,
                JSON.stringify(names),
            )
        }

        const [createdScene, createSceneError] = await step.run(
            'Create Scene in DB',
            () =>
                handleAsync(
                    Story.createScene({
                        storyId: data.storyId,
                        content,
                        narrationUrl: null,
                        orderIndex: data.sceneNumber,
                        tone: scene.tone.id,
                        setting: scene.setting.id,
                        tensionLevel: scene.tensionLevel.id,
                    }),
                ),
        )
        if (createSceneError) {
            console.error(
                `📨❌ Error creating scene in DB: ${createSceneError}`,
            )
            return { status: 'failed', error: createSceneError }
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
            console.error(
                `📨❌ Error posting to connection: ${postToConnectionError.message}`,
            )
        }

        if (data.length.name === StoryLengthEnum.Novelette) {
            if (data.sceneNumber === 5) {
                await orchestrationClient.send({
                    name: 'finish.story',
                    data: { storyId: data.storyId, ownerId: data.ownerId },
                })
            } else {
                await cacheClient.set(
                    `novelette:scene:${data.storyId}:${data.sceneNumber}:summary`,
                    summary,
                )
                await orchestrationClient.send({
                    name: 'create.scene',
                    data: { ...data, sceneNumber: data.sceneNumber + 1 },
                })
            }
        } else if (
            data.length.name === StoryLengthEnum.Short &&
            data.sceneNumber === 3
        ) {
            await orchestrationClient.send({
                name: 'finish.story',
                data: { storyId: data.storyId, ownerId: data.ownerId },
            })
        } else if (data.length.name === StoryLengthEnum.Mini) {
            if (data.includeNarration) {
                await orchestrationClient.send({
                    name: 'create.narration',
                    data: {
                        ownerId: data.ownerId,
                        storyId: data.storyId,
                        sceneId: createdScene!.id,
                        content: content,
                        voice: data.narrationVoice!,
                    },
                })
            } else {
                await orchestrationClient.send({
                    name: 'finish.story',
                    data: { storyId: data.storyId, ownerId: data.ownerId },
                })
            }
        } else {
            await cacheClient.set(
                `${data.length.name.toLowerCase()}:scene:${data.storyId}:${data.sceneNumber}:summary`,
                summary,
            )
            await orchestrationClient.send({
                name: 'create.scene',
                data: { ...data, sceneNumber: data.sceneNumber + 1 },
            })
        }

        return { status: 'initiated' }
    },
)

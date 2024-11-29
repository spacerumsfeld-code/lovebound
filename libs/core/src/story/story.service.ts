import { db } from '@clients/db.client.ts'
import { NeonHttpDatabase } from 'drizzle-orm/neon-http'
import { ThemeEnum, GenreEnum, LengthEnum } from '../story/story.model.ts'
import { ToneEnum, SettingEnum, TensionEnum } from '../scene/scene.model.ts'
import { stories } from './story.sql.ts'
import { aiClient } from '@clients/openai.client.ts'
import { eq } from 'drizzle-orm/expressions'
import { scenes } from '@core'
import { cacheClient } from '@clients/cache.client.ts'

class StoryService {
    private store
    private aiClient
    private cache

    constructor(
        store: NeonHttpDatabase,
        client: typeof aiClient,
        cache: typeof cacheClient,
    ) {
        this.store = store
        this.aiClient = client
        this.cache = cache
    }

    public async getUserStories({ userId }: { userId: string }) {
        const userStories = await this.store
            .select({
                id: stories.id,
                coverUrl: stories.coverUrl,
                title: stories.title,
            })
            .from(stories)
            .where(eq(stories.ownerId, userId))

        return userStories
    }

    public async generateMiniContent({
        genre,
        tensionLevel,
        theme,
        tone,
        setting,
    }: {
        genre: GenreEnum
        tensionLevel: TensionEnum
        theme: ThemeEnum
        tone: ToneEnum
        setting: SettingEnum
    }) {
        const miniPrompt = await this.cache.get<string>('prompt:mini')
        const finalPrompt =
            miniPrompt +
            JSON.stringify({ genre, tensionLevel, theme, tone, setting })

        const generatedStoryContent =
            await this.aiClient.generateContent(finalPrompt)

        return {
            content: generatedStoryContent!,
        }
    }

    public async generateSceneContent({ prompt }: { prompt: string }) {
        const generatedSceneContent =
            await this.aiClient.generateContent(prompt)

        return {
            content: generatedSceneContent!,
        }
    }

    public async createStory({
        genre,
        ownerId,
        title,
        theme,
        length,
    }: {
        genre: GenreEnum
        ownerId: string
        title: string
        theme: ThemeEnum
        length: LengthEnum
    }) {
        const newStory = await this.store
            .insert(stories)
            .values({
                length,
                genre,
                theme,
                title,
                ownerId,
            })
            .returning({ id: stories.id })

        return { success: true, id: newStory[0].id }
    }

    public async createScene({
        storyId,
        content,
        narrationUrl,
        orderIndex = 0,
        tone,
        setting,
        tensionLevel,
    }: {
        storyId: number
        content: string
        narrationUrl: string | null
        orderIndex: number
        tone: ToneEnum
        setting: SettingEnum
        tensionLevel: TensionEnum
    }) {
        const newScene = await this.store
            .insert(scenes)
            .values({
                storyId,
                content,
                narrationUrl,
                orderIndex,
                tone,
                setting,
                tensionLevel,
            })
            .returning({ id: scenes.id })

        return { success: true, id: newScene[0].id }
    }

    updateStory = async ({
        id,
        coverUrl,
        inProgress,
    }: {
        id: number
        coverUrl?: string
        inProgress?: boolean
    }) => {
        await this.store
            .update(stories)
            .set({
                coverUrl,
                inProgress,
            })
            .where(eq(stories.id, id))

        return { success: true }
    }

    public async updateScene({
        id,
        narrationUrl,
    }: {
        id: number
        narrationUrl: string
    }) {
        await this.store
            .update(scenes)
            .set({
                narrationUrl,
            })
            .where(eq(scenes.id, id))

        return { success: true }
    }
}

export const storyService = new StoryService(db, aiClient, cacheClient)

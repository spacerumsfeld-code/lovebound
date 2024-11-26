import { db } from '@clients/db.client.ts'
import { NeonHttpDatabase } from 'drizzle-orm/neon-http'
import { ThemeEnum, GenreEnum, LengthEnum } from '../story/story.model.ts'
import { ToneEnum, SettingEnum, TensionEnum } from '../scene/scene.model.ts'
import { stories } from './story.sql.ts'
import { aiClient } from '@clients/openai.client.ts'
import { eq } from 'drizzle-orm/expressions'
import { scenes } from '@core'

class StoryService {
    private store
    private aiClient

    constructor(store: NeonHttpDatabase, client: typeof aiClient) {
        this.store = store
        this.aiClient = client
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
        const generatedStoryContent = await this.aiClient.generateMiniContent({
            tensionLevel,
            theme,
            genre,
            tone,
            setting,
        })

        return {
            content: generatedStoryContent,
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
    }: {
        id: number
        coverUrl: string
    }) => {
        await this.store
            .update(stories)
            .set({
                coverUrl,
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

export const storyService = new StoryService(db, aiClient)

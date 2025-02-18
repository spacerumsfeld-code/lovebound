import { db } from '@clients/db.client'
import { NeonHttpDatabase } from 'drizzle-orm/neon-http'

import { xAiClient } from '@clients/xAi.client'
import { aiClient } from '@clients/openai.client'

import { sql, desc } from 'drizzle-orm'
import { stories } from './story.sql'
import { eq, and } from 'drizzle-orm/expressions'

import { NarrationVoiceEnum, scenes } from '@core'
import { TItemInput } from '@client-types/item/item.model'

class StoryService {
    private store
    private openAiClient
    private basedClient

    constructor(
        store: NeonHttpDatabase,
        openAiClient: typeof aiClient,
        basedClient: typeof xAiClient,
    ) {
        this.store = store
        this.openAiClient = openAiClient
        this.basedClient = basedClient
    }

    public async getRecentStories({ userId }: { userId: string }) {
        const recentStories = await this.store
            .select({
                id: stories.id,
                title: stories.title,
                coverUrl: stories.coverUrl,
                inProgress: stories.inProgress,
            })
            .from(stories)
            .where(eq(stories.ownerId, userId))
            .orderBy(desc(stories.createdAt))
            .limit(10)

        return recentStories
    }

    public async getStories({
        userId,
        limit,
        offset,
        genre,
        theme,
    }: {
        userId: string
        limit: number
        offset: number
        genre: number
        theme: number
    }) {
        const query = db
            .select({
                id: stories.id,
                title: stories.title,
                coverUrl: stories.coverUrl,
                inProgress: stories.inProgress,
                genre: stories.genre,
                theme: stories.theme,
                length: stories.length,
                ownerId: stories.ownerId,
                scenes: sql<string>`
            JSON_AGG(
              JSON_BUILD_OBJECT(
                'id', ${scenes.id},
                'content', ${scenes.content},
                'narrationUrl', ${scenes.narrationUrl},
                'order_index', ${scenes.orderIndex}
              )
            )`,
            })
            .from(stories)
            .innerJoin(scenes, eq(stories.id, scenes.storyId))
            .groupBy(stories.id)
            .orderBy(desc(stories.createdAt))
            .limit(limit)
            .offset(offset)

        if (!genre && !theme) {
            query.where(eq(stories.ownerId, userId))
        } else if (genre && !theme) {
            query.where(
                and(eq(stories.ownerId, userId), eq(stories.genre, genre)),
            )
        } else if (!genre && theme) {
            query.where(
                and(eq(stories.ownerId, userId), eq(stories.theme, theme)),
            )
        } else if (genre && theme) {
            query.where(
                and(
                    eq(stories.ownerId, userId),
                    eq(stories.genre, genre),
                    eq(stories.theme, theme),
                ),
            )
        }

        const result = await query
        return result
    }

    public async generateSceneContent({ prompt }: { prompt: string }) {
        const generatedSceneContent =
            await this.basedClient.generateContent(prompt)

        return {
            content: generatedSceneContent!,
        }
    }

    public async generateNarration({
        content,
        voice,
    }: {
        content: string
        voice: NarrationVoiceEnum
    }) {
        const narrationAudioBuffer =
            await this.openAiClient.generateStoryNarration(content, voice)

        return {
            buffer: narrationAudioBuffer!,
        }
    }

    public async createStory({
        genre,
        ownerId,
        title,
        theme,
        length,
        coverUrl,
    }: {
        genre: TItemInput
        ownerId: string
        title: string
        theme: TItemInput
        length: TItemInput
        coverUrl: string
    }) {
        const newStory = await this.store
            .insert(stories)
            .values({
                length: length.id,
                genre: genre.id,
                theme: theme.id,
                title,
                ownerId,
                coverUrl,
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
        tone: number
        setting: number
        tensionLevel: number
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

    public async createStoryCover({
        genre,
        theme,
        setting,
    }: {
        genre: string
        theme: string
        setting: string
    }) {
        const coverUrl = await this.openAiClient.generateStoryCover({
            genre,
            theme,
            setting,
        })

        return coverUrl
    }
}

export const storyService = new StoryService(db, aiClient, xAiClient)

import { db } from '@clients/db.client.ts'
import { NeonHttpDatabase } from 'drizzle-orm/neon-http'
import { TStoryWithScenes } from '../story/story.model.ts'
import { stories } from './story.sql.ts'
import { aiClient } from '@clients/openai.client.ts'
import { eq, and } from 'drizzle-orm/expressions'
import { scenes } from '@core'
import { sql, desc } from 'drizzle-orm'

class StoryService {
    private store
    private aiClient

    constructor(store: NeonHttpDatabase, client: typeof aiClient) {
        this.store = store
        this.aiClient = client
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

        return { recentStories }
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
        return result as unknown as TStoryWithScenes[]
    }

    public async generateSceneContent({ prompt }: { prompt: string }) {
        const generatedSceneContent =
            await this.aiClient.generateContent(prompt)

        return {
            content: generatedSceneContent!,
        }
    }

    public async generateNarration({ content }: { content: string }) {
        const narrationAudioBuffer =
            await this.aiClient.generateStoryNarration(content)

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
        genre: number
        ownerId: string
        title: string
        theme: number
        length: number
        coverUrl: string
    }) {
        const newStory = await this.store
            .insert(stories)
            .values({
                length,
                genre,
                theme,
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
}

export const storyService = new StoryService(db, aiClient)

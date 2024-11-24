import { db } from '@clients/db.client.ts'
import { NeonHttpDatabase } from 'drizzle-orm/neon-http'
import { TensionEnum, ThemeEnum, ToneEnum } from './story.model.ts'
import { stories } from './story.sql.ts'
import { aiClient } from '@clients/openai.client.ts'
import { eq } from 'drizzle-orm/expressions'

class StoryService {
    private store
    private aiClient

    constructor(store: NeonHttpDatabase, client: typeof aiClient) {
        this.store = store
        this.aiClient = client
    }

    public async getUserStories({ userId }: { userId: string }) {
        const userStories = await this.store
            .select()
            .from(stories)
            .where(eq(stories.ownerId, userId))

        return userStories
    }

    public async generateStoryContent({
        title,
        scenario,
        tensionLevel,
        theme,
        tone,
        setting,
    }: {
        userId: string
        title: string | null
        scenario: string | null
        tensionLevel: TensionEnum
        theme: ThemeEnum
        tone: ToneEnum
        setting: string
    }) {
        const generatedStoryContent = await this.aiClient.generateCompletion({
            title,
            scenario,
            tensionLevel,
            theme,
            tone,
            setting,
        })

        return {
            content: generatedStoryContent,
        }
    }

    public async createStory({
        ownerId,
        content,
        title,
        scenario,
        tensionLevel,
        theme,
        tone,
        setting,
    }: {
        ownerId: string
        content: string
        title: string
        scenario: string | null
        tensionLevel: TensionEnum
        theme: ThemeEnum
        tone: ToneEnum
        setting: string
    }) {
        const newStory = await this.store
            .insert(stories)
            .values({
                content,
                title,
                scenario,
                tensionLevel,
                theme,
                tone,
                setting,
                ownerId,
            })
            .returning({ id: stories.id })

        return { success: true, id: newStory[0].id }
    }

    updateStory = async ({
        id,
        coverImageUrl,
    }: {
        id: number
        coverImageUrl: string
    }) => {
        await this.store
            .update(stories)
            .set({
                coverUrl: coverImageUrl,
            })
            .where(eq(stories.id, id))

        return { success: true }
    }
}

export const storyService = new StoryService(db, aiClient)

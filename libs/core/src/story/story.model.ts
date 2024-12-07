import { TScene, ZScene } from '../scene/scene.model.ts'
import { z } from 'zod'

export const ZStory = z.object({
    // core
    id: z.number().int(),
    ownerId: z.string().min(1),
    title: z.string().min(1),
    coverUrl: z.string().nullable(),
    // ItemIds
    genre: z.number(),
    theme: z.number(),
    length: z.number(),
})
export type TStory = z.infer<typeof ZStory>

export const mapCreateStoryZodErrorsToSentences = (
    errors: z.ZodError,
): string => {
    switch (errors.issues.flatMap((issue) => issue.path)[0]) {
        case 'title':
            return "❌ Don't forget to name your story"
        case 'genre':
            return "❌ Don't forget to add a genre to your story."
        case 'theme':
            return "❌ Don't forget to add a theme to your story."
        case 'length':
            return "❌ Don't forget to add a length to your story."
        case 'scenes':
            return "❌ Don't forget to add scene details to your story."
        default:
            return '❌ Something went wrong. Please try again.'
    }
}

export const ZCreateStory = ZStory.extend({
    ownerId: z.string(),
    includeNarration: z.boolean(),
    scenes: z.array(
        ZScene.omit({
            id: true,
            storyId: true,
            orderIndex: true,
            narrationUrl: true,
            content: true,
        }),
    ),
}).omit({ id: true, coverUrl: true })
export type TCreateStory = z.infer<typeof ZCreateStory>

export const ZCreateStoryClient = ZCreateStory.omit({
    ownerId: true,
})
export type TCreateStoryClient = z.infer<typeof ZCreateStoryClient>

export const ZStoryCreatedEvent = z.object({
    title: z.string(),
    ownerId: z.string(),
    storyId: z.number(),
    scenes: z.array(
        ZScene.omit({
            storyId: true,
            narrationUrl: true,
            orderIndex: true,
        }),
    ),
    includeNarration: z.boolean(),
})
export type TStoryCreatedEvent = z.infer<typeof ZStoryCreatedEvent>

export interface TStoryWithScenes {
    id: number
    inProgress: boolean
    title: string
    genre: number
    theme: number
    length: number
    coverUrl: string
    scenes: TScene[]
}

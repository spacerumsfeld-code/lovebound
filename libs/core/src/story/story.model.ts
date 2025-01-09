import { ZItemInput } from '@client-types/item/item.model'
import { NarrationVoiceEnum, TScene, ZScene } from '../scene/scene.model'
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
        case 'narrationVoice':
            return "❌ Don't forget to select a narration voice."
        default:
            return '❌ Something went wrong. Please try again.'
    }
}

export const ZCreateStory = z.object({
    ownerId: z.string(),
    title: z.string().min(1),
    coverUrl: z.string().nullable().optional(),
    includeNarration: z.boolean(),
    narrationVoice: z.nativeEnum(NarrationVoiceEnum).nullable(),
    // ItemIds
    genre: ZItemInput,
    theme: ZItemInput,
    length: ZItemInput,
    scenes: z.array(
        ZScene.omit({
            id: true,
            storyId: true,
            orderIndex: true,
            narrationUrl: true,
            content: true,
        }),
    ),
})
export type TCreateStory = z.infer<typeof ZCreateStory>

export const ZCreateStoryClient = ZCreateStory.omit({
    ownerId: true,
})
export type TCreateStoryClient = z.infer<typeof ZCreateStoryClient>

export const ZInitialStoryData = z.object({
    title: z.string().min(1).optional().nullable(),
    includeNarration: z.boolean(),
    narrationVoice: z.nativeEnum(NarrationVoiceEnum).nullable(),
    // ItemIds
    genre: z.string(),
    theme: z.string(),
    length: z.string(),
    scenes: z.array(
        ZScene.omit({
            id: true,
            storyId: true,
            orderIndex: true,
            narrationUrl: true,
            content: true,
        }),
    ),
})
export type TInitialStoryData = z.infer<typeof ZInitialStoryData>

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
    narrationVoice: z.nativeEnum(NarrationVoiceEnum),
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

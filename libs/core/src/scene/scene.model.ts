import { z } from 'zod'

export const ZScene = z.object({
    // core
    id: z.number().int(),
    storyId: z.number().int(),
    content: z.string(),
    narrationUrl: z.string().nullable(),
    orderIndex: z.number().int(),
    // enums
    tone: z.number(),
    setting: z.number(),
    tensionLevel: z.number(),
})
export type TScene = z.infer<typeof ZScene>

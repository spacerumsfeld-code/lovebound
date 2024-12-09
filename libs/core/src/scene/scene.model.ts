import { ZItemInput } from '@client-types/item/item.model'
import { z } from 'zod'

export const ZScene = z.object({
    // core
    id: z.number().int(),
    storyId: z.number().int(),
    content: z.string(),
    narrationUrl: z.string().nullable(),
    orderIndex: z.number().int(),
    // enums
    tone: ZItemInput,
    setting: ZItemInput,
    tensionLevel: ZItemInput,
})
export type TScene = z.infer<typeof ZScene>

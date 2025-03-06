import { z } from 'zod'

export enum ItemTypeEnum {
    Genre = 'Genre',
    Theme = 'Theme',
    TensionLevel = 'TensionLevel',
    Tone = 'Tone',
    Setting = 'Setting',
    Length = 'Length',
    Pack = 'Pack',
    None = 'None',
}

export enum StoryLengthEnum {
    Mini = 'Mini',
    Short = 'Short',
    Novelette = 'Novelette',
    Novella = 'Novella',
    Novel = 'Novel',
}

export const activeStoryLengths = new Set<StoryLengthEnum>([
    StoryLengthEnum.Mini,
    StoryLengthEnum.Short,
    StoryLengthEnum.Novelette,
])

export type TItem = {
    id: number
    name: string
    description: string
    cost: number
    isDefault: boolean
    imageUrl: string
    type: ItemTypeEnum
}

export const ZItemInput = z.object({
    id: z.number(),
    name: z.string().min(1),
    imageUrl: z.string(),
})
export type TItemInput = z.infer<typeof ZItemInput>

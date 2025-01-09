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

export enum ThemeIdEnum {
    'None' = 0,
    'Forbidden Romance' = 12,
    'Best Friends to Lovers' = 13,
    'Enemies to Lovers' = 14,
    'Strangers with Instant Chemistry' = 15,
    'Love Rekindled' = 16,
    'Second Chance Romance' = 17,
    'Opposites Attract' = 18,
    'Workplace Romance' = 19,
    'Missed Connection Finally Realized' = 20,
    'Secret Admirer Revealed' = 21,
}

export enum GenreIdEnum {
    None = 0,
    Contemporary = 1,
    Historical = 2,
    Fantasy = 3,
    ScienceFiction = 4,
    Paranormal = 5,
    Thriller = 6,
    Adventure = 7,
    Mystery = 8,
}

export enum StoryLengthIdEnum {
    Mini = 23,
    Short = 24,
}
export const storyLengthMap = new Map<string, number>([
    ['Mini', 23],
    ['Short', 24],
])

export type TItem = {
    id: number
    name: string
    description: string
    cost: number
    isDefault: boolean
    imageUrl: string | null
    type: ItemTypeEnum
}

export const ZItemInput = z.object({
    id: z.number(),
    name: z.string().min(1),
    imageUrl: z.string().optional().nullable(),
})
export type TItemInput = z.infer<typeof ZItemInput>

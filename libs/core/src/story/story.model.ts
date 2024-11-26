import { ZScene } from '../scene/scene.model.ts'
import { z } from 'zod'

export enum GenreEnum {
    Contemporary = 'Contemporary Romance',
    Historical = 'Historical Romance',
    Fantasy = 'Fantasy Romance',
    ScienceFiction = 'Science Fiction Romance',
    Paranormal = 'Paranormal Romance',
    Thriller = 'Romantic Thriller',
    Comedy = 'Romantic Comedy',
    Drama = 'Romantic Drama',
    Adventure = 'Romantic Adventure',
    Mystery = 'Romantic Mystery',
}

export enum ThemeEnum {
    ForbiddenRomance = 'Forbidden romance',
    BestFriendsToLovers = 'Best friends to lovers',
    StrangersWithInstantChemistry = 'Strangers with instant chemistry',
    SecondChanceRomance = 'Second-chance romance',
    EnemiesToLovers = 'Enemies to lovers',
    OppositesAttract = 'Opposites attract',
    WorkplaceRomance = 'Workplace romance',
    MissedConnectionFinallyRealized = 'A missed connection finally realized',
    SecretAdmirerRevealed = 'Secret admirer revealed',
    LoveRekindledAfterYearsApart = 'Love rekindled after years apart',
}

export enum LengthEnum {
    Mini = 'Mini',
    Short = 'Short',
    Medium = 'Medium',
    Long = 'Long',
    Novella = 'Novella',
}

export const ZStory = z.object({
    // core
    id: z.number().int(),
    ownerId: z.string().min(1),
    title: z.string().min(1),
    coverUrl: z.string().nullable(),
    // enums
    genre: z.nativeEnum(GenreEnum),
    theme: z.nativeEnum(ThemeEnum),
    length: z.nativeEnum(LengthEnum),
})
export type TStory = z.infer<typeof ZStory>

export const ZCreateStory = ZStory.extend({
    userId: z.string(),
    includeNarration: z.boolean(),
    scenes: z.array(ZScene),
}).omit({ id: true })

export const ZCreateStoryClient = ZCreateStory.omit({ userId: true })

export enum ItemTypeEnum {
    Genre = 'Genre',
    Theme = 'Theme',
    Character = 'Character',
    Tone = 'Tone',
    Setting = 'Setting',
    Length = 'Length',
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

export enum GenreEnum {
    Contemporary = 'Contemporary Romance',
    Historical = 'Historical Romance',
    Fantasy = 'Fantasy Romance',
    ScienceFiction = 'Science Fiction Romance',
    Paranormal = 'Paranormal Romance',
    Thriller = 'Romantic Thriller',
    Adventure = 'Romantic Adventure',
    Mystery = 'Romantic Mystery',
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

export enum LengthEnum {
    Mini = 'Mini',
    Short = 'Short',
    Medium = 'Medium',
    Long = 'Long',
    Novella = 'Novella',
}

export type TItem = {
    id: number
    name: string
    description: string
    cost: number
    isDefault: boolean
    imageUrl: string | null
    type: ItemTypeEnum
}

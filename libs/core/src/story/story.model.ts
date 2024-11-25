import { z } from 'zod'

export enum SettingEnum {
    CozyCoffeeShop = 'A cozy coffee shop',
    DimlyLitJazzBar = 'A dimly lit jazz bar',
    BustlingCityPark = 'A bustling city park',
    SecludedBeachAtSunset = 'A secluded beach at sunset',
    SmallTownDiner = 'A small-town diner',
    LavishCocktailParty = 'A lavish cocktail party',
    RusticBarn = 'A rustic barn',
    MountainCabinDuringSnowstorm = 'A mountain cabin during a snowstorm',
    QuietLibrary = 'A quiet library',
    CandlelitRooftopTerrace = 'A candlelit rooftop terrace',
    RainyCityStreet = 'A rainy city street',
    VintageBookshop = 'A vintage bookshop',
    FlowerFilledMeadow = 'A flower-filled meadow',
    MoonlitGarden = 'A moonlit garden',
    QuaintBedAndBreakfast = 'A quaint bed-and-breakfast',
    CrowdedSubwayCar = 'A crowded subway car',
    LivelyFarmersMarket = "A lively farmer's market",
    ArtGalleryOpening = 'An art gallery opening',
    QuaintSeasidePier = 'A quaint seaside pier',
    VineyardAtHarvest = 'A vineyard at harvest',
    SmallFishingBoatOnLake = 'A small fishing boat on the lake',
    ElegantBallroom = 'An elegant ballroom',
    BustlingTrainStation = 'A bustling train station',
    SunnyCountrysideTrail = 'A sunny countryside trail',
    SkiLodgeByRoaringFire = 'A ski lodge by a roaring fire',
    CozyBookstoreCafe = 'A cozy bookstore café',
    MusicFestivalUnderStars = 'A music festival under the stars',
    SereneForestClearing = 'A serene forest clearing',
    RooftopPoolAtCityHotel = 'A rooftop pool at a city hotel',
    SunflowerFieldInSummer = 'A sunflower field in summer',
    DesertUnderStarlitSky = 'A desert under a starlit sky',
    LocalGymDuringQuietEvening = 'A local gym during a quiet evening',
    CharmingVillageSquare = 'A charming village square',
    CrowdedWeddingReception = 'A crowded wedding reception',
    CarnivalAtNight = 'A carnival at night',
    BoatDockAtSunrise = 'A boat dock at sunrise',
    HighRiseOfficeAfterHours = 'A high-rise office after hours',
    CollegeCampusLibrary = 'A college campus library',
    PublicGardenInBloom = 'A public garden in bloom',
    TrainCarOnLongJourney = 'A train car on a long journey',
    RainyLakesideCabin = 'A rainy lakeside cabin',
    SmallChapelInWoods = 'A small chapel in the woods',
    HiddenSpeakeasy = 'A hidden speakeasy',
    PrivatePlaneMidFlight = 'A private plane mid-flight',
    QuietFishingDock = 'A quiet fishing dock',
    BackyardBarbecue = 'A backyard barbecue',
    BustlingOutdoorMarket = 'A bustling outdoor market',
    DimlyLitMovieTheater = 'A dimly lit movie theater',
    PicturesqueLighthouse = 'A picturesque lighthouse',
    HistoricalMansionOnStormyNight = 'A historical mansion on a stormy night',
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

export enum ToneEnum {
    Dreamy = 'Dreamy',
    Intense = 'Intense',
    Playful = 'Playful',
    Passionate = 'Passionate',
    Lighthearted = 'Lighthearted',
    Mysterious = 'Mysterious',
    Whimsical = 'Whimsical',
    Emotional = 'Emotional',
    Tender = 'Tender',
    Sultry = 'Sultry',
}

export enum TensionEnum {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High',
    Intense = 'Intense',
    Max = 'Max',
}

export enum LengthEnum {
    Mini = 'Mini',
    Short = 'Short',
    Medium = 'Medium',
    Long = 'Long',
    Novella = 'Novella',
}

export enum LengthToWordEnum {
    Mini = '100',
    Short = '1000',
    Medium = 'changeme',
    Long = 'changeme',
    Novella = 'changeme',
}

export const StorySchema = z.object({
    id: z.number(),
    ownerId: z.string(),
    title: z.string(),
    scenario: z.string().nullable(),
    tensionLevel: z.nativeEnum(TensionEnum),
    theme: z.nativeEnum(ThemeEnum),
    tone: z.nativeEnum(ToneEnum),
    setting: z.nativeEnum(SettingEnum),
    content: z.string(),
    coverUrl: z.string().nullable(),
})
export type TStory = z.infer<typeof StorySchema>

export const ZCreateStory = z.object({
    userId: z.string(),
    scenario: z.string().nullable(),
    selectedTheme: z.nativeEnum(ThemeEnum),
    selectedTone: z.nativeEnum(ToneEnum),
    selectedSetting: z.nativeEnum(SettingEnum),
    tension: z.nativeEnum(TensionEnum),
    length: z.nativeEnum(LengthEnum),
    storyTitle: z.string(),
    includeNarration: z.boolean(),
})
export const ZCreateStoryClient = ZCreateStory.omit({
    userId: true,
})

export const storySubmittedEventSchema = z.object({
    ownerId: z.string(),
    title: z.string(),
    scenario: z.string().optional(),
    tensionLevel: z.nativeEnum(TensionEnum),
    theme: z.nativeEnum(ThemeEnum),
    tone: z.nativeEnum(ToneEnum),
    setting: z.nativeEnum(SettingEnum),
    length: z.nativeEnum(LengthEnum),
    includeNarration: z.boolean(),
})
export type StorySubmittedEvent = z.infer<typeof storySubmittedEventSchema>

export const storyCreatedEventSchema = z.object({
    ownerId: z.string(),
    title: z.string(),
    storyId: z.number(),
    setting: z.nativeEnum(SettingEnum),
    content: z.string(),
    includeNarration: z.boolean(),
})
export type StoryCreatedEvent = z.infer<typeof storyCreatedEventSchema>

export const settingOptions = [
    {
        label: SettingEnum.CozyCoffeeShop,
        href: 'https://cdn.sanity.io/images/vjg0x5qe/production/d766d7da3337b913722ab9d1e85536d4c78ee0c2-1024x1024.webp',
    },
    {
        label: SettingEnum.DimlyLitJazzBar,
        href: 'https://cdn.sanity.io/images/vjg0x5qe/production/1a21d8deb0b303d10701527654dd927a0abafcf7-1024x1024.webp',
    },
    {
        label: SettingEnum.BustlingCityPark,
        href: 'https://cdn.sanity.io/images/vjg0x5qe/production/1a9e9ec9936280618d1d85b62446fc937fcae009-1024x1024.webp',
    },
    {
        label: SettingEnum.SecludedBeachAtSunset,
        href: 'https://cdn.sanity.io/images/vjg0x5qe/production/699eeb94eea2c5c32f64bed2c88fe527c9f32d43-1024x1024.webp',
    },
    {
        label: SettingEnum.SmallTownDiner,
        href: 'https://cdn.sanity.io/images/vjg0x5qe/production/c991b0d4f0fa64b9d49d57f8a5a9de7a80019497-1024x1024.webp',
    },
    {
        label: SettingEnum.LavishCocktailParty,
        href: 'https://cdn.sanity.io/images/vjg0x5qe/production/7bbeccdb80bbeb9e19124bfd7b90803133212f96-1024x1024.webp',
    },
    {
        label: SettingEnum.RusticBarn,
        href: 'https://cdn.sanity.io/images/vjg0x5qe/production/28a3883d216de96246ad1d3c534d6f79b1035aa4-1024x1024.webp',
    },
    {
        label: SettingEnum.MountainCabinDuringSnowstorm,
        href: 'https://cdn.sanity.io/images/vjg0x5qe/production/d55320d615e6665b79ade3e1593b856b7989c53d-1024x1024.webp',
    },
    {
        label: SettingEnum.QuietLibrary,
        href: 'https://cdn.sanity.io/images/vjg0x5qe/production/2791cf666a111fa931ac092e069594cb7589ac32-1024x1024.webp',
    },
    {
        label: SettingEnum.CandlelitRooftopTerrace,
        href: 'https://cdn.sanity.io/images/vjg0x5qe/production/b6c91541b655e1382aa3c79ef9a924aecb94c374-1024x1024.webp',
    },
]

export const toneOptions = [
    {
        label: ToneEnum.Dreamy,
        href: 'https://cdn.sanity.io/images/vjg0x5qe/production/8010ef3b5306dd179a71ec27ede03a52d7624e80-1024x1024.webp',
    },
]

export const themeOptions = [
    {
        label: ThemeEnum.ForbiddenRomance,
        href: 'https://cdn.sanity.io/images/vjg0x5qe/production/08a70f8178585445a64dcdf4ef5a9cfdf1d3371a-1024x1024.webp',
    },
    {
        label: ThemeEnum.BestFriendsToLovers,
        href: 'https://cdn.sanity.io/images/vjg0x5qe/production/228e97285cabf6f4dc3873bd69a201d6414dca85-1024x1024.webp',
    },
    {
        label: ThemeEnum.EnemiesToLovers,
        href: 'https://cdn.sanity.io/images/vjg0x5qe/production/c7f7580f670c57056f676ec29c5e7244b711a6b5-1024x1024.webp',
    },
    {
        label: ThemeEnum.StrangersWithInstantChemistry,
        href: 'https://cdn.sanity.io/images/vjg0x5qe/production/476d055e4c80f8f547c308747028287067405652-1024x1024.webp',
    },
    {
        label: ThemeEnum.LoveRekindledAfterYearsApart,
        href: 'https://cdn.sanity.io/images/vjg0x5qe/production/f83aac7da2f98dc8f2da2050cc676f5ff356c727-1024x1024.webp',
    },
    {
        label: ThemeEnum.MissedConnectionFinallyRealized,
        href: 'https://cdn.sanity.io/images/vjg0x5qe/production/f65c6c715e5f8dfc11efcb2e58dc31e896b69d9d-1024x1024.webp',
    },
    {
        label: ThemeEnum.SecondChanceRomance,
        href: 'https://cdn.sanity.io/images/vjg0x5qe/production/bfef431044833a2585a181a9fc2d489c84d7106c-1024x1024.webp',
    },
    {
        label: ThemeEnum.WorkplaceRomance,
        href: 'https://cdn.sanity.io/images/vjg0x5qe/production/d41adfb9ebb7e3bdf2dbd565ef7c9d7e2e885dcc-1024x1024.webp',
    },
    {
        label: ThemeEnum.OppositesAttract,
        href: 'https://cdn.sanity.io/images/vjg0x5qe/production/8605d37176005b1b6ebd1a77757810814c197532-1024x1024.webp',
    },
    {
        label: ThemeEnum.SecretAdmirerRevealed,
        href: 'https://cdn.sanity.io/images/vjg0x5qe/production/fea83cf8a4f0d344399b2409eba4fc5a4654f7ea-1024x1024.webp',
    },
]

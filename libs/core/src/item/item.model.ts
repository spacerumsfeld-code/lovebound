export enum ItemTypeEnum {
    Genre = 'Genre',
    Theme = 'Theme',
    TensionLevel = 'TensionLevel',
    Tone = 'Tone',
    Setting = 'Setting',
    Length = 'Length',
}

// Story-level Enums
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

// Scene-level Enums
export enum TensionEnum {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High',
    Intense = 'Intense',
    Max = 'Max',
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

export type TItem = {
    id: number
    name: string
    description: string
    cost: number
    isDefault: boolean
    imageUrl: string | null
    type: ItemTypeEnum
}

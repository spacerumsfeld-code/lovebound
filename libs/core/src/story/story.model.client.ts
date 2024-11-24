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
// this has got to go into a caching layer at enum KEY, I hate having huge objects lying around
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
        href: 'https://cdn.sanity.io/images/vjg0x5qe/production/c991b0d4f0fa64b9d49d57f8a5a9de7a80019497-1024x1024.webp',
    },
    {
        label: SettingEnum.CandlelitRooftopTerrace,
        // href: 'https://cdn.sanity.io/images/vjg0x5qe/production/7bbeccdb80bbeb9e19124bfd7b90803133212f96-1024x1024.webp',
    },
    {
        label: SettingEnum.RainyCityStreet,
        // href: 'https://cdn.sanity.io/images/vjg0x5qe/production/699eeb94eea2c5c32f64bed2c88fe527c9f32d43-1024x1024.webp',
    },
    {
        label: SettingEnum.VintageBookshop,
        // href: 'https://cdn.sanity.io/images/vjg0x5qe/production/1a21d8deb0b303d10701527654dd927a0abafcf7-1024x1024.webp',
    },
    {
        label: SettingEnum.FlowerFilledMeadow,
        // href: 'https://cdn.sanity.io/images/vjg0x5qe/production/d766d7da3337b913722ab9d1e85536d4c78ee0c2-1024x1024.webp',
    },
    {
        label: SettingEnum.MoonlitGarden,
        // href: 'https://cdn.sanity.io/images/vjg0x5qe/production/28a3883d216de96246ad1d3c534d6f79b1035aa4-1024x1024.webp',
    },
    {
        label: SettingEnum.QuaintBedAndBreakfast,
        // href: 'https://cdn.sanity.io/images/vjg0x5qe/production/1a9e9ec9936280618d1d85b62446fc937fcae009-1024x1024.webp',
    },
    {
        label: SettingEnum.CrowdedSubwayCar,
        // href: 'https://cdn.sanity.io/images/vjg0x5qe/production/d55320d615e6665b79ade3e1593b856b7989c53d-1024x1024.webp',
    },
    {
        label: SettingEnum.LivelyFarmersMarket,
        // href: 'https://cdn.sanity.io/images/vjg0x5qe/production/7bbeccdb80bbeb9e19124bfd7b90803133212f96-1024x1024.webp',
    },
    {
        label: SettingEnum.ArtGalleryOpening,
        // href: 'https://cdn.sanity.io/images/vjg0x5qe/production/c991b0d4f0fa64b9d49d57f8a5a9de7a80019497-1024x1024.webp',
    },
    {
        label: SettingEnum.QuaintSeasidePier,
        // href: 'https://cdn.sanity.io/images/vjg0x5qe/production/699eeb94eea2c5c32f64bed2c88fe527c9f32d43-1024x1024.webp',
    },
    {
        label: SettingEnum.VineyardAtHarvest,
        // href: 'https://cdn.sanity.io/images/vjg0x5qe/production/1a21d8deb0b303d10701527654dd927a0abafcf7-1024x1024.webp',
    },
    {
        label: SettingEnum.SmallFishingBoatOnLake,
        // href: 'https://cdn.sanity.io/images/vjg0x5qe/production/d766d7da3337b913722ab9d1e85536d4c78ee0c2-1024x1024.webp',
    },
    {
        label: SettingEnum.ElegantBallroom,
        // href: 'https://cdn.sanity.io/images/vjg0x5qe/production/28a3883d216de96246ad1d3c534d6f79b1035aa4-1024x1024.webp',
    },
    {
        label: SettingEnum.BustlingTrainStation,
        // href: 'https://cdn.sanity.io/images/vjg0x5qe/production/d55320d615e6665b79ade3e1593b856b7989c53d-1024x1024.webp',
    },
    {
        label: SettingEnum.SunnyCountrysideTrail,
        // href: 'https://cdn.sanity.io/images/vjg0x5qe/production/7bbeccdb80bbeb9e19124bfd7b90803133212f96-1024x1024.webp',
    },
    {
        label: SettingEnum.SkiLodgeByRoaringFire,
        // href: 'https://cdn.sanity.io/images/vjg0x5qe/production/c991b0d4f0fa64b9d49d57f8a5a9de7a80019497-1024x1024.webp',
    },
    {
        label: SettingEnum.CozyBookstoreCafe,
        // href: 'https://cdn.sanity.io/images/vjg0x5qe/production/699eeb94eea2c5c32f64bed2c88fe527c9f32d43-1024x1024.webp',
    },
    {
        label: SettingEnum.MusicFestivalUnderStars,
        // href: 'https://cdn.sanity.io/images/vjg0x5qe/production/1a21d8deb0b303d10701527654dd927a0abafcf7-1024x1024.webp',
    },
    {
        label: SettingEnum.SereneForestClearing,
        // href: 'https://cdn.sanity.io/images/vjg0x5qe/production/d766d7da3337b913722ab9d1e85536d4c78ee0c2-1024x1024.webp',
    },
    {
        label: SettingEnum.RooftopPoolAtCityHotel,
        // href: 'https://cdn.sanity.io/images/vjg0x5qe/production/28a3883d216de96246ad1d3c534d6f79b1035aa4-1024x1024.webp',
    },
    {
        label: SettingEnum.SunflowerFieldInSummer,
        // href: 'https://cdn.sanity.io/images/vjg0x5qe/production/d55320d615e6665b79ade3e1593b856b7989c53d-1024x1024.webp',
    },
    {
        label: SettingEnum.DesertUnderStarlitSky,
        // href: 'https://cdn.sanity.io/images/vjg0x5qe/production/7bbeccdb80bbeb9e19124bfd7b90803133212f96-1024x1024.webp',
    },
    {
        label: SettingEnum.LocalGymDuringQuietEvening,
        // href: 'https://cdn.sanity.io/images/vjg0x5qe/production/c991b0d4f0fa64b9d49d57f8a5a9de7a80019497-1024x1024.webp',
    },
    {
        label: SettingEnum.CharmingVillageSquare,
        // href: 'https://cdn.sanity.io/images/vjg0x5qe/production/699eeb94eea2c5c32f64bed2c88fe527c9f32d43-1024x1024.webp',
    },
    {
        label: SettingEnum.CrowdedWeddingReception,
        // href: 'https://cdn.sanity.io/images/vjg0x5qe/production/1a21d8deb0b303d10701527654dd927a0abafcf7-1024x1024.webp',
    },
    {},
]

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

export interface StorySubmittedEvent {
    eventType: 'story.submitted'
    data: {
        userId: string
        title: string | null
        scenario: string | null
        tensionLevel: TensionEnum
        theme: ThemeEnum
        tone: ToneEnum
        setting: string
    }
}

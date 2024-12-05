import { db } from '../libs/clients/src/db.client'
import { ItemTypeEnum } from '../libs/core/src/item/item.model.ts'
import { items } from '../libs/core/src/item/item.sql.ts'

export enum SettingEnum {
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

const tensionLevelSeedItems = [
    {
        name: 'Low',
        description: 'Low tension',
        cost: 0,
        isDefault: true,
        imageUrl:
            'https://cdn.sanity.io/images/vjg0x5qe/production/b4a2630a4c3e0c7e17077a4e8b95d9e84aad9a08-1024x1024.webp',
        type: ItemTypeEnum.TensionLevel,
    },
]

const seed = async () => {
    await db.insert(items).values(tensionLevelSeedItems)
}

;(async () => {
    await seed()
})()

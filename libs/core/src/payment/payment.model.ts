import { StoryLengthEnum } from '@client-types/item/item.model'
import { z } from 'zod'

export enum ProductTypeEnum {
    Credits10Pack = 'Credits10Pack',
    Credits20Pack = 'Credits20Pack',
    Credits50Pack = 'Credits50Pack',
    CasualSubscription = 'CasualSubscription',
    PremiumSubscription = 'PremiumSubscription',
}

export enum PriceIdToProductTypeEnum {
    // dev
    'price_1QStaQLZGjrJKEOlBhU4C3BM' = ProductTypeEnum.CasualSubscription,
    'price_1QlycXLZGjrJKEOlrQtfZv8H' = ProductTypeEnum.PremiumSubscription,
    // prod
    'price_1Qnl8YLZGjrJKEOlz03SpdfU' = ProductTypeEnum.CasualSubscription,
    'price_1QnlAkLZGjrJKEOl6ReGjaJ2' = ProductTypeEnum.PremiumSubscription,
}

export const subscriptionSet = new Set<ProductTypeEnum>([
    ProductTypeEnum.CasualSubscription,
    ProductTypeEnum.PremiumSubscription,
])

export enum CreditCountEnum {
    Credits10Pack = 10,
    Credits20Pack = 20,
    Credits50Pack = 50,
    CasualSubscription = 10,
    PremiumSubscription = 30,
}

export const ZStripeMetadata = z.object({
    userId: z.string(),
    productType: z.nativeEnum(ProductTypeEnum),
    customerEmail: z.string(),
})

export const ZStripeSubscriptionMetadata = ZStripeMetadata.omit({
    productType: true,
})

export const StoryLengthCostMap = {
    [StoryLengthEnum.Mini]: 1,
    [StoryLengthEnum.Short]: 2,
    [StoryLengthEnum.Novelette]: 3,
    [StoryLengthEnum.Novella]: 4,
    [StoryLengthEnum.Novel]: 5,
}

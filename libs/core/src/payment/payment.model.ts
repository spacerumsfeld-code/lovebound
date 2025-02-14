import { Resource } from 'sst'
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

export const ProductIdEnum: Record<ProductTypeEnum, string> = {
    [ProductTypeEnum.Credits10Pack]:
        Resource.Environment.value === 'production'
            ? 'price_1Qnl8mLZGjrJKEOlHtbdHj4e'
            : 'price_1QStXILZGjrJKEOlJyokkZVC',
    [ProductTypeEnum.Credits20Pack]:
        Resource.Environment.value === 'production'
            ? 'price_1Qnl8qLZGjrJKEOlqJv3ON88'
            : 'price_1QSthLLZGjrJKEOlrABFyIR7',
    [ProductTypeEnum.Credits50Pack]:
        Resource.Environment.value === 'production'
            ? 'price_1Qnl8sLZGjrJKEOl4FE2CCYX'
            : 'price_1QStjoLZGjrJKEOlooXjFf8m',
    [ProductTypeEnum.CasualSubscription]:
        Resource.Environment.value === 'production'
            ? 'price_1Qnl8YLZGjrJKEOlz03SpdfU'
            : 'price_1QStaQLZGjrJKEOlBhU4C3BM',
    [ProductTypeEnum.PremiumSubscription]:
        Resource.Environment.value === 'production'
            ? 'price_1Qnl9yLZGjrJKEOlwWg8pKdG'
            : 'price_1QlycXLZGjrJKEOlrQtfZv8H',
}

export const ZStripeMetadata = z.object({
    userId: z.string(),
    productType: z.nativeEnum(ProductTypeEnum),
    customerEmail: z.string(),
})

export const ZStripeSubscriptionMetadata = ZStripeMetadata.omit({
    productType: true,
})

export const StoryIdToCostMap = {
    23: 1,
    24: 2,
} as { [key: number]: number }

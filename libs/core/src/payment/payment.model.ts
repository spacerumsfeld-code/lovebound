import { LengthEnum } from '@client-types/item/item.model.ts'
import { z } from 'zod'

export enum ProductTypeEnum {
    Credits10Pack = 'Credits10Pack',
    Credits20Pack = 'Credits20Pack',
    Credits50Pack = 'Credits50Pack',
    MiniSubscription = 'MiniSubscription',
    PremiumSubscription = 'PremiumSubscription',
}

export const subscriptionSet = new Set<ProductTypeEnum>([
    ProductTypeEnum.MiniSubscription,
])

export enum CreditCountEnum {
    Credits10Pack = 10,
    Credits20Pack = 20,
    Credits50Pack = 50,
    MiniSubscription = 10,
    PremiumSubscription = 30,
}

export enum ProductIdEnum {
    Credits10Pack = 'price_1QStXILZGjrJKEOlJyokkZVC',
    Credits20Pack = 'price_1QSthLLZGjrJKEOlrABFyIR7',
    Credits50Pack = 'price_1QStjoLZGjrJKEOlooXjFf8m',
    MiniSubscription = 'price_1QStaQLZGjrJKEOlBhU4C3BM',
    PremiumSubscription = 'price_1QStaQLZGjrJKEOlBhU4C3BM',
}

export const ZCheckoutCompleteMetadata = z.object({
    userId: z.string(),
    productType: z.nativeEnum(ProductTypeEnum),
})

export const StoryIdToCostMap = {
    23: 1,
    24: 2,
} as { [key: number]: number }

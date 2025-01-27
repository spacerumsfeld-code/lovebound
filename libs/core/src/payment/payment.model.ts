import { z } from 'zod'

export enum ProductTypeEnum {
    Credits10Pack = 'Credits10Pack',
    Credits20Pack = 'Credits20Pack',
    Credits50Pack = 'Credits50Pack',
    CasualSubscription = 'CasualSubscription',
}

export const subscriptionSet = new Set<ProductTypeEnum>([
    ProductTypeEnum.CasualSubscription,
])

export enum CreditCountEnum {
    Credits10Pack = 10,
    Credits20Pack = 20,
    Credits50Pack = 50,
    CasualSubscription = 10,
}

export enum ProductIdEnum {
    Credits10Pack = 'price_1QStXILZGjrJKEOlJyokkZVC',
    Credits20Pack = 'price_1QSthLLZGjrJKEOlrABFyIR7',
    Credits50Pack = 'price_1QStjoLZGjrJKEOlooXjFf8m',
    CasualSubscription = 'price_1QStaQLZGjrJKEOlBhU4C3BM',
}

export const ZStripeMetadata = z.object({
    userId: z.string(),
    productType: z.nativeEnum(ProductTypeEnum),
    customerEmail: z.string(),
})

export const StoryIdToCostMap = {
    23: 1,
    24: 2,
} as { [key: number]: number }

import { StoryLengthEnum } from '@client-types/item/item.model'
import { z } from 'zod'

export enum ProductTypeEnum {
    Credits10Pack = 'Credits10Pack',
    Credits20Pack = 'Credits20Pack',
    CreatorPass = 'CreatorPass',
}

export enum PriceIdToProductTypeEnum {
    // dev
    'price_1QztaJLZGjrJKEOl7NwyzbCz' = ProductTypeEnum.CreatorPass,
    // prod
    'price_1QztXcLZGjrJKEOl6BgnrMNz' = ProductTypeEnum.CreatorPass,
}

export const subscriptionSet = new Set<ProductTypeEnum>([
    ProductTypeEnum.CreatorPass,
])

export enum CreditCountEnum {
    Credits10Pack = 10,
    Credits20Pack = 20,
    CreatorPass = 25,
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

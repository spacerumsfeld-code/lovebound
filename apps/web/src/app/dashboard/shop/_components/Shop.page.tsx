import { ItemTypeEnum } from '@client-types/item/item.model'
import { ShopGrid } from './ShopGrid'
import { getGettingStartedFields } from '../../data'
import { updateUserExploreShop } from '../server'
import { ClientSideEffect } from 'src/app/_components/ClientSideEffect'

export const ShopPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
    // @Data
    const { gettingStartedFields } = await getGettingStartedFields()
    const updateUserPromise = updateUserExploreShop()

    const { type } = await searchParams
    const args = {
        limit: 16,
        offset: 0,
        type: (type ?? ItemTypeEnum.None) as ItemTypeEnum,
    }

    // @Render
    return (
        <>
            <ShopGrid args={args} />
            {!gettingStartedFields.gettingStartedExploreShop && (
                <ClientSideEffect promise={updateUserPromise} />
            )}
        </>
    )
}

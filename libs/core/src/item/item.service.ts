import { NeonHttpDatabase } from 'drizzle-orm/neon-http'
import { db } from '@clients/db.client'
import { items } from './item.sql'
import { eq, or, and, isNull, isNotNull } from 'drizzle-orm/expressions'
import { userInventory } from '@client-types/user/user.sql'
import { ItemTypeEnum } from './item.model'

class ItemService {
    private store

    constructor(store: NeonHttpDatabase) {
        this.store = store
    }

    public async getShopItems({
        userId,
        offset,
        limit,
        type,
    }: {
        userId: string
        offset: number
        limit: number
        type: ItemTypeEnum
    }) {
        const query = db
            .select({
                id: items.id,
                name: items.name,
                description: items.description,
                imageUrl: items.imageUrl,
                cost: items.cost,
                type: items.type,
            })
            .from(items)
            .leftJoin(
                userInventory,
                and(
                    eq(userInventory.itemId, items.id),
                    eq(userInventory.userId, userId),
                ),
            )
            .offset(offset)
            .limit(limit)

        if (type !== ItemTypeEnum.None) {
            query.where(
                and(
                    eq(items.isDefault, false),
                    eq(items.type, type),
                    isNull(userInventory.userId),
                ),
            )
        } else {
            query.where(
                and(eq(items.isDefault, false), isNull(userInventory.id)),
            )
        }

        const shopItems = await query

        return shopItems
    }

    public async getCreateStoryItems({ userId }: { userId: string }) {
        const createStoryItems = await this.store
            .select({
                id: items.id,
                type: items.type,
                name: items.name,
                imageUrl: items.imageUrl,
            })
            .from(items)
            .leftJoin(
                userInventory,
                and(
                    eq(userInventory.itemId, items.id),
                    eq(userInventory.userId, userId),
                ),
            )
            .where(
                or(eq(items.isDefault, true), isNotNull(userInventory.userId)),
            )

        return createStoryItems
    }
}

const itemService = new ItemService(db)
export const Item = itemService

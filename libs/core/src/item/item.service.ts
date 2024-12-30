import { NeonHttpDatabase } from 'drizzle-orm/neon-http'
import { db } from '@clients/db.client'
import { items } from './item.sql'
import { eq, ne, and } from 'drizzle-orm/expressions'
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
    }: {
        userId: string
        offset: number
        limit: number
    }) {
        const shopItems = await this.store
            .select()
            .from(items)
            .leftJoin(userInventory, ne(userInventory.userId, userId))
            .where(eq(items.isDefault, false))
            .offset(offset)
            .limit(limit)

        return { items: shopItems[0].items }
    }

    public async getAllGenres() {
        const genres = await this.store
            .select({
                id: items.id,
                name: items.name,
                imageUrl: items.imageUrl,
            })
            .from(items)
            .where(
                and(
                    eq(items.type, ItemTypeEnum.Genre),
                    eq(items.isDefault, true),
                ),
            )

        return genres
    }

    public async getAllThemes() {
        const themes = await this.store
            .select({
                id: items.id,
                name: items.name,
                imageUrl: items.imageUrl,
            })
            .from(items)
            .where(
                and(
                    eq(items.type, ItemTypeEnum.Theme),
                    eq(items.isDefault, true),
                ),
            )

        return themes
    }

    public async getAllLengths() {
        const lengths = await this.store
            .select({
                id: items.id,
                name: items.name,
                imageUrl: items.imageUrl,
            })
            .from(items)
            .where(
                and(
                    eq(items.type, ItemTypeEnum.Length),
                    eq(items.isDefault, true),
                ),
            )

        return lengths
    }

    public async getAllTensionLevels() {
        const tensionLevels = await this.store
            .select({
                id: items.id,
                name: items.name,
                imageUrl: items.imageUrl,
            })
            .from(items)
            .where(
                and(
                    eq(items.type, ItemTypeEnum.TensionLevel),
                    eq(items.isDefault, true),
                ),
            )

        return tensionLevels
    }

    public async getAllSettings() {
        const settings = await this.store
            .select({
                id: items.id,
                name: items.name,
                imageUrl: items.imageUrl,
            })
            .from(items)
            .where(
                and(
                    eq(items.type, ItemTypeEnum.Setting),
                    eq(items.isDefault, true),
                ),
            )

        return settings
    }

    public async getAllTones() {
        const tones = await this.store
            .select({
                id: items.id,
                name: items.name,
                imageUrl: items.imageUrl,
            })
            .from(items)
            .where(
                and(
                    eq(items.type, ItemTypeEnum.Tone),
                    eq(items.isDefault, true),
                ),
            )

        return tones
    }
}

const itemService = new ItemService(db)
export const Item = itemService

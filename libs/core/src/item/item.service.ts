import { NeonHttpDatabase } from 'drizzle-orm/neon-http'
import { db } from '@clients/db.client.ts'
import { ItemTypeEnum } from './item.model.ts'
import { items } from './item.sql.ts'
import { eq, and } from 'drizzle-orm/expressions'

// @TODO queries for getting all items for market page. (store page).
// these will be "get all for store MINUS defaults". this is because we dont purchase defaults.

// however, this is challenging because we also need to know if the user has purchased the item.
// we can do this by checking the userInventory table.
// so we will have a somewhat complicated query that gets all items minus defaults but then for each
// we get awareness of if it has been purchased by referencing the userInventory table.
// I think we will just render accordingly (cant purchase something you already own)

// meanwhile, for the create page, for now we will just get all default items.
// this is because we dont have the notion of purchased items yet.
// but we will have to do this in the future.

// we might need to do some by fetching all of each type of item, but then just like the market page,
// joining with userInvetory so we can render "own" or not. If NOT, we can have CTA to purchase.

// for both pages is the query any different? or can we "getAllGenres" for both and just add the userInventory stuff later.
// maybe one additional flag to exclude defaults, and thats what the market page will use.

class ItemService {
    private store

    constructor(store: NeonHttpDatabase) {
        this.store = store
    }

    public async getAllGenres() {
        const genres = await this.store
            .select()
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
            .select()
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
            .select()
            .from(items)
            .where(
                and(
                    eq(items.type, ItemTypeEnum.Length),
                    eq(items.isDefault, true),
                ),
            )

        return lengths
    }
}

const itemService = new ItemService(db)
export const Item = itemService

import { db } from '../libs/clients/src/db.client'
// import { ItemTypeEnum } from '../libs/core/src/item/item.model.ts'
import { items } from '../libs/core/src/item/item.sql.ts'

const seedItems = []

const seed = async () => {
    await db.insert(items).values(seedItems)
}

;(async () => {
    await seed()
})()

import { z } from 'zod'
import { router } from '../_internals/router.ts'
import { baseProcedure } from '../_internals/index.ts'
import { HTTPException } from 'hono/http-exception'
import { Item } from '@core'
import { extractFulfilledValues } from '@utils'

export const itemRouter = router({
    getAllItems: baseProcedure
        .input(
            z.object({
                userId: z.string(),
            }),
        )
        .query(async ({ c, input }) => {
            console.info(
                `Invoked itemRouter.getAllItems with data ${JSON.stringify(
                    input,
                )}`,
            )

            const itemPromises = [
                Item.getAllGenres(),
                Item.getAllThemes(),
                Item.getAllLengths(),
                Item.getAllTensionLevels(),
                Item.getAllSettings(),
                Item.getAllTones(),
            ]
            const itemResults = await Promise.allSettled(itemPromises)

            const {
                values: [
                    genres,
                    themes,
                    lengths,
                    tensionLevels,
                    settings,
                    tones,
                ],
                hasRejections,
            } = extractFulfilledValues(itemResults)
            if (hasRejections) {
                throw new HTTPException(400, {
                    message: 'Failed to get all items',
                })
            }

            return c.superjson({
                data: {
                    genres: genres!,
                    themes: themes!,
                    lengths: lengths!,
                    tensionLevels: tensionLevels!,
                    settings: settings!,
                    tones: tones!,
                },
                success: true,
            })
        }),
})

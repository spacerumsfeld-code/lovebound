import { z } from 'zod'
import { pipe } from '@utils'
import { router } from '../_internals/router'
import { baseProcedure } from '../_internals'

export const userRouter = router({
    getUserById: baseProcedure
        .input(
            z.object({
                id: z.number().int(),
            }),
        )
        .query(async ({ c, input }) =>
            pipe(input, (context) => c.superjson({ data: { id: context.id } })),
        ),
})

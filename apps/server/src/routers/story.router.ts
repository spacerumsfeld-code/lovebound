import { z } from 'zod'
import { router } from '../_internals/router.ts'
import { handleAsync } from '@utils'
import { baseProcedure } from '../_internals/index.ts'
import { Story, ZCreateStory } from '@core'
import { orchestrationClient } from '@clients/orchestration.client.ts'
import { HTTPException } from 'hono/http-exception'

export const storyRouter = router({
    getStories: baseProcedure
        .input(
            z.object({
                userId: z.string(),
            }),
        )
        .query(async ({ c, input }) => {
            console.info(
                `Invoked storyRouter.getStories with data ${JSON.stringify(
                    input,
                )}`,
            )

            const [getStories, getStoriesError] = await handleAsync(
                Story.getStories({
                    userId: input.userId,
                }),
            )
            if (getStoriesError) {
                throw new HTTPException(400, {
                    message: getStoriesError.message,
                })
            }

            return c.superjson({
                data: getStories!,
                success: true,
            })
        }),
    getRecentStories: baseProcedure
        .input(
            z.object({
                userId: z.string(),
            }),
        )
        .query(async ({ c, input }) => {
            console.info(
                `Invoked storyRouter.getRecentStories with data: ${JSON.stringify(input)}`,
            )

            const [recentStories, getRecentStoriesError] = await handleAsync(
                Story.getRecentStories({ userId: input.userId }),
            )
            if (getRecentStoriesError) {
                throw new HTTPException(400, {
                    message: getRecentStoriesError.message,
                })
            }

            return c.superjson({
                data: recentStories!,
                success: true,
            })
        }),
    submitStory: baseProcedure
        .input(ZCreateStory)
        .mutation(async ({ c, input }) => {
            console.info(
                `Invoked storyRouter.submitStory with ${JSON.stringify(input)}`,
            )

            const [createdStory, createStoryError] = await handleAsync(
                Story.createStory({
                    length: input.length,
                    ownerId: input.ownerId,
                    title: input.title,
                    genre: input.genre,
                    theme: input.theme,
                    coverUrl:
                        'https://cdn.sanity.io/images/vjg0x5qe/production/a9cbbb5462d4138c55fc70f9ed9686fc58e40c4a-1024x1024.webp',
                }),
            )
            if (createStoryError) {
                throw new HTTPException(400, {
                    message: createStoryError.message,
                })
            }

            const [_, orchestrationError] = await handleAsync(
                orchestrationClient.send({
                    name: 'start.story',
                    data: { ...input, storyId: createdStory!.id },
                }),
            )
            if (orchestrationError) {
                throw new HTTPException(400, {
                    message: orchestrationError.message,
                })
            }

            return c.superjson({
                success: true,
                message: 'Story submitted successfully',
            })
        }),
})

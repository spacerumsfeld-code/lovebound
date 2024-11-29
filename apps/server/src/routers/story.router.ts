import { z } from 'zod'
import { router } from '../_internals/router.ts'
import { handleAsync } from '@utils'
import { baseProcedure } from '../_internals/index.ts'
import { Story, ZCreateStory } from '@core'
import { orchestrationClient } from '@clients/orchestration.client.ts'
import { HTTPException } from 'hono/http-exception'

export const storyRouter = router({
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
                }),
            )
            if (createStoryError) {
                throw new HTTPException(400, {
                    message: createStoryError.message,
                })
            }

            const [_, orchestrationError] = await handleAsync(
                orchestrationClient.send({
                    name: 'start.short.story',
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
    getUserStories: baseProcedure
        .input(
            z.object({
                userId: z.string(),
            }),
        )
        .query(async ({ c, input }) => {
            console.info(
                `Invoked storyRouter.getUserStories with data ${JSON.stringify(
                    input,
                )}`,
            )

            const [getUserStoriesResponse, userStoriesError] =
                await handleAsync(
                    Story.getUserStories({
                        userId: input.userId,
                    }),
                )
            if (userStoriesError) {
                throw new HTTPException(400, {
                    message: userStoriesError.message,
                })
            }

            return c.superjson({
                stories: getUserStoriesResponse!,
                success: true,
            })
        }),
})

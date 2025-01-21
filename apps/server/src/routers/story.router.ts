import { z } from 'zod'
import { router } from '../_internals/router'
import { handleAsync } from '@utils'
import { protectedProcedure } from '../_internals/index'
import { Payment, Story, ZCreateStory, Notification, User } from '@core'
import { orchestrationClient } from '@clients/orchestration.client'
import { HTTPException } from 'hono/http-exception'
import { storyLengthMap } from '@client-types/item/item.model'
import { EmailType } from '@transactional'

export const storyRouter = router({
    getStories: protectedProcedure
        .input(
            z.object({
                limit: z.number().int(),
                offset: z.number().int(),
                genre: z.number(),
                theme: z.number(),
            }),
        )
        .query(async ({ c, ctx, input }) => {
            console.info(
                `💻 Invoked storyRouter.getStories with data ${JSON.stringify(
                    input,
                )}`,
            )

            const [getStories, getStoriesError] = await handleAsync(
                Story.getStories({
                    userId: ctx.userId!,
                    limit: input.limit,
                    offset: input.offset,
                    genre: input.genre,
                    theme: input.theme,
                }),
            )
            if (getStoriesError) {
                throw new HTTPException(400, {
                    message: getStoriesError.message,
                })
            }

            const hasMore = !(getStories!.length < input.limit)
            const nextOffset = hasMore ? input.offset + input.limit : 0

            return c.superjson({
                data: {
                    stories: getStories!,
                    hasMore,
                    nextOffset,
                },
                success: true,
            })
        }),
    getRecentStories: protectedProcedure.query(async ({ c, input, ctx }) => {
        console.info(
            `💻 Invoked storyRouter.getRecentStories with data: ${JSON.stringify(input)}`,
        )

        const [recentStories, getRecentStoriesError] = await handleAsync(
            Story.getRecentStories({ userId: ctx.userId! }),
        )
        if (getRecentStoriesError) {
            throw new HTTPException(400, {
                message: getRecentStoriesError.message,
            })
        }

        return c.superjson({
            data: { recentStories: recentStories },
            success: true,
        })
    }),
    submitStory: protectedProcedure
        .input(ZCreateStory)
        .mutation(async ({ c, input, ctx }) => {
            console.info(
                `💻 Invoked storyRouter.submitStory with ${JSON.stringify(input)}`,
            )

            const [createdStory, createStoryError] = await handleAsync(
                Story.createStory({
                    length: input.length,
                    ownerId: ctx.userId!,
                    title: input.title,
                    genre: input.genre,
                    theme: input.theme,
                    coverUrl:
                        'https://cdn.sanity.io/images/vjg0x5qe/production/a9cbbb5462d4138c55fc70f9ed9686fc58e40c4a-1024x1024.webp',
                }),
            )
            if (createStoryError) {
                console.error(`❌ createStory error:`, createStoryError)
                throw new HTTPException(400, {
                    message: createStoryError.message,
                })
            }

            const [, deductCreditsError] = await handleAsync(
                Payment.deductCredits({
                    userId: ctx.userId!,
                    creditCost: (() => {
                        switch (input.length.id) {
                            case storyLengthMap.get('Mini')!:
                                return 1
                            case storyLengthMap.get('Short')!:
                                return 2
                            default:
                                return 1
                        }
                    })(),
                }),
            )
            if (deductCreditsError) {
                console.error(`❌ deductCredits error:`, deductCreditsError)
                throw new HTTPException(400, {
                    message: deductCreditsError.message,
                })
            }

            const [, orchestrationError] = await handleAsync(
                orchestrationClient.send({
                    name: 'start.story',
                    data: {
                        ...input,
                        userId: ctx.userId!,
                        storyId: createdStory!.id,
                    },
                }),
            )
            if (orchestrationError) {
                console.error(`❌ orchestration error:`, orchestrationError)
                throw new HTTPException(400, {
                    message: orchestrationError.message,
                })
            }

            const [userEmail, getUserEmailError] = await handleAsync(
                User.getUserEmail({ userId: ctx.userId! }),
            )
            if (getUserEmailError) {
                console.error(`❌ getUserEmail error:`, getUserEmailError)
                throw new HTTPException(400, {
                    message: getUserEmailError.message,
                })
            }

            const [, sendEmailError] = await handleAsync(
                Notification.sendEmail({
                    to: userEmail!,
                    emailType: EmailType.StoryCreated,
                }),
            )
            if (sendEmailError) {
                console.error(`❌ sendWelcomeEmail error:`, sendEmailError)
                throw new HTTPException(400, {
                    message: sendEmailError.message,
                })
            }

            return c.superjson({
                success: true,
                message: 'Story submitted successfully',
            })
        }),
})

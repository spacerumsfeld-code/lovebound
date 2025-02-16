import { orchestrationClient } from '@clients/orchestration.client'
import { Notification, Story, User } from '@core'
import { EmailType } from '@transactional'
import { handleAsync } from '@utils'

export const finishStory = orchestrationClient.createFunction(
    { id: 'finish.story' },
    { event: 'finish.story' },
    async ({ event, step }) => {
        console.info(
            `📨 Invoked orchestration.finishStory with data: ${JSON.stringify(
                event.data,
            )}`,
        )
        const { data } = event

        const [, updateStoryError] = await step.run(
            'Mark Story as Complete',
            () =>
                handleAsync(
                    Story.updateStory({
                        id: data.storyId,
                        inProgress: false,
                    }),
                ),
        )
        if (updateStoryError) {
            console.error(
                `📨❌ Error updating story as complete: ${updateStoryError.message}`,
            )
            return {
                status: 'failed',
                error: updateStoryError,
            }
        }

        const [, postToConnectionError] = await step.run(
            'Post to connection',
            () =>
                handleAsync(
                    Notification.postToConnection({
                        userId: data.ownerId,
                        data: {
                            type: 'story.complete',
                            payload: {
                                storyId: data.storyId,
                            },
                        },
                    }),
                ),
        )
        if (postToConnectionError) {
            console.error(
                `📨❌ Error posting to connection: ${postToConnectionError.message}`,
            )
        }

        const [userEmail, getUserEmailError] = await handleAsync(
            User.getUserEmail({ userId: data.ownerId }),
        )
        if (getUserEmailError) {
            console.error(
                `📨❌ Error getting user email: ${getUserEmailError.message}`,
            )
            return {
                status: 'failed',
                message: getUserEmailError.message,
            }
        }

        const [, sendEmailError] = await step.run('Send Email', () =>
            handleAsync(
                Notification.sendEmail({
                    to: userEmail!,
                    emailType: EmailType.StoryCompleted,
                }),
            ),
        )
        if (sendEmailError) {
            console.error(`📨❌ Error sending email: ${sendEmailError.message}`)
            return {
                status: 'failed',
                error: sendEmailError,
            }
        }

        return { status: 'initiated' }
    },
)

import { SQSEvent, SQSRecord } from 'aws-lambda'

// @todo: provide run-time validation of events. (zod probably)

export const handler = async (event: SQSEvent) => {
    const records: SQSRecord[] = event.Records
    const { eventType, data } = JSON.parse(records[0].body)

    switch (eventType) {
        case 'story.submitted':
            // make request to author to begin creeating story.

            return {
                statusCode: 200,
                body: JSON.stringify({
                    success: true,
                    message: 'Author informed of story submission',
                }),
            }
        case 'story.created':
            console.info('Processing story created event')

            // let user know via email and in-app notification their story is done.
            // if image and or /voiceover, let them know it is actively being worked on.
            // let them go to see their story in the meantime though.
            // placeholder or cool skeleton of some kind or generic cover for time being.

            return {
                statusCode: 200,
                body: JSON.stringify({
                    success: true,
                    message: 'User informed of story creation',
                }),
            }
        case 'story.cover.generated':
            // let user know their cover story is ready!

            return {
                statusCode: 200,
                body: JSON.stringify({
                    success: true,
                    message: 'User informed of cover story generation',
                }),
            }
        default:
            console.log('Unknown event type')
            return {
                statusCode: 200,
                body: JSON.stringify({
                    success: false,
                    message: 'Unknown event type',
                }),
            }
    }
}

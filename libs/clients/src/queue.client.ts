import { Resource } from 'sst'
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs'
import {
    TCreateStory,
    TStoryCreatedEvent,
} from '@client-types/story/story.model.ts'

const sqs = new SQSClient({})

export const publishStorySubmittedEvent = async (data: TCreateStory) => {
    await sqs.send(
        new SendMessageCommand({
            QueueUrl: Resource.EventQueue.url,
            MessageBody: JSON.stringify({ eventType: 'story.submitted', data }),
        }),
    )

    return { success: true }
}

export const publishStoryCreatedEvent = async (data: TStoryCreatedEvent) => {
    await sqs.send(
        new SendMessageCommand({
            QueueUrl: Resource.EventQueue.url,
            MessageBody: JSON.stringify({ eventType: 'story.created', data }),
        }),
    )

    return { success: true }
}

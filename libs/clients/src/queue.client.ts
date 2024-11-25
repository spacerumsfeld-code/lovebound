import { Resource } from 'sst'
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs'
import { ThemeEnum, ToneEnum, TensionEnum, SettingEnum } from '@core'
import { LengthEnum } from '@client-types/story/story.model.ts'

const sqs = new SQSClient({})

export const publishStorySubmittedEvent = async (data: {
    ownerId: string
    title: string
    scenario: string | null
    tensionLevel: TensionEnum
    theme: ThemeEnum
    tone: ToneEnum
    setting: string
    length: LengthEnum
    includeNarration: boolean
}) => {
    await sqs.send(
        new SendMessageCommand({
            QueueUrl: Resource.EventQueue.url,
            MessageBody: JSON.stringify({ eventType: 'story.submitted', data }),
        }),
    )

    return { success: true }
}

export const publishStoryCreatedEvent = async (data: {
    ownerId: string
    title: string
    setting: SettingEnum
    storyId: number
    content: string
    includeNarration: boolean
}) => {
    await sqs.send(
        new SendMessageCommand({
            QueueUrl: Resource.EventQueue.url,
            MessageBody: JSON.stringify({ eventType: 'story.created', data }),
        }),
    )

    return { success: true }
}

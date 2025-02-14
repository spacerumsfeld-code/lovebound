import { getCurrentSubscriptionType } from '../../data'
import { getCreateStoryItems } from '../data'
import { CreateStoryView } from './CreateStory.view'

export const CreateStoryPage = async () => {
    // *Data
    const [
        { currentSubscriptionType },
        { genres, themes, lengths, tensionLevels, settings, tones },
    ] = await Promise.all([getCurrentSubscriptionType(), getCreateStoryItems()])

    console.info('currentSubscriptionType', currentSubscriptionType)

    // *Render
    return (
        <CreateStoryView
            items={{ genres, themes, lengths, tensionLevels, settings, tones }}
            currentSubscriptionType={currentSubscriptionType}
        />
    )
}

import { getCreditCount, getCurrentSubscriptionType } from '../../data'
import { getCreateStoryItems } from '../data'
import { CreateStoryView } from './CreateStory.view'

export const CreateStoryPage = async () => {
    // *Data
    const [
        { currentSubscriptionType },
        { creditCount },
        { genres, themes, lengths, tensionLevels, settings, tones },
    ] = await Promise.all([
        getCurrentSubscriptionType(),
        getCreditCount(),
        getCreateStoryItems(),
    ])

    // *Render
    return (
        <CreateStoryView
            items={{ genres, themes, lengths, tensionLevels, settings, tones }}
            currentSubscriptionType={currentSubscriptionType}
            creditCount={creditCount}
        />
    )
}

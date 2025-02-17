import { getCreditCount, getCurrentSubscriptionType } from '../../data'
import { getCreateStoryItems, checkIfUserHasCompletedTour } from '../data'
import { CreateStoryView } from './CreateStory.view'

export const CreateStoryPage = async () => {
    // *Data
    const [
        { currentSubscriptionType },
        { creditCount },
        { genres, themes, lengths, tensionLevels, settings, tones },
        { userHasCompletedTour },
    ] = await Promise.all([
        getCurrentSubscriptionType(),
        getCreditCount(),
        getCreateStoryItems(),
        checkIfUserHasCompletedTour(),
    ])

    // *Render
    return (
        <CreateStoryView
            items={{ genres, themes, lengths, tensionLevels, settings, tones }}
            currentSubscriptionType={currentSubscriptionType}
            creditCount={creditCount}
            userHasCompletedTour={userHasCompletedTour}
        />
    )
}

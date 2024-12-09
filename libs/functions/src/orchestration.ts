import { serve } from 'inngest/lambda'
import { orchestrationClient } from '@clients/orchestration.client'
import {
    createNarration,
    createScene,
    finishStory,
    startStoryCreation,
} from './story/index'
import { Resource } from 'sst'

process.env.INNGEST_SIGNING_KEY = Resource.InngestSigningKey.value

const handler = serve({
    client: orchestrationClient,
    functions: [startStoryCreation, createScene, createNarration, finishStory],
})

export { handler }

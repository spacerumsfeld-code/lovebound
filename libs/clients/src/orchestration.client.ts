import { EventSchemas, Inngest, LiteralZodEventSchema } from 'inngest'
import { Resource } from 'sst'
import { z } from 'zod'
import { ZCreateStory } from '@client-types/story/story.model.ts'

const ZStartShortStoryEvent = z.object({
    name: z.literal('start.short.story'),
    data: ZCreateStory.extend({ storyId: z.number() }),
}) satisfies LiteralZodEventSchema

const ZCreateSceneEvent = z.object({
    name: z.literal('create.scene'),
    data: ZCreateStory.extend({ sceneNumber: z.number(), storyId: z.number() }),
}) satisfies LiteralZodEventSchema

const ZFinishShortStoryEvent = z.object({
    name: z.literal('finish.short.story'),
    data: z.object({
        storyId: z.number(),
        ownerId: z.string(),
    }),
}) satisfies LiteralZodEventSchema

process.env.INNGEST_EVENT_KEY = Resource.InngestEventKey.value

export const orchestrationClient = new Inngest({
    name: 'Tension.io',
    id: 'tension-io',
    eventKey: process.env.INNGEST_EVENT_KEY!,
    schemas: new EventSchemas().fromZod([
        ZStartShortStoryEvent,
        ZCreateSceneEvent,
        ZFinishShortStoryEvent,
    ]),
})

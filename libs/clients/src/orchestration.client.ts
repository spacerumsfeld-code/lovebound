import { EventSchemas, Inngest, LiteralZodEventSchema } from 'inngest'
import { Resource } from 'sst'
import { z } from 'zod'
import { ZCreateStory } from '@client-types/story/story.model'
import { NarrationVoiceEnum } from '@client-types/scene/scene.model'

process.env.INNGEST_EVENT_KEY = Resource.InngestEventKey.value

const ZStartStoryEvent = z.object({
    name: z.literal('start.story'),
    data: ZCreateStory.extend({ storyId: z.number() }),
}) satisfies LiteralZodEventSchema

const ZCreateSceneEvent = z.object({
    name: z.literal('create.scene'),
    data: ZCreateStory.extend({ sceneNumber: z.number(), storyId: z.number() }),
}) satisfies LiteralZodEventSchema

const ZCreateNarrationEvent = z.object({
    name: z.literal('create.narration'),
    data: z.object({
        ownerId: z.string(),
        storyId: z.number(),
        sceneId: z.number(),
        content: z.string(),
        voice: z.nativeEnum(NarrationVoiceEnum),
    }),
}) satisfies LiteralZodEventSchema

const ZFinishStoryEvent = z.object({
    name: z.literal('finish.story'),
    data: z.object({
        storyId: z.number(),
        ownerId: z.string(),
    }),
}) satisfies LiteralZodEventSchema

export const orchestrationClient = new Inngest({
    name: 'Tension.io',
    id: 'tension-io',
    eventKey: process.env.INNGEST_EVENT_KEY!,
    schemas: new EventSchemas().fromZod([
        ZStartStoryEvent,
        ZCreateSceneEvent,
        ZFinishStoryEvent,
        ZCreateNarrationEvent,
    ]),
})

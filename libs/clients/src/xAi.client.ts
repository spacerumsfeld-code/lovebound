import OpenAI from 'openai'
import { Resource } from 'sst'
import { cacheClient } from './cache.client'
import { zodResponseFormat } from 'openai/helpers/zod'
import { z } from 'zod'

const openai = new OpenAI({
    apiKey: Resource.XAIApiKey.value,
    baseURL: Resource.XAIUrl.value,
})

export const generateContent = async (prompt: string) => {
    const systemPrompt = await cacheClient.get<string>('prompt:system')

    const completion = await openai.beta.chat.completions.parse({
        model: 'grok-2',
        n: 1,
        temperature: 0.8,
        stream: false,
        response_format: zodResponseFormat(
            z.object({
                content: z.string(),
                summary: z.string(),
                character1: z.string(),
                character2: z.string(),
            }),
            'scene',
        ),
        messages: [
            {
                role: 'system',
                content: systemPrompt!,
            },
            {
                role: 'user',
                content: prompt,
            },
        ],
    })

    return completion.choices[0].message.parsed
}

const xAiClient = {
    generateContent,
}

export { xAiClient }

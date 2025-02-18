import OpenAI from 'openai'
import { Resource } from 'sst'
import { cacheClient } from './cache.client'

const openai = new OpenAI({
    apiKey: Resource.XAIApiKey.value,
    baseURL: Resource.XAIUrl.value,
})

export const generateContent = async (prompt: string) => {
    const systemPrompt = await cacheClient.get<string>('prompt:system')

    const completion = await openai.chat.completions.create({
        model: 'grok-2',
        n: 1,
        temperature: 0.8,
        stream: false,
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

    return completion.choices[0].message.content
}

const xAiClient = {
    generateContent,
}

export { xAiClient }

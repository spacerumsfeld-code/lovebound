import OpenAI from 'openai'
import { Resource } from 'sst'
import { cacheClient } from './cache.client'
import { NarrationVoiceEnum } from '@client-types/scene/scene.model'

const openai = new OpenAI({
    apiKey: Resource.OpenAIApiKey.value,
})

export const generateContent = async (prompt: string) => {
    const systemPrompt = await cacheClient.get<string>('prompt:system')

    const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
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

export const generateStoryCover = async ({
    genre,
    theme,
    setting,
}: {
    genre: string
    theme: string
    setting: string
}) => {
    const coverPrompt = await cacheClient.get<string>('prompt:cover')
    const finalPrompt = coverPrompt!
        .replace('[genre]', genre)
        .replace('[theme]', theme)
        .replace('[setting]', setting)

    const response = await openai.images.generate({
        model: 'dall-e-3',
        prompt: `I NEED to test how the tool works with extremely simple prompts. DO NOT add any detail, just use it AS-IS: ${finalPrompt}`,
        n: 1,
        quality: 'standard',
        size: '1024x1024',
    })
    const imageUrl = response.data[0].url

    return imageUrl
}

export const generateStoryNarration = async (
    content: string,
    voice: NarrationVoiceEnum,
) => {
    const mp3 = await openai.audio.speech.create({
        model: 'tts-1',
        voice,
        input: content,
    })

    const buffer = Buffer.from(await mp3.arrayBuffer())
    return buffer
}

export const aiClient = {
    generateContent,
    generateStoryCover,
    generateStoryNarration,
}

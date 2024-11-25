import { SettingEnum, TensionEnum, ThemeEnum, ToneEnum } from '@core'
import OpenAI from 'openai'
import { Resource } from 'sst'

const openai = new OpenAI({
    apiKey: Resource.OpenAIApiKey.value,
})

export const generateCompletion = async (inputs: {
    title: string | null
    scenario: string | null
    tensionLevel: TensionEnum
    theme: ThemeEnum
    tone: ToneEnum
    setting: string
    wordCount: number
}) => {
    const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        n: 1,
        temperature: 0.8,
        stream: false,
        messages: [
            { role: 'system', content: Resource.OpenAISystemPrompt.value },
            {
                role: 'user',
                content:
                    Resource.OpenAIWritingPrompt.value + JSON.stringify(inputs),
            },
        ],
    })

    return completion.choices[0].message.content
}

//@ TODO: fine tune prompt, long term add more inputs.
export const generateStoryCover = async ({
    title,
    setting,
}: {
    title: string
    setting: SettingEnum
}) => {
    const response = await openai.images.generate({
        model: 'dall-e-3',
        prompt: `I NEED to test how the tool works with extremely simple prompts. DO NOT add any detail, just use it AS-IS: ${
            Resource.OpenAICoverPrompt.value +
            `title: ${title}, setting: ${setting}`
        }`,
        n: 1,
        quality: 'standard',
        size: '1024x1024',
    })
    const imageData = response.data[0].url

    return imageData
}

export const generateStoryNarration = async ({
    content,
}: {
    content: string
}) => {
    const mp3 = await openai.audio.speech.create({
        model: 'tts-1',
        voice: 'nova',
        input: content,
    })

    const buffer = Buffer.from(await mp3.arrayBuffer())
    return buffer
}

export const aiClient = {
    generateCompletion,
    generateStoryCover,
    generateStoryNarration,
}

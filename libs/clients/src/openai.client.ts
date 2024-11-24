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
}) => {
    const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        n: 1,
        temperature: 0.8,
        max_tokens: 1000,
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

export const generateStoryCover = async ({
    title,
    setting,
}: {
    title: string
    setting: SettingEnum
}) => {
    console.info('submitting cover request')
    const response = await openai.images.generate({
        model: 'dall-e-2',
        prompt:
            Resource.OpenAICoverPrompt.value +
            JSON.stringify({
                title,
                setting,
            }),
        n: 1,
        response_format: 'b64_json',
        size: '512x512',
    })
    const imageData = response.data[0].b64_json

    return imageData
}

export const aiClient = {
    generateCompletion,
    generateStoryCover,
}

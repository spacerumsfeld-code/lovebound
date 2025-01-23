import { TItemInput } from '../../../../libs/core/src/item/item.model'
import { TCreateStory } from '../../../../libs/core/src/story/story.model'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { TStoryInitialState } from '@client-types/story/story.model'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const createInitialStoryState = (
    defaultLength: TItemInput,
): TStoryInitialState => ({
    title: '',
    theme: null,
    genre: null,
    length: JSON.stringify(defaultLength),
    includeNarration: false,
    narrationVoice: null,
    scenes: [
        {
            tone: null,
            setting: null,
            tensionLevel: null,
        },
    ],
})

export const transformToCreateStory = (
    state: TStoryInitialState,
): TCreateStory => {
    return {
        title: state.title || 'No title yet',
        genre: state.genre ? JSON.parse(state.genre) : null,
        theme: state.theme ? JSON.parse(state.theme) : null,
        length: JSON.parse(state.length),
        includeNarration: state.includeNarration ?? false,
        narrationVoice: state.narrationVoice ?? null,
        scenes: (state.scenes ?? []).map(
            (scene: TStoryInitialState['scenes'][number]) => ({
                tone: scene?.tone ? JSON.parse(scene.tone) : null,
                setting: scene?.setting ? JSON.parse(scene.setting) : null,
                tensionLevel: scene?.tensionLevel
                    ? JSON.parse(scene.tensionLevel)
                    : null,
            }),
        ),
    }
}

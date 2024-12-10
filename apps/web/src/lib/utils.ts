import { TItemInput } from '../../../../libs/core/src/item/item.model'
import { TCreateStoryClient } from '../../../../libs/core/src/story/story.model'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const cleanseCreateStoryParams = (params: TCreateStoryClient) => {
    const { length, genre, theme, scenes, ...rest } = params
    return {
        ...rest,
        length: JSON.parse(length as unknown as string) as TItemInput,
        genre: JSON.parse(genre as unknown as string) as TItemInput,
        theme: JSON.parse(theme as unknown as string) as TItemInput,
        scenes: scenes.map((scene) => ({
            ...scene,
            tone: JSON.parse(scene.tone as unknown as string) as TItemInput,
            setting: JSON.parse(
                scene.setting as unknown as string,
            ) as TItemInput,
            tensionLevel: JSON.parse(
                scene.tensionLevel as unknown as string,
            ) as TItemInput,
        })),
    }
}

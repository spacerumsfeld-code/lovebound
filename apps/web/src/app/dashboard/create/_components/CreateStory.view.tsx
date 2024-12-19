'use client'

import { useState, useEffect } from 'react'
import { storyLengthMap, TItemInput } from '@client-types/item/item.model'
import { ITEM_ID_MAP } from '../../../../constants'
import { CreateStoryCore } from './Core'
import { NarrationOptions } from './NarrationOptions'

export const CreateStoryView = (props: {
    items: {
        genres: TItemInput[]
        themes: TItemInput[]
        lengths: TItemInput[]
        tensionLevels: TItemInput[]
        settings: TItemInput[]
        tones: TItemInput[]
    }
}) => {
    const [storyData, setStoryData] = useState({
        title: '',
        theme: '{}',
        genre: null,
        length: JSON.stringify(
            props.items.lengths.find(
                (length) => length.id === storyLengthMap.get('Mini')!,
            ),
        ),
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

    useEffect(() => {
        if (
            JSON.parse(storyData.length).id ===
            ITEM_ID_MAP.get('Story.Length.Short')
        ) {
            setStoryData((prev) => ({
                ...prev,
                includeNarration: false,
                scenes: Array(3)
                    .fill({})
                    .map(() => ({
                        tone: null,
                        setting: null,
                        tensionLevel: null,
                    })),
            }))
        } else if (
            JSON.parse(storyData.length).id ===
            ITEM_ID_MAP.get('Story.Length.Mini')
        ) {
            setStoryData((prev) => ({
                ...prev,
                scenes: [
                    {
                        tone: null,
                        setting: null,
                        tensionLevel: null,
                    },
                ],
            }))
        }
    }, [storyData.length])

    const handleInputChange = (field: string, value: string | boolean) => {
        setStoryData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSceneChange = (
        sceneIndex: number,
        field: string,
        value: TItemInput,
    ) => {
        setStoryData((prev) => ({
            ...prev,
            scenes: prev.scenes.map((scene, index) =>
                index === sceneIndex
                    ? { ...scene, [field]: JSON.stringify(value) }
                    : scene,
            ),
        }))
    }

    const getNextAvailableSceneIndex = (
        category: 'tone' | 'setting' | 'tensionLevel',
        value: TItemInput,
    ): number => {
        const currentIndex = storyData.scenes.findIndex(
            (scene) => JSON.parse(scene[category] ?? '{}').id === value!.id,
        )

        if (currentIndex !== -1) {
            return currentIndex
        }
        const emptyIndex = storyData.scenes.findIndex(
            (scene) => scene[category] === null,
        )

        if (emptyIndex !== -1) {
            return emptyIndex
        }
        return 0
    }

    const handleItemCardClick = (
        category: 'tone' | 'setting' | 'tensionLevel',
        value: string | null,
    ) => {
        const parsedValue = JSON.parse(value as string) as TItemInput

        if (
            JSON.parse(storyData.length).id ===
            ITEM_ID_MAP.get('Story.Length.Short')
        ) {
            const sceneIndex = getNextAvailableSceneIndex(category, parsedValue)
            setStoryData((prev) => ({
                ...prev,
                scenes: prev.scenes.map((scene, index) =>
                    index === sceneIndex
                        ? {
                              ...scene,
                              [category]:
                                  scene[category] === value ? null : value,
                          }
                        : scene,
                ),
            }))
        } else {
            handleSceneChange(0, category, parsedValue)
        }
    }

    const getSceneNumberForSelection = (
        category: 'tone' | 'setting' | 'tensionLevel',
        value: number,
    ): number | null => {
        if (
            JSON.parse(storyData.length).id !==
            ITEM_ID_MAP.get('Story.Length.Short')
        )
            return null
        const index = storyData.scenes.findIndex(
            (scene) => JSON.parse(scene[category] ?? '{}').id === value,
        )
        return index !== -1 ? index : null
    }

    return (
        <div className="flex flex-col md:flex-row gap-4 p-4">
            <CreateStoryCore
                storyData={storyData}
                items={props.items}
                handleInputChange={handleInputChange}
                handleItemCardClick={handleItemCardClick}
                handleSceneChange={handleSceneChange}
                getSceneNumberForSelection={getSceneNumberForSelection}
            />
            <NarrationOptions
                selectedVoice={storyData.narrationVoice}
                narrationEnabled={storyData.includeNarration}
                handleInputChange={handleInputChange}
            />
        </div>
    )
}

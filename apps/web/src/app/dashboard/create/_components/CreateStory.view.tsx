'use client'

import { useState, useEffect } from 'react'
import { StoryLengthEnum, TItemInput } from '@client-types/item/item.model'
import { CreateStoryCore } from './Core'
import { NarrationOptions } from './NarrationOptions'
import { TStoryInitialState } from '@client-types/story/story.model'
import { ConfirmCreateModal } from 'src/app/dashboard/_components/modals/ConfirmCreate.modal'
import { Button } from 'src/components/ui/button'
import { createInitialStoryState, transformToCreateStory } from 'src/lib/utils'
import { ProductTypeEnum } from '@client-types/payment/payment.model'

export const CreateStoryView = (props: {
    items: {
        genres: TItemInput[]
        themes: TItemInput[]
        lengths: TItemInput[]
        tensionLevels: TItemInput[]
        settings: TItemInput[]
        tones: TItemInput[]
    }
    currentSubscriptionType: ProductTypeEnum
    creditCount: number
}) => {
    // *State
    const defaultLength = props.items.lengths.find(
        (length) => length.name === StoryLengthEnum.Mini,
    )!
    const userHasPass = Boolean(props.currentSubscriptionType)
    const [storyData, setStoryData] = useState<TStoryInitialState>(
        createInitialStoryState(defaultLength),
    )

    // *Interactivity
    useEffect(() => {
        if (JSON.parse(storyData?.length)?.name === StoryLengthEnum.Short) {
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
            JSON.parse(storyData?.length)?.name === StoryLengthEnum.Mini
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
        } else if (
            JSON.parse(storyData?.length)?.name === StoryLengthEnum.Novelette
        ) {
            setStoryData((prev) => ({
                ...prev,
                scenes: Array(5)
                    .fill({})
                    .map(() => ({
                        tone: null,
                        setting: null,
                        tensionLevel: null,
                    })),
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
        const currentIndex = storyData.scenes.findIndex((scene) => {
            const parsedScene = scene[category]
                ? JSON.parse(scene[category] as string)
                : {}
            return parsedScene.id === value!.id
        })

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
            JSON.parse(storyData.length).name === StoryLengthEnum.Short ||
            JSON.parse(storyData.length).name === StoryLengthEnum.Novelette
        ) {
            const nextEmptySceneIndex = storyData.scenes.findIndex(
                (scene) => !scene[category],
            )

            if (nextEmptySceneIndex !== -1) {
                setStoryData((prev) => ({
                    ...prev,
                    scenes: prev.scenes.map((scene, index) =>
                        index === nextEmptySceneIndex
                            ? { ...scene, [category]: value }
                            : scene,
                    ),
                }))
            }
        } else {
            handleSceneChange(0, category, parsedValue)
        }
    }

    const removeSelectionFromScene = (
        category: 'tone' | 'setting' | 'tensionLevel',
        sceneIndex: number,
    ) => {
        setStoryData((prev) => ({
            ...prev,
            scenes: prev.scenes.map((scene, index) =>
                index === sceneIndex ? { ...scene, [category]: null } : scene,
            ),
        }))
    }

    const getSceneNumberForSelection = (
        category: 'tone' | 'setting' | 'tensionLevel',
        value: number,
    ): number[] => {
        if (
            JSON.parse(storyData.length).name !== StoryLengthEnum.Short &&
            JSON.parse(storyData.length).name !== StoryLengthEnum.Novelette
        )
            return []

        return storyData.scenes.reduce((indices: number[], scene, index) => {
            const parsedScene = scene[category]
                ? JSON.parse(scene[category] as string)
                : {}
            if (parsedScene.id === value) {
                indices.push(index)
            }
            return indices
        }, [])
    }

    // *Render
    return (
        <div className="flex flex-col md:flex-row gap-4 p-4">
            <CreateStoryCore
                storyData={storyData}
                items={props.items}
                handleInputChange={handleInputChange}
                handleItemCardClick={handleItemCardClick}
                handleSceneChange={handleSceneChange}
                userHasPass={userHasPass}
                getSceneNumberForSelection={getSceneNumberForSelection}
                removeSelectionFromScene={removeSelectionFromScene}
            />
            <NarrationOptions
                selectedVoice={storyData.narrationVoice}
                narrationEnabled={storyData.includeNarration}
                handleInputChange={handleInputChange}
            />
            <div className="fixed bottom-6 left-0 right-0 flex justify-center">
                <ConfirmCreateModal
                    storyData={transformToCreateStory(storyData)}
                    creditCount={props.creditCount}
                >
                    <Button id="tour-end" variant="primary">
                        Create Story
                    </Button>
                </ConfirmCreateModal>
            </div>
        </div>
    )
}

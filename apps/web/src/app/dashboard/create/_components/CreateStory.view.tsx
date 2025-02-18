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
    const userHasPremiumSubscription =
        props.currentSubscriptionType === ProductTypeEnum.PremiumSubscription
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

        if (JSON.parse(storyData.length).name === StoryLengthEnum.Short) {
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
        if (JSON.parse(storyData.length).name !== StoryLengthEnum.Short)
            return null
        const index = storyData.scenes.findIndex((scene) => {
            const parsedScene = scene[category]
                ? JSON.parse(scene[category] as string)
                : {}
            return parsedScene.id === value
        })
        return index !== -1 ? index : null
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
                userHasPremiumSubscription={userHasPremiumSubscription}
                getSceneNumberForSelection={getSceneNumberForSelection}
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

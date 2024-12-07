'use client'

import React, { useState, useEffect } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@web/src/components/ui/card'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@web/src/components/ui/tabs'
import { Label } from '@web/src/components/ui/label'
import { Button } from '@web/src/components/ui/buttonTwo'
import { Input } from '@web/src/components/ui/input'
import { ScrollArea } from '@web/src/components/ui/scroll-area'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@web/src/components/ui/avatar'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@web/src/components/ui/select'
import { Switch } from '@web/src/components/ui/switch'
import { RadioGroup, RadioGroupItem } from '@web/src/components/ui/radio-group'
import { cn } from '@web/src//lib/utils'
import { GenreEnum, TItem } from '@client-types/item/item.model'
import { ITEM_ID_MAP } from '@web/src/constants'
import { ConfirmCreateModal } from '../../_components/modals/ConfirmCreate.modal'

const StyleCard = ({
    label,
    imageUrl,
    isSelected,
    sceneNumber,
    onClick,
}: {
    label: string
    imageUrl: string
    isSelected: boolean
    sceneNumber: number | null
    onClick: () => void
}) => (
    <div
        className={cn(
            'relative rounded-lg overflow-hidden group cursor-pointer',
            isSelected && 'ring-2 ring-purple-500',
        )}
        onClick={onClick}
    >
        <img src={imageUrl} alt={label} className="w-full h-32 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-2 transition-opacity group-hover:bg-opacity-60">
            <span className="text-white text-sm font-semibold">{label}</span>
        </div>
        {sceneNumber !== null && sceneNumber >= 0 && (
            <div className="absolute top-2 right-2 bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                {sceneNumber + 1}
            </div>
        )}
    </div>
)

export const CreateStoryView = (props: {
    items: {
        genres: TItem[]
        themes: TItem[]
        lengths: TItem[]
        tensionLevels: TItem[]
        settings: TItem[]
        tones: TItem[]
    }
}) => {
    const [storyData, setStoryData] = useState({
        title: '',
        theme: null,
        genre: null,
        length: 23,
        includeNarration: false,
        scenes: [
            {
                tone: null,
                setting: null,
                tensionLevel: null,
            },
        ],
    })

    useEffect(() => {
        if (storyData.length === ITEM_ID_MAP.get('Story.Length.Short')) {
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
        } else if (ITEM_ID_MAP.get('Story.Length.Mini')) {
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

    const handleInputChange = (field: string, value: any) => {
        setStoryData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSceneChange = (
        sceneIndex: number,
        field: string,
        value: any,
    ) => {
        setStoryData((prev) => ({
            ...prev,
            scenes: prev.scenes.map((scene, index) =>
                index === sceneIndex ? { ...scene, [field]: value } : scene,
            ),
        }))
    }

    const getNextAvailableSceneIndex = (
        category: 'tone' | 'setting' | 'tensionLevel',
        value: any,
    ): number => {
        const currentIndex = storyData.scenes.findIndex(
            (scene) => scene[category] === value,
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

    const handleStyleCardClick = (
        category: 'tone' | 'setting' | 'tensionLevel',
        value: any,
    ) => {
        if (storyData.length === ITEM_ID_MAP.get('Story.Length.Short')) {
            const sceneIndex = getNextAvailableSceneIndex(category, value)
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
            handleSceneChange(
                0,
                category,
                storyData.scenes[0][category] === value ? null : value,
            )
        }
    }

    const getSceneNumberForSelection = (
        category: 'tone' | 'setting' | 'tensionLevel',
        value: number,
    ): number | null => {
        if (storyData.length !== ITEM_ID_MAP.get('Story.Length.Short'))
            return null
        const index = storyData.scenes.findIndex(
            (scene) => scene[category] === value,
        )
        return index !== -1 ? index : null
    }

    return (
        <div className="flex gap-6 p-6">
            <div className="flex-grow space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Story Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="storyTitle">Title</Label>
                                <Input
                                    id="storyTitle"
                                    value={storyData.title}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'title',
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                            <div>
                                <Label htmlFor="genre">Genre</Label>
                                <Select
                                    value={storyData.genre || ''}
                                    onValueChange={(value) =>
                                        handleInputChange(
                                            'genre',
                                            value as GenreEnum,
                                        )
                                    }
                                >
                                    <SelectTrigger id="genre">
                                        <SelectValue placeholder="Select Genre" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {props.items.genres.map((genre) => (
                                            <SelectItem
                                                key={genre.id}
                                                value={genre.id}
                                            >
                                                {genre.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>Length</Label>
                                <RadioGroup
                                    value={storyData.length}
                                    onValueChange={(value) =>
                                        handleInputChange('length', value)
                                    }
                                    className="flex flex-col space-y-1 mt-1"
                                >
                                    {props.items.lengths.map((length) => (
                                        <div
                                            key={length.name}
                                            className="flex items-center space-x-2"
                                        >
                                            <RadioGroupItem
                                                value={length.id}
                                                id={`length-${length.id}`}
                                                disabled={
                                                    length.id !== 23 &&
                                                    length.id !== 24
                                                }
                                            />
                                            <Label
                                                htmlFor={`length-${length.id}`}
                                            >
                                                {length.name}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="narration"
                                    checked={storyData.includeNarration}
                                    onCheckedChange={(checked) =>
                                        handleInputChange(
                                            'includeNarration',
                                            checked,
                                        )
                                    }
                                    disabled={
                                        storyData.length !==
                                        ITEM_ID_MAP.get('Story.Length.Mini')!
                                    }
                                />
                                <Label htmlFor="narration">
                                    Enable narration
                                </Label>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Tabs defaultValue="theme">
                    <TabsList className="grid w-full grid-cols-4 h-9">
                        <TabsTrigger value="theme" className="text-xs">
                            Theme
                        </TabsTrigger>
                        <TabsTrigger value="setting" className="text-xs">
                            Setting
                        </TabsTrigger>
                        <TabsTrigger value="tone" className="text-xs">
                            Tone
                        </TabsTrigger>
                        <TabsTrigger value="tension" className="text-xs">
                            Tension
                        </TabsTrigger>
                    </TabsList>
                    <ScrollArea className="h-[400px]">
                        <TabsContent value="theme">
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        {props.items.themes.map((theme) => (
                                            <StyleCard
                                                key={theme.id}
                                                label={theme.name}
                                                imageUrl={theme.imageUrl || ''}
                                                isSelected={
                                                    storyData.theme === theme.id
                                                }
                                                sceneNumber={null}
                                                onClick={() =>
                                                    handleInputChange(
                                                        'theme',
                                                        theme.id,
                                                    )
                                                }
                                            />
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="setting">
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        {props.items.settings.map((setting) => (
                                            <StyleCard
                                                key={setting.id}
                                                label={setting.name}
                                                imageUrl={
                                                    setting.imageUrl || ''
                                                }
                                                isSelected={storyData.scenes.some(
                                                    (scene) =>
                                                        scene.setting ===
                                                        setting.id,
                                                )}
                                                sceneNumber={getSceneNumberForSelection(
                                                    'setting',
                                                    setting.id,
                                                )}
                                                onClick={() =>
                                                    handleStyleCardClick(
                                                        'setting',
                                                        setting.id,
                                                    )
                                                }
                                            />
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="tone">
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        {props.items.tones.map((tone) => (
                                            <StyleCard
                                                key={tone.id}
                                                label={tone.name}
                                                imageUrl={tone.imageUrl || ''}
                                                isSelected={storyData.scenes.some(
                                                    (scene) =>
                                                        scene.tone ===
                                                        tone.name,
                                                )}
                                                sceneNumber={getSceneNumberForSelection(
                                                    'tone',
                                                    tone.id,
                                                )}
                                                onClick={() =>
                                                    handleStyleCardClick(
                                                        'tone',
                                                        tone.id,
                                                    )
                                                }
                                            />
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="tension">
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        {props.items.tensionLevels.map(
                                            (tension) => (
                                                <StyleCard
                                                    key={tension.id}
                                                    label={tension.name}
                                                    imageUrl={
                                                        tension.imageUrl || ''
                                                    }
                                                    isSelected={storyData.scenes.some(
                                                        (scene) =>
                                                            scene.tensionLevel ===
                                                            tension.id,
                                                    )}
                                                    sceneNumber={getSceneNumberForSelection(
                                                        'tensionLevel',
                                                        tension.id,
                                                    )}
                                                    onClick={() =>
                                                        handleStyleCardClick(
                                                            'tensionLevel',
                                                            tension.id,
                                                        )
                                                    }
                                                />
                                            ),
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </ScrollArea>
                </Tabs>

                <div className="fixed bottom-6 left-0 right-0 flex justify-center">
                    <ConfirmCreateModal storyData={storyData as any}>
                        <Button className="bg-indigo-400 text-white hover:bg-indigo-500">
                            + Create Story
                        </Button>
                    </ConfirmCreateModal>
                </div>
            </div>

            <Card className="w-80">
                <CardHeader>
                    <CardTitle>Narration</CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[500px] pr-4">
                        <div className="space-y-4">
                            <Label>Voice Selection</Label>
                            {[
                                'Alloy',
                                'Echo',
                                'Fable',
                                'Onyx',
                                'Nova',
                                'Shimmer',
                            ].map((voice) => (
                                <div
                                    key={voice}
                                    className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg"
                                >
                                    <div className="flex items-center space-x-3">
                                        <Avatar>
                                            <AvatarImage
                                                src={`/placeholder.svg?height=40&width=40&text=${encodeURIComponent(
                                                    voice[0],
                                                )}`}
                                            />
                                            <AvatarFallback>
                                                {voice[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium">
                                                {voice}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                AI Voice
                                            </div>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        Select
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    )
}

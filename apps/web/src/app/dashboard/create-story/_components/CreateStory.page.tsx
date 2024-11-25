'use client'

import React, { useState } from 'react'
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
import { Textarea } from '@web/src/components/ui/textarea'
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
import { cn } from '@web/src/lib/utils'
import { submitStory } from './data'
import {
    ThemeEnum,
    ToneEnum,
    TensionEnum,
    settingOptions,
    toneOptions,
    SettingEnum,
    themeOptions,
    LengthEnum,
    ZCreateStoryClient,
} from '@client-types/story/story.model'
import { Switch } from '@web/src/components/ui/switch'
import { RadioGroup, RadioGroupItem } from '@web/src/components/ui/radio-group'

const StyleCard = ({
    title,
    imageUrl,
    isSelected,
    onClick,
}: {
    title: string
    imageUrl: string
    isSelected: boolean
    onClick: () => void
}) => (
    <div
        className={cn(
            'relative rounded-lg overflow-hidden group cursor-pointer',
            isSelected && 'ring-2 ring-purple-500',
        )}
        onClick={onClick}
    >
        <img src={imageUrl} alt={title} className="w-full h-32 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-2 transition-opacity group-hover:bg-opacity-60">
            <span className="text-white text-sm font-semibold">{title}</span>
        </div>
    </div>
)

export const CreateStoryPage = () => {
    const [scenario, setScenario] = useState('')
    const [selectedTheme, setSelectedTheme] = useState<ThemeEnum | null>(null)
    const [selectedTone, setSelectedTone] = useState<ToneEnum | null>(null)
    const [selectedSetting, setSelectedSetting] = useState<SettingEnum | null>(
        null,
    )
    const [tension, setTension] = useState<TensionEnum | null>(null)
    const [length, setLength] = useState<LengthEnum>(LengthEnum.Mini)
    const [storyTitle, setStoryTitle] = useState('')
    const [includeNarration, setIncludeNarration] = useState<boolean>(false)

    // @Interactivity
    const handleSubmit = async () => {
        console.info(
            'handleSubmit',
            JSON.stringify({
                scenario,
                selectedTheme,
                selectedTone,
                selectedSetting,
                tension,
                storyTitle,
                includeNarration,
                length,
            }),
        )
        const isValid = ZCreateStoryClient.safeParse({
            scenario,
            selectedTheme,
            selectedTone,
            selectedSetting,
            tension,
            storyTitle,
            includeNarration,
            length,
        })
        if (!isValid.success) {
            console.error('Invalid story submission', isValid.error)
            return
        }
        await submitStory(isValid.data)
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
                                <Label htmlFor="scenario">
                                    Scenario (Optional)
                                </Label>
                                <Textarea
                                    id="scenario"
                                    placeholder="Enter your story scenario here..."
                                    value={scenario}
                                    onChange={(e) =>
                                        setScenario(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <Label htmlFor="tension">Tension Level</Label>
                                <Select
                                    onValueChange={(value) =>
                                        setTension(value as TensionEnum)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select tension level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(TensionEnum).map(
                                            ([key, value]) => (
                                                <SelectItem
                                                    key={key}
                                                    value={value}
                                                >
                                                    {value}
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                            {/* <div> */}
                            {/* <Label htmlFor="characterOne">
                                    Character One Name (Optional)
                                </Label>
                                <Input
                                    id="characterOne"
                                    value={characterOne}
                                    onChange={(e) =>
                                        setCharacterOne(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <Label htmlFor="characterTwo">
                                    Character Two Name (Optional)
                                </Label>
                                <Input
                                    id="characterTwo"
                                    value={characterTwo}
                                    onChange={(e) =>
                                        setCharacterTwo(e.target.value)
                                    }
                                />
                            </div> */}
                            <div>
                                <Label htmlFor="storyTitle">Title</Label>
                                <Input
                                    id="storyTitle"
                                    value={storyTitle}
                                    onChange={(e) =>
                                        setStoryTitle(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <Label>Story Length</Label>
                                <RadioGroup
                                    defaultValue={LengthEnum.Mini}
                                    value={length}
                                    onValueChange={(value) =>
                                        setLength(value as LengthEnum)
                                    }
                                    className="flex flex-col space-y-1 mt-1"
                                >
                                    {Object.entries(LengthEnum).map(
                                        ([key, value]) => (
                                            <div
                                                key={key}
                                                className="flex items-center space-x-2"
                                            >
                                                <RadioGroupItem
                                                    value={value}
                                                    id={`length-${key}`}
                                                    disabled={
                                                        value !==
                                                            LengthEnum.Mini &&
                                                        value !==
                                                            LengthEnum.Short
                                                    }
                                                />
                                                <Label
                                                    htmlFor={`length-${key}`}
                                                >
                                                    {value}
                                                </Label>
                                                {value !== LengthEnum.Mini &&
                                                    value !==
                                                        LengthEnum.Short && (
                                                        <span className="text-sm text-muted-foreground">
                                                            (Coming soon)
                                                        </span>
                                                    )}
                                            </div>
                                        ),
                                    )}
                                </RadioGroup>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="narration"
                                    checked={includeNarration}
                                    onCheckedChange={setIncludeNarration}
                                    disabled={length !== LengthEnum.Mini}
                                />
                                <Label htmlFor="narration">
                                    Enable narration
                                </Label>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Tabs defaultValue="theme">
                    <TabsList className="grid w-full grid-cols-3 h-9">
                        <TabsTrigger value="theme" className="text-xs">
                            Theme
                        </TabsTrigger>
                        <TabsTrigger value="tone" className="text-xs">
                            Tone
                        </TabsTrigger>
                        <TabsTrigger value="setting" className="text-xs">
                            Setting
                        </TabsTrigger>
                    </TabsList>
                    <ScrollArea className="h-[400px]">
                        <TabsContent value="theme">
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        {themeOptions.map(({ label, href }) => (
                                            <StyleCard
                                                key={label}
                                                title={label}
                                                imageUrl={href}
                                                isSelected={
                                                    selectedTheme === label
                                                }
                                                onClick={() =>
                                                    setSelectedTheme(
                                                        label as ThemeEnum,
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
                                        {toneOptions.map(({ label, href }) => (
                                            <StyleCard
                                                key={label}
                                                title={label}
                                                imageUrl={href}
                                                isSelected={
                                                    selectedTone === label
                                                }
                                                onClick={() =>
                                                    setSelectedTone(
                                                        label as ToneEnum,
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
                                        {settingOptions.map(
                                            ({ label, href }) => (
                                                <StyleCard
                                                    key={label}
                                                    title={label}
                                                    imageUrl={href}
                                                    isSelected={
                                                        selectedSetting ===
                                                        label
                                                    }
                                                    onClick={() =>
                                                        setSelectedSetting(
                                                            label as SettingEnum,
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
                    <div className="backdrop-blur-sm bg-background/80 rounded-full px-1 py-1">
                        <Button
                            size="lg"
                            className="rounded-full px-8 bg-purple-600 hover:bg-purple-700"
                            onClick={() => handleSubmit()}
                        >
                            Generate Story
                        </Button>
                    </div>
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

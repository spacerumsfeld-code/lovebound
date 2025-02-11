'use client'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from 'src/components/ui/card'
import { Label } from 'src/components/ui/label'
import { Input } from 'src/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from 'src/components/ui/select'
import { TItemInput } from '@client-types/item/item.model'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from 'src/components/ui/tabs'
import { ScrollArea } from 'src/components/ui/scroll-area'
import { ItemCard } from './ItemCard'
import { VisitShopCTA } from './VisitShopCTA'
import { TStoryInitialState } from '@client-types/story/story.model'
import { NarrationSwitch } from './NarrationSwitch'
import { LengthRadioGroup } from './LengthRadioGroup'

export const CreateStoryCore = (props: {
    storyData: TStoryInitialState
    userHasPremiumSubscription: boolean
    items: {
        genres: TItemInput[]
        themes: TItemInput[]
        lengths: TItemInput[]
        tensionLevels: TItemInput[]
        settings: TItemInput[]
        tones: TItemInput[]
    }
    handleInputChange: (field: string, value: string | boolean) => void
    handleItemCardClick: (
        category: 'tone' | 'setting' | 'tensionLevel',
        value: string | null,
    ) => void
    handleSceneChange: (
        sceneIndex: number,
        field: string,
        value: TItemInput,
    ) => void
    getSceneNumberForSelection: (
        category: 'tone' | 'setting' | 'tensionLevel',
        value: number,
    ) => number | null
}) => {
    return (
        <div className="flex-grow space-y-4">
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
                                value={props.storyData.title}
                                onChange={(e) =>
                                    props.handleInputChange(
                                        'title',
                                        e.target.value,
                                    )
                                }
                            />
                        </div>
                        <div>
                            <Label htmlFor="genre">Genre</Label>
                            <Select
                                value={props.storyData.genre || ''}
                                onValueChange={(value) =>
                                    props.handleInputChange('genre', value)
                                }
                            >
                                <SelectTrigger id="genre">
                                    <SelectValue placeholder="Select Genre" />
                                </SelectTrigger>
                                <SelectContent>
                                    {props.items.genres.map((genre) => (
                                        <SelectItem
                                            key={genre.id}
                                            value={JSON.stringify(genre)}
                                        >
                                            {genre.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <LengthRadioGroup
                            storyLength={String(props.storyData.length)}
                            handleInputChange={props.handleInputChange}
                            items={props.items.lengths}
                        />
                        <NarrationSwitch
                            storyLengthId={
                                JSON.parse(props.storyData.length).id
                            }
                            includeNarration={props.storyData.includeNarration}
                            handleInputChange={props.handleInputChange}
                            userHasPremiumSubscription={
                                props.userHasPremiumSubscription
                            }
                        />
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
                                        <ItemCard
                                            label={theme.name}
                                            imageUrl={theme.imageUrl || ''}
                                            isSelected={
                                                JSON.parse(
                                                    props.storyData?.theme ??
                                                        '{}',
                                                ).id === theme.id
                                            }
                                            sceneNumber={null}
                                            onClick={() => {
                                                props.handleInputChange(
                                                    'theme',
                                                    JSON.stringify(theme),
                                                )
                                            }}
                                            key={theme.id}
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
                                        <ItemCard
                                            key={setting.id}
                                            label={setting.name}
                                            imageUrl={setting.imageUrl || ''}
                                            isSelected={props.storyData.scenes.some(
                                                (scene) =>
                                                    JSON.parse(
                                                        typeof scene?.setting ===
                                                            'string'
                                                            ? scene.setting
                                                            : '{}',
                                                    ).id === setting.id,
                                            )}
                                            sceneNumber={props.getSceneNumberForSelection(
                                                'setting',
                                                setting.id,
                                            )}
                                            onClick={() =>
                                                props.handleItemCardClick(
                                                    'setting',
                                                    JSON.stringify(setting),
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
                                        <ItemCard
                                            key={tone.id}
                                            label={tone.name}
                                            imageUrl={tone.imageUrl || ''}
                                            isSelected={props.storyData.scenes.some(
                                                (scene) =>
                                                    JSON.parse(
                                                        typeof scene.tone ===
                                                            'string'
                                                            ? scene.tone
                                                            : '{}',
                                                    ).id === tone.id,
                                            )}
                                            sceneNumber={props.getSceneNumberForSelection(
                                                'tone',
                                                tone.id,
                                            )}
                                            onClick={() =>
                                                props.handleItemCardClick(
                                                    'tone',
                                                    JSON.stringify(tone),
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
                                            <ItemCard
                                                key={tension.id}
                                                label={tension.name}
                                                imageUrl={
                                                    tension.imageUrl || ''
                                                }
                                                isSelected={props.storyData.scenes.some(
                                                    (scene) =>
                                                        JSON.parse(
                                                            typeof scene?.tensionLevel ===
                                                                'string'
                                                                ? scene.tensionLevel
                                                                : '{}',
                                                        ).id === tension.id,
                                                )}
                                                sceneNumber={props.getSceneNumberForSelection(
                                                    'tensionLevel',
                                                    tension.id,
                                                )}
                                                onClick={() =>
                                                    props.handleItemCardClick(
                                                        'tensionLevel',
                                                        JSON.stringify(tension),
                                                    )
                                                }
                                            />
                                        ),
                                    )}
                                    <VisitShopCTA />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </ScrollArea>
            </Tabs>
        </div>
    )
}

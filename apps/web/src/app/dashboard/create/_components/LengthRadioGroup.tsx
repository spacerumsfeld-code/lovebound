import {
    StoryLengthEnum,
    TItemInput,
    activeStoryLengths,
} from '@client-types/item/item.model'
import { Label } from 'src/components/ui/label'
import { RadioGroup, RadioGroupItem } from 'src/components/ui/radio-group'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from 'src/components/ui/tooltip'

export const LengthRadioGroup = (props: {
    items: TItemInput[]
    storyLength: string
    handleInputChange: (field: string, value: string | boolean) => void
}) => {
    // *State
    const sortedLengths = props.items.sort((a, b) => a.id - b.id)

    // *Render
    const getTooltipContent = (name: StoryLengthEnum) => {
        switch (name) {
            case StoryLengthEnum.Mini:
                return '1 scene / ~1000 words'
            case StoryLengthEnum.Short:
                return '3 scenes / ~4500 words'
            default:
                return 'Coming soon!'
        }
    }

    return (
        <div>
            <Label>Length</Label>
            <RadioGroup
                id="tour-length"
                value={props.storyLength}
                onValueChange={(value) =>
                    props.handleInputChange('length', value)
                }
                className="flex flex-col space-y-1 mt-1"
            >
                {sortedLengths.map((length) => (
                    <div
                        key={length.name}
                        className="flex items-center space-x-2"
                    >
                        <RadioGroupItem
                            value={JSON.stringify(length)}
                            id={`length-${length.id}`}
                            disabled={
                                !activeStoryLengths.has(
                                    length.name as StoryLengthEnum,
                                )
                            }
                        />
                        <Tooltip key={length.name}>
                            <TooltipTrigger>
                                <Label htmlFor={`length-${length.id}`}>
                                    {length.name}
                                </Label>
                            </TooltipTrigger>
                            <TooltipContent side="left">
                                {getTooltipContent(
                                    length.name as StoryLengthEnum,
                                )}
                            </TooltipContent>
                        </Tooltip>
                    </div>
                ))}
            </RadioGroup>
        </div>
    )
}

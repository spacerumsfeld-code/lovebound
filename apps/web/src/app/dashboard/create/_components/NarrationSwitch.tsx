import { Label } from 'src/components/ui/label'
import { Switch } from 'src/components/ui/switch'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from 'src/components/ui/tooltip'
import { StoryLengthEnum } from '@client-types/item/item.model'

export const NarrationSwitch = (props: {
    includeNarration: boolean
    storyLength: StoryLengthEnum
    userHasPass: boolean
    handleInputChange: (field: string, value: string | boolean) => void
}) => {
    // *State
    const isMiniStory = props.storyLength === StoryLengthEnum.Mini
    const shouldRenderTooltip = !isMiniStory || !props.userHasPass

    // *Render
    const tooltipContent = !isMiniStory
        ? 'Audio narration only enabled for mini stories'
        : !props.userHasPass
          ? 'Narration only enabled for Creator Pass'
          : ''

    return (
        <>
            {shouldRenderTooltip ? (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="tour-narration"
                                checked={props.includeNarration}
                                onCheckedChange={(checked) =>
                                    props.handleInputChange(
                                        'includeNarration',
                                        checked,
                                    )
                                }
                                disabled={!isMiniStory || !props.userHasPass}
                            />
                            <Label htmlFor="narration">Enable narration</Label>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>{tooltipContent}</TooltipContent>
                </Tooltip>
            ) : (
                <div className="flex items-center space-x-2">
                    <Switch
                        id="tour-narration"
                        checked={props.includeNarration}
                        onCheckedChange={(checked) =>
                            props.handleInputChange('includeNarration', checked)
                        }
                        disabled={!isMiniStory || !props.userHasPass}
                    />
                    <Label htmlFor="narration">Enable narration</Label>
                </div>
            )}
        </>
    )
}

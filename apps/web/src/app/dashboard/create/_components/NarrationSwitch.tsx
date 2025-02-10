import { Label } from 'src/components/ui/label'
import { Switch } from 'src/components/ui/switch'
import { ITEM_ID_MAP } from 'src/constants'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from 'src/components/ui/tooltip'

export const NarrationSwitch = (props: {
    includeNarration: boolean
    storyLengthId: number
    userHasPremiumSubscription: boolean
    handleInputChange: (field: string, value: string | boolean) => void
}) => {
    // *State
    const isMiniStory =
        props.storyLengthId === ITEM_ID_MAP.get('Story.Length.Mini')!
    const shouldRenderTooltip =
        !isMiniStory || !props.userHasPremiumSubscription

    // *Render
    const tooltipContent = !isMiniStory
        ? 'Audio narration only enabled for mini stories'
        : !props.userHasPremiumSubscription
          ? 'Narration only enabled for premium subscriptions'
          : ''

    return (
        <>
            {shouldRenderTooltip ? (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="narration"
                                checked={props.includeNarration}
                                onCheckedChange={(checked) =>
                                    props.handleInputChange(
                                        'includeNarration',
                                        checked,
                                    )
                                }
                                disabled={
                                    !isMiniStory ||
                                    !props.userHasPremiumSubscription
                                }
                            />
                            <Label htmlFor="narration">Enable narration</Label>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>{tooltipContent}</TooltipContent>
                </Tooltip>
            ) : (
                <div className="flex items-center space-x-2">
                    <Switch
                        id="narration"
                        checked={props.includeNarration}
                        onCheckedChange={(checked) =>
                            props.handleInputChange('includeNarration', checked)
                        }
                        disabled={
                            !isMiniStory || !props.userHasPremiumSubscription
                        }
                    />
                    <Label htmlFor="narration">Enable narration</Label>
                </div>
            )}
        </>
    )
}

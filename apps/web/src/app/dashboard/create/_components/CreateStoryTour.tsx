import { SITE_MAP } from 'src/constants'
import useTour from 'src/hooks/use-tour'
import { CircleHelpIcon } from 'lucide-react'

export const CreateStoryTour = (props: { userHasCompletedTour: boolean }) => {
    // *Interactivity
    const { startTour } = useTour(SITE_MAP.CREATE, props.userHasCompletedTour)

    // *Render
    return (
        <div
            className="flex items-center justify-center cursor-pointer"
            onClick={() => {
                startTour()
            }}
        >
            <CircleHelpIcon className="h-4 w-4 text-indigo-400" />
        </div>
    )
}

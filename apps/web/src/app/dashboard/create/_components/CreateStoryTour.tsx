import { SITE_MAP } from 'src/constants'
import useTour from 'src/hooks/use-tour'
import { CircleHelpIcon } from 'lucide-react'

export const CreateStoryTour = () => {
    // *Interactivity
    const { startTour } = useTour(SITE_MAP.CREATE)

    // *Render
    return (
        <div
            className="flex gap-1 items-center justify-center cursor-pointer"
            onClick={() => {
                startTour()
            }}
        >
            <CircleHelpIcon className="h-4 w-4 text-indigo-400" />
            <span className="text-lg text-bold text-indigo-400">
                How It Works
            </span>
        </div>
    )
}

import { cn } from 'src/lib/utils'
import { OptimizedImage } from 'src/components/ui/image/optimized-image'

export const ItemCard = (props: {
    label: string
    imageUrl: string
    isSelected: boolean
    sceneNumber: number | null
    onClick: () => void
}) => {
    // *Render
    return (
        <div
            className={cn(
                'relative rounded-lg overflow-hidden group cursor-pointer',
                props.isSelected && 'ring-2 ring-purple-500',
            )}
            onClick={props.onClick}
        >
            <OptimizedImage
                src={props.imageUrl}
                alt={props.label}
                height={200}
                width={400}
                className="w-full h-32 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-2 transition-opacity group-hover:bg-opacity-60">
                <span className="text-white text-sm font-semibold">
                    {props.label}
                </span>
            </div>
            {props.sceneNumber !== null && props.sceneNumber >= 0 && (
                <div className="p-2 absolute top-2 right-2 bg-purple-500 text-white rounded-full flex items-center justify-center">
                    Scene {props.sceneNumber + 1}
                </div>
            )}
        </div>
    )
}

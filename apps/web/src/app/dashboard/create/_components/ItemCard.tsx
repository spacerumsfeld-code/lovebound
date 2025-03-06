import { cn } from 'src/lib/utils'
import { OptimizedImage } from 'src/components/ui/image/optimized-image'

export const ItemCard = (props: {
    label: string
    imageUrl: string
    isSelected: boolean
    sceneNumber: number[]
    onClick: () => void
    onRemoveFromScene?: (sceneIndex: number) => void
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
            {props.sceneNumber.length > 0 && (
                <div className="absolute top-2 right-2 grid grid-cols-2 gap-1">
                    {props.sceneNumber.map((num) => (
                        <div key={num} className="flex items-center">
                            <div className="px-2 py-1 hidden sm:block bg-purple-500 text-white text-md rounded-l-full">
                                Scene {num + 1}
                            </div>
                            <div className="px-2 py-1 bg-purple-500 text-white rounded-l-full text-md sm:hidden">
                                S{num + 1}
                            </div>
                            {props.onRemoveFromScene && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        props.onRemoveFromScene?.(num)
                                    }}
                                    className="px-2 py-1 bg-red-500 text-white rounded-r-full text-md hover:bg-red-600"
                                >
                                    ×
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

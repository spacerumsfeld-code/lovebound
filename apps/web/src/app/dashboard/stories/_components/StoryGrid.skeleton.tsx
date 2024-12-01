import { Card } from '@web/src/components/ui/card'

export const StoryGridSkeleton = (props: { size: number }) => {
    // @Render
    return (
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: props.size }).map((_, index) => (
                <Card
                    key={index}
                    className="h-[400px] w-[300px] relative overflow-hidden rounded-2xl"
                >
                    <div className="absolute bottom-0 p-4 text-white">
                        <h3 className="text-xl text-white p-4 font-semibold mb-2">
                            In Progress
                        </h3>
                    </div>
                    <div className="absolute inset-0 bg-black/30" />
                </Card>
            ))}
        </div>
    )
}

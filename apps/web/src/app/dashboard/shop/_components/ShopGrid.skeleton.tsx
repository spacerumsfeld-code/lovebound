import { Skeleton } from '../../../../components/ui/skeleton'

export const ShopGridSkeleton = (props: { size: number }) => {
    // @Render
    return (
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: props.size }).map((_, index) => (
                <Skeleton
                    key={index}
                    className="h-[400px] w-[300px] relative overflow-hidden rounded-2xl"
                />
            ))}
        </div>
    )
}

import { Skeleton } from '../../../components/ui/skeleton'

export const RecentStoriesSkeleton = (props: { size: number }) => {
    // @Render
    return (
        <div className="grid grid-cols-2 gap-4 p-8">
            {Array.from({ length: props.size }).map((_, index) => (
                <Skeleton key={index} className="h-32 w-full rounded-md" />
            ))}
        </div>
    )
}

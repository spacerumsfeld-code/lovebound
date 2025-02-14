import Link from 'next/link'
import { getRecentStories } from '../data'
import { SITE_MAP } from 'src/constants'
import { OptimizedImage } from 'src/components/ui/image/optimized-image'

export const RecentStoriesAsync = async () => {
    // @Data
    const { recentStories } = await getRecentStories()

    // @Render
    if (!recentStories) {
        return <h3 className="text-lg font-semibold p-8">No stories yet!</h3>
    }

    return (
        <div className="grid grid-cols-2 gap-4 p-8">
            {recentStories.map((story, index) => (
                <Link
                    key={`story.id_${index}`}
                    href={SITE_MAP.STORIES}
                    className="relative rounded-lg overflow-hidden group cursor-pointer"
                >
                    <OptimizedImage
                        src={story.coverUrl}
                        height={400}
                        width={300}
                        mobileWidth={'300px'}
                        alt="Story Cover"
                        className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-2 transition-opacity group-hover:bg-opacity-60">
                        <span className="text-white text-sm font-semibold">
                            {story.title}
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    )
}

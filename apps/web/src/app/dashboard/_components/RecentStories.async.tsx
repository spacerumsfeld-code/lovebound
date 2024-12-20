import { getRecentStories } from '../data'
import Image from 'next/image'

export const RecentStoriesAsync = async () => {
    // @Data
    const { recentStories } = await getRecentStories()

    // @Render
    if (!recentStories) {
        return <h3 className="text-lg font-semibold">No stories found</h3>
    }

    return (
        <div className="grid grid-cols-2 gap-4 p-8">
            {recentStories.map((story, index) => (
                <div
                    key={`story.id_${index}`}
                    className="relative rounded-lg overflow-hidden group cursor-pointer"
                >
                    <Image
                        src={story.coverUrl!}
                        height={400}
                        width={300}
                        alt="Story Cover"
                        className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-2 transition-opacity group-hover:bg-opacity-60">
                        <span className="text-white text-sm font-semibold">
                            {story.title}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}

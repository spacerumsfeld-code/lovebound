import { getRecentStories } from '../data'

export const RecentStoriesAsync = async () => {
    // @Data
    const { recentStories } = await getRecentStories()

    // @Render
    if (!recentStories) {
        return <h3 className="text-lg font-semibold">No stories found</h3>
    }

    return (
        <div className="grid grid-cols-2 gap-4 p-8">
            {recentStories.map((story) => (
                <div className="relative rounded-lg overflow-hidden group cursor-pointer">
                    <img
                        src={story.coverUrl!}
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

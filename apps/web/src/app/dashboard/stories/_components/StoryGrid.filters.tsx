'use client'

import { GenreEnum, ThemeEnum } from '@client-types/story/story.model'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@web/src/components/ui/select'
import { useRouter } from 'next/navigation'

export const StoryGridFilters = (props: {
    genre: GenreEnum
    theme: ThemeEnum
}) => {
    // @Interactivity
    const router = useRouter()

    const handleGenreFilterChange = (filter: GenreEnum) => {
        router.push(`/dashboard/stories?theme=${props.theme}&genre=${filter}`)
    }

    const handleThemeFilterChange = (filter: ThemeEnum) => {
        router.push(`/dashboard/stories?theme=${filter}&genre=${props.genre}`)
    }

    return (
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex items-center gap-4">
                <p className="text-bold">Genre</p>
                <Select
                    onValueChange={(value) =>
                        handleGenreFilterChange(value as GenreEnum)
                    }
                    value={props.genre}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Genre" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.values(GenreEnum).map((sort) => (
                            <SelectItem key={sort} value={sort}>
                                {sort}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex items-center gap-4">
                <p className="text-bold">Theme</p>
                <Select
                    onValueChange={(value) =>
                        handleThemeFilterChange(value as ThemeEnum)
                    }
                    value={props.theme}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.values(ThemeEnum).map((sort) => (
                            <SelectItem key={sort} value={sort}>
                                {sort}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

'use client'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@web/src/components/ui/select'
import { useRouter } from 'next/navigation'
import { ThemeIdEnum, GenreIdEnum } from '@client-types/item/item.model'

export const StoryGridFilters = (props: { genre: number; theme: number }) => {
    // @Interactivity
    const router = useRouter()

    const handleGenreFilterChange = (filter: string) => {
        const genreId = Object.entries(GenreIdEnum).find(
            ([_, value]) => value === filter,
        )?.[0]
        router.push(`/dashboard/stories?theme=${props.theme}&genre=${genreId}`)
    }

    const handleThemeFilterChange = (filter: string) => {
        const themeId = Object.entries(ThemeIdEnum).find(
            ([_, value]) => value === filter,
        )?.[0]
        router.push(`/dashboard/stories?theme=${themeId}&genre=${props.genre}`)
    }

    // @Render
    return (
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex items-center gap-4">
                <p className="text-bold">Genre</p>
                <Select
                    onValueChange={(value) =>
                        handleGenreFilterChange(String(value))
                    }
                    value={GenreIdEnum[props.genre]}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Genre" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.values(GenreIdEnum)
                            .filter((value) => !(typeof value === 'number'))
                            .map((value) => (
                                <SelectItem
                                    key={`genre-${value}`}
                                    value={value}
                                >
                                    {value}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex items-center gap-4">
                <p className="text-bold">Theme</p>
                <Select
                    onValueChange={(value) =>
                        handleThemeFilterChange(String(value))
                    }
                    value={ThemeIdEnum[props.theme]}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.values(ThemeIdEnum)
                            .filter((value) => !(typeof value === 'number'))
                            .map((value) => (
                                <SelectItem
                                    key={`theme-${value}`}
                                    value={value}
                                >
                                    {value}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

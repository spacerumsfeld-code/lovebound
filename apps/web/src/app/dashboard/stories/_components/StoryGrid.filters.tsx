'use client'

import { TItem } from '@client-types/item/item.model'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../../../components/ui/select'
import { useRouter } from 'next/navigation'
import { Button } from 'src/components/ui/button'

export const StoryGridFilters = (props: {
    genre: number
    theme: number
    genreFilters: Pick<TItem, 'id' | 'name' | 'type'>[]
    themeFilters: Pick<TItem, 'id' | 'name' | 'type'>[]
}) => {
    // *Interactivity
    const router = useRouter()

    const handleGenreFilterChange = (filter: TItem['name']) => {
        const genreId = props.genreFilters.find(
            ({ name }) => name === filter,
        )?.id
        router.push(`/dashboard/stories?theme=${props.theme}&genre=${genreId}`)
    }

    const handleThemeFilterChange = (filter: TItem['name']) => {
        const themeId = props.themeFilters.find(
            ({ name }) => name === filter,
        )?.id
        router.push(`/dashboard/stories?theme=${themeId}&genre=${props.genre}`)
    }

    const handleClearFilters = () => {
        router.push('/dashboard/stories')
    }

    // *Render
    return (
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex items-center gap-4 justify-between">
                <p className="text-bold">Genre</p>
                <Select
                    onValueChange={(value) => handleGenreFilterChange(value)}
                    value={
                        props.genreFilters.find(({ id }) => id === props.genre)
                            ?.name || ''
                    }
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Genre" />
                    </SelectTrigger>
                    <SelectContent>
                        {props.genreFilters.map(({ id, name }) => (
                            <SelectItem key={`genre-${id}`} value={name}>
                                {name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex items-center gap-4 justify-between">
                <p className="text-bold">Theme</p>
                <Select
                    onValueChange={(value) =>
                        handleThemeFilterChange(String(value))
                    }
                    value={
                        props.themeFilters.find(({ id }) => id === props.theme)
                            ?.name || ''
                    }
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        {props.themeFilters.map(({ id, name }) => (
                            <SelectItem key={`theme-${id}`} value={name}>
                                {name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <Button
                className="flex items-center justify-center"
                onClick={handleClearFilters}
            >
                Clear Filters
            </Button>
        </div>
    )
}

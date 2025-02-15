import { Header } from 'src/components/ui/header'
import { StoryGridFilters } from './StoryGrid.filters'
import { TItem } from '@client-types/item/item.model'

export const StoriesHeader = (props: {
    genre: number
    theme: number
    genreFilters: Pick<TItem, 'id' | 'name' | 'type'>[]
    themeFilters: Pick<TItem, 'id' | 'name' | 'type'>[]
}) => {
    // *Render
    return (
        <Header
            title="Your Stories"
            description={'In-progress stories will be visible once complete!'}
        >
            <StoryGridFilters
                genre={props.genre}
                theme={props.theme}
                genreFilters={props.genreFilters}
                themeFilters={props.themeFilters}
            />
        </Header>
    )
}

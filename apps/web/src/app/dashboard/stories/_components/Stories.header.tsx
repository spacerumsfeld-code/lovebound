import { Header } from 'src/components/ui/header'
import { StoryGridFilters } from './StoryGrid.filters'

export const StoriesHeader = (props: { genre: number; theme: number }) => {
    // *Render
    return (
        <Header
            title="Your Stories"
            description={'In-progress stories will be visible once complete!'}
        >
            <StoryGridFilters genre={props.genre} theme={props.theme} />
        </Header>
    )
}

'use client'

import { TStoryWithScenes } from '@client-types/story/story.model'
import { Card } from '../../../../components/ui/card'
import { cn } from '../../../../lib/utils'
import { motion } from 'framer-motion'
import { EReaderModal } from '../../_components/modals/EReader.modal'
import { useToast } from 'src/hooks/use-toast'
import { OptimizedImage } from 'src/components/ui/image/optimized-image'
import { TitleLabel } from '../../shop/_components/shop-card/TitleLabel'

export const StoryCard = (props: { story: TStoryWithScenes }) => {
    // *Interactivity
    const { showToast } = useToast()

    const handleInProgressClick = () => {
        showToast('ℹ️ This story is still in progress. Check back soon!')
        return
    }

    // *Render
    if (props.story.inProgress)
        return (
            <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => handleInProgressClick()}
                className={cn(
                    'h-[400px] w-[300px] relative group cursor-pointer',
                )}
            >
                <Card className="h-[400px] w-[300px] relative overflow-hidden rounded-2xl">
                    <OptimizedImage
                        src={props.story.coverUrl}
                        alt={props.story.title}
                        height={400}
                        width={300}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-0 p-6 text-white">
                        <h3 className="text-xl text-white font-semibold mb-2">
                            In Progress
                        </h3>
                    </div>
                    <div className="absolute inset-0 bg-black/30" />
                </Card>
            </motion.div>
        )

    return (
        <EReaderModal story={props.story}>
            <motion.div
                whileHover={{ scale: 1.02 }}
                className={cn(
                    'h-[400px] w-[300px] relative group cursor-pointer',
                )}
            >
                <Card className="h-[400px] w-[300px] relative overflow-hidden rounded-2xl">
                    <OptimizedImage
                        src={props.story.coverUrl}
                        alt={props.story.title}
                        height={400}
                        width={300}
                        className="h-full w-full object-cover"
                    />
                    <TitleLabel title={props.story.title} />
                </Card>
            </motion.div>
        </EReaderModal>
    )
}

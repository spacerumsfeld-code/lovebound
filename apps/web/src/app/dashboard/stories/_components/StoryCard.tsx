'use client'

import { TStoryWithScenes } from '@client-types/story/story.model'
import { Card } from '../../../../components/ui/card'
import { cn } from '../../../../lib/utils'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { EReaderModal } from '../../_components/modals/EReader.modal'

export const StoryCard = (props: { story: TStoryWithScenes }) => {
    // @Render
    if (props.story.inProgress)
        return (
            <motion.div
                whileHover={{ scale: 1.02 }}
                className={cn(
                    'h-[400px] w-[300px] relative group cursor-pointer',
                )}
            >
                <Card className="h-[400px] w-[300px] relative overflow-hidden rounded-2xl">
                    <Image
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
                    <Image
                        src={props.story.coverUrl}
                        alt={props.story.title}
                        height={400}
                        width={300}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-0 p-4 text-white">
                        <h3 className="text-xl text-white font-semibold mb-2">
                            {props.story.title}
                        </h3>
                    </div>
                    <div className="absolute inset-0 bg-black/30" />
                </Card>
            </motion.div>
        </EReaderModal>
    )
}

'use client'

import { Card } from '@web/src/components/ui/card'
import { cn } from '@web/src/lib/utils'
import { motion } from 'framer-motion'
import Image from 'next/image'

export const StoryCard = ({
    title,
    imageUrl,
    className,
}: {
    title: string
    imageUrl?: string
    className?: string
}) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className={cn(
                'h-[400px] w-[300px] relative group cursor-pointer',
                className,
            )}
        >
            <Card className="h-[400px] w-[300px] relative overflow-hidden rounded-2xl">
                <Image
                    src={imageUrl!}
                    alt={title}
                    height={400}
                    width={300}
                    className="object-fit object-center h-full w-full object-cover"
                />
                <div className="absolute bottom-0 p-6 text-white">
                    <h3 className="text-xl text-white font-semibold mb-2">
                        {title}
                    </h3>
                </div>
                <div className="absolute inset-0 bg-black/30" />
            </Card>
        </motion.div>
    )
}

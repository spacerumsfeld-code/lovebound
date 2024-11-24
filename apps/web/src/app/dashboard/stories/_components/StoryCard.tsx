'use client'

import { Card } from '@web/src/components/ui/card'
import { cn } from '@web/src/lib/utils'
import { motion } from 'framer-motion'

/**
 * 
 *  <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
    Border Magic
  </span>
</button>
 * @returns 
 */

export const StoryCard = ({
    title,
    author,
    imageUrl,
    className,
    onClick,
}: {
    title: string
    author: string
    imageUrl?: string
    className?: string
    onClick?: () => void
}) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className={cn('relative group cursor-pointer', className)}
            onClick={onClick}
        >
            {/* <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" /> */}
            <Card className="relative h-[500px] w-full overflow-hidden rounded-2xl">
                <div className="absolute inset-0">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />
                </div>
                <div className="absolute bottom-0 p-6 text-white">
                    <h3 className="text-xl font-semibold mb-2">{title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                        <span>{author}</span>
                    </div>
                </div>
                <div className="absolute inset-0 bg-black/30" />
            </Card>
        </motion.div>
    )
}

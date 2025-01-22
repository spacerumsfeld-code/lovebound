'use client'

import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
    ReactNode,
} from 'react'
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalTrigger,
} from '../../../../components/ui/animated-modal'
import { Button } from '../../../../components/ui/buttonTwo'
import { ScrollArea } from '../../../../components/ui/scroll-area'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { Slider } from '../../../../components/ui/slider'
import { motion, AnimatePresence } from 'framer-motion'
import { TStoryWithScenes } from '../../../../../../../libs/core/src/story/story.model'

export const EReaderModal = (props: {
    story: TStoryWithScenes
    children: ReactNode
}) => {
    // @State
    const [currentSceneIndex, setCurrentSceneIndex] = useState(0)
    const [fontSize, setFontSize] = useState(16)
    const totalScenes = props.story.scenes.length
    const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null)

    // @Interactivity
    const handlePrevScene = () => {
        setCurrentSceneIndex((prev) => Math.max(prev - 1, 0))
    }

    const handleNextScene = useCallback(() => {
        setCurrentSceneIndex((prev) => Math.min(prev + 1, totalScenes - 1))
    }, [totalScenes])

    const handleFontSizeChange = (newSize: number[]) => {
        setFontSize(newSize[0])
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') handlePrevScene()
            if (e.key === 'ArrowRight') handleNextScene()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [currentSceneIndex, handleNextScene])

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause()
            } else {
                audioRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const currentScene = props.story.scenes?.[currentSceneIndex]

    // @Render
    if (!currentScene) return null

    return (
        <Modal>
            <ModalTrigger>{props.children}</ModalTrigger>
            <ModalBody>
                <ModalContent className="p-0">
                    <div
                        className={`flex flex-col h-[90vh] md:h-[90vh] bg-amber-50 transition-colors duration-300`}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center p-3 md:p-4 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-lg md:text-2xl font-bold truncate">
                                {props.story.title}
                            </h2>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-hidden relative">
                            <ScrollArea className="h-full">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentSceneIndex}
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 300,
                                            damping: 30,
                                        }}
                                        className="p-4 md:p-8 space-y-4 min-h-full flex flex-col justify-between"
                                        style={{
                                            backgroundColor: '#fff9e6',
                                            boxShadow:
                                                'inset 0 0 10px rgba(0,0,0,0.1)',
                                        }}
                                    >
                                        <div>
                                            <div
                                                className="prose dark:prose-invert max-w-none"
                                                style={{
                                                    fontSize: `${fontSize}px`,
                                                    lineHeight: '1.8',
                                                    textAlign: 'justify',
                                                    columnCount: 1,
                                                    columnGap: '2rem',
                                                    padding: '0 0.5rem',
                                                }}
                                            >
                                                {currentScene.content
                                                    .split('#')
                                                    .map((paragraph) => (
                                                        <p key={paragraph}>
                                                            {paragraph}
                                                            <br />
                                                            <br />
                                                        </p>
                                                    ))}
                                            </div>
                                        </div>

                                        {/* Controls */}
                                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-2 md:p-4 border-t border-gray-200 dark:border-gray-700">
                                            <Button
                                                variant="ghost"
                                                onClick={handlePrevScene}
                                                disabled={
                                                    currentSceneIndex === 0
                                                }
                                                aria-label="Previous scene"
                                                className="w-full md:w-auto"
                                            >
                                                <ChevronLeft className="h-4 w-4 mr-2" />
                                                Previous
                                            </Button>

                                            <div className="flex items-center space-x-2 w-full md:w-auto justify-center">
                                                <span className="text-sm hidden md:inline">
                                                    Aa
                                                </span>
                                                <Slider
                                                    value={[fontSize]}
                                                    onValueChange={
                                                        handleFontSizeChange
                                                    }
                                                    min={12}
                                                    max={24}
                                                    step={1}
                                                    className="w-24 md:w-32"
                                                />
                                                <span className="text-sm hidden md:inline">
                                                    Aa
                                                </span>
                                            </div>

                                            <Button
                                                variant="ghost"
                                                onClick={handleNextScene}
                                                disabled={
                                                    currentSceneIndex ===
                                                    totalScenes - 1
                                                }
                                                aria-label="Next scene"
                                                className="w-full md:w-auto"
                                            >
                                                Next
                                                <ChevronRight className="h-4 w-4 ml-2" />
                                            </Button>
                                        </div>

                                        {/* Audio Controls */}
                                        {currentScene.narrationUrl && (
                                            <div className="flex justify-center items-center p-2 md:p-4 border-t border-gray-200 dark:border-gray-700">
                                                <audio
                                                    ref={audioRef}
                                                    src={
                                                        currentScene.narrationUrl
                                                    }
                                                    onEnded={() =>
                                                        setIsPlaying(false)
                                                    }
                                                />
                                                <Button
                                                    onClick={togglePlayPause}
                                                    variant="outline"
                                                    size="icon"
                                                >
                                                    {isPlaying ? (
                                                        <Pause className="h-4 w-4" />
                                                    ) : (
                                                        <Play className="h-4 w-4" />
                                                    )}
                                                </Button>
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </ScrollArea>
                        </div>
                    </div>
                </ModalContent>
            </ModalBody>
        </Modal>
    )
}

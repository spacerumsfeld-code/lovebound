'use client'

import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalTrigger,
} from '../../../../components/ui/animated-modal'
import { ScrollArea } from '../../../../components/ui/scroll-area'
import { Button } from '../../../../components/ui/button'
import { Pen, Loader2 } from 'lucide-react'
import { submitStory } from '../../create/server'
import {
    TCreateStory,
    ZCreateStory,
    mapCreateStoryZodErrorsToSentences,
} from '@client-types/story/story.model'
import useLoading from '../../../../hooks/use-loading'
import { toast } from 'sonner'
import { StoryIdToCostMap } from '@client-types/payment/payment.model'

export const ConfirmCreateModal = (props: {
    children: React.ReactNode
    storyData: TCreateStory
}) => {
    // @State
    const { startLoading, isLoading } = useLoading()

    // @Interactivity
    const handleSubmit = async () => {
        const { data, success, error } = ZCreateStory.safeParse(props.storyData)
        if (!success) {
            toast(mapCreateStoryZodErrorsToSentences(error))
            return
        }
        startLoading('submit.story')
        await submitStory(data)
    }

    // @Render
    return (
        <Modal>
            <ModalTrigger>{props.children}</ModalTrigger>
            <ModalBody>
                <ModalContent className="max-h-[80vh] flex flex-col">
                    <ScrollArea className="flex-1 px-4">
                        <h4 className="text-base md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-4 md:mb-8">
                            Almost there! Please confirm your story details.
                        </h4>
                        <p className="text-sm md:text-lg text-neutral-600 dark:text-neutral-100 text-center text-bold">
                            Title: {props.storyData?.title}
                        </p>
                        <p className="text-sm md:text-lg text-neutral-600 dark:text-neutral-100 text-center text-bold">
                            Genre:{' '}
                            {props.storyData?.genre?.name ||
                                'No genre selected'}
                        </p>
                        <p className="text-sm md:text-lg text-neutral-600 dark:text-neutral-100 text-center text-bold">
                            Theme:{' '}
                            {props.storyData?.theme?.name ||
                                'No theme selected'}
                        </p>
                        <p className="text-sm md:text-lg text-neutral-600 dark:text-neutral-100 text-center text-bold">
                            Length: {props.storyData?.length?.name}
                        </p>
                        <p className="text-sm md:text-lg text-neutral-600 dark:text-neutral-100 text-center text-bold">
                            Cost:{' '}
                            {StoryIdToCostMap[props.storyData?.length?.id]}{' '}
                            credits
                        </p>
                        {props.storyData?.scenes &&
                            props.storyData.scenes.length > 0 && (
                                <div className="mt-2 md:mt-4">
                                    <h5 className="text-sm md:text-lg text-neutral-600 dark:text-neutral-100 font-bold text-center mb-2">
                                        Scenes
                                    </h5>
                                    {props.storyData.scenes.map(
                                        (scene, index) => (
                                            <div
                                                key={index}
                                                className="mb-2 md:mb-4"
                                            >
                                                <p className="text-sm md:text-lg text-neutral-600 dark:text-neutral-100 text-center text-bold">
                                                    Scene {index + 1}:
                                                </p>
                                                <p className="text-sm md:text-lg text-neutral-600 dark:text-neutral-100 text-center">
                                                    Setting:{' '}
                                                    {scene.setting?.name ||
                                                        'Not specified'}
                                                </p>
                                                <p className="text-sm md:text-lg text-neutral-600 dark:text-neutral-100 text-center">
                                                    Tone:{' '}
                                                    {scene.tone?.name ||
                                                        'Not specified'}
                                                </p>
                                                <p className="text-sm md:text-lg text-neutral-600 dark:text-neutral-100 text-center">
                                                    Tension Level:{' '}
                                                    {scene.tensionLevel?.name ||
                                                        'Not specified'}
                                                </p>
                                            </div>
                                        ),
                                    )}
                                </div>
                            )}
                    </ScrollArea>
                </ModalContent>
                <ModalFooter className="flex gap-y-4">
                    <Button
                        variant="primary"
                        disabled={isLoading('submit.story')}
                        onClick={() => handleSubmit()}
                        className="flex items-center justify-center"
                    >
                        {isLoading('submit.story') ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Pen className="mr-2 h-4 w-4" />
                        )}
                        Create
                    </Button>
                </ModalFooter>
            </ModalBody>
        </Modal>
    )
}

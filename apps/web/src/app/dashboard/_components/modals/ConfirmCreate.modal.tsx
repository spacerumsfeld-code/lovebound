'use client'

import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalTrigger,
} from '../../../../components/ui/animated-modal'
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
                <ModalContent>
                    <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                        Almost there! Please confirm your story details.
                    </h4>
                    <p className="text-lg text-neutral-600 dark:text-neutral-100 text-center text-bold">
                        Title: {props.storyData?.title}
                    </p>
                    <p className="text-lg text-neutral-600 dark:text-neutral-100 text-center text-bold">
                        Genre:{' '}
                        {props.storyData?.genre?.name || 'No genre selected'}
                    </p>
                    <p className="text-lg text-neutral-600 dark:text-neutral-100 text-center text-bold">
                        Theme:{' '}
                        {props.storyData?.theme?.name || 'No theme selected'}
                    </p>
                    <p className="text-lg text-neutral-600 dark:text-neutral-100 text-center text-bold">
                        Length: {props.storyData?.length?.name}
                    </p>
                    <p className="text-lg text-neutral-600 dark:text-neutral-100 text-center text-bold">
                        Cost: {StoryIdToCostMap[props.storyData?.length?.id]}{' '}
                        credits
                    </p>
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

'use client'

import { useOutsideClick } from '@web/src/hooks/use-on-click-outside'
import { cn } from '@web/src/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import React, {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'
import { useSetAtom } from 'jotai'
import { modalAtom, ModalType } from '@web/src/atoms/modal'

interface ModalContextType {
    open: boolean
    setOpen: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider = ({
    isGlobal,
    children,
}: {
    isGlobal: boolean
    children: ReactNode
}) => {
    // we have re-wired the modal to work both with local state (using the ModalTrigger)
    // AND with global state (using the jotai atom)

    const [localOpen, setLocalOpen] = useState(isGlobal)
    const closeGlobalModal = useSetAtom(modalAtom)

    const finalOpen = isGlobal ? true : localOpen

    const finalOpenFunc = isGlobal
        ? () => closeGlobalModal(ModalType.None)
        : () => setLocalOpen((prev) => !prev)

    return (
        <ModalContext.Provider
            value={{ open: finalOpen, setOpen: finalOpenFunc }}
        >
            {children}
        </ModalContext.Provider>
    )
}

export const useModal = () => {
    const context = useContext(ModalContext)
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider')
    }
    return context
}

export function Modal({
    isGlobal = false,
    children,
}: {
    isGlobal?: boolean
    children: ReactNode
}) {
    return <ModalProvider isGlobal={isGlobal}>{children}</ModalProvider>
}

export const ModalTrigger = ({
    children,
    className,
}: {
    children: ReactNode
    className?: string
}) => {
    const { setOpen } = useModal()
    return (
        <button
            className={cn(
                'rounded-md text-black dark:text-white text-center relative overflow-hidden',
                className,
            )}
            onClick={() => setOpen()}
        >
            {children}
        </button>
    )
}

export const ModalBody = ({
    children,
    className,
}: {
    children: ReactNode
    className?: string
}) => {
    const { open, setOpen } = useModal()

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }, [open])

    const modalRef = useRef(null)
    useOutsideClick(modalRef, () => setOpen())

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                        backdropFilter: 'blur(10px)',
                    }}
                    exit={{
                        opacity: 0,
                        backdropFilter: 'blur(0px)',
                    }}
                    className="fixed [perspective:800px] [transform-style:preserve-3d] inset-0 h-full w-full  flex items-center justify-center z-50"
                >
                    <Overlay />

                    <motion.div
                        ref={modalRef}
                        className={cn(
                            'min-h-[50%] max-h-[90%] md:max-w-[40%] bg-white dark:bg-neutral-950 border border-transparent dark:border-neutral-800 md:rounded-2xl relative z-50 flex flex-col flex-1 overflow-hidden',
                            className,
                        )}
                        initial={{
                            opacity: 0,
                            scale: 0.5,
                            rotateX: 40,
                            y: 40,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            rotateX: 0,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.8,
                            rotateX: 10,
                        }}
                        transition={{
                            type: 'spring',
                            stiffness: 260,
                            damping: 15,
                        }}
                    >
                        <CloseIcon />
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export const ModalContent = ({
    children,
    className,
}: {
    children: ReactNode
    className?: string
}) => {
    return (
        <div
            className={cn(
                'flex flex-col flex-1 p-8 md:p-10 gap-y-4',
                className,
            )}
        >
            {children}
        </div>
    )
}

export const ModalFooter = ({
    children,
    className,
}: {
    children: ReactNode
    className?: string
}) => {
    return (
        <div
            className={cn(
                'flex justify-end p-4 bg-gray-100 dark:bg-neutral-900',
                className,
            )}
        >
            {children}
        </div>
    )
}

const Overlay = ({ className }: { className?: string }) => {
    return (
        <motion.div
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
                backdropFilter: 'blur(10px)',
            }}
            exit={{
                opacity: 0,
                backdropFilter: 'blur(0px)',
            }}
            className={`fixed inset-0 h-full w-full bg-black bg-opacity-50 z-50 ${className}`}
        ></motion.div>
    )
}

const CloseIcon = () => {
    const { setOpen } = useModal()
    return (
        <button
            onClick={() => setOpen()}
            className="absolute top-4 right-4 group"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-black dark:text-white h-4 w-4 group-hover:scale-125 group-hover:rotate-3 transition duration-200"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
            </svg>
        </button>
    )
}

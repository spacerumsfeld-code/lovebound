'use client'

import React from 'react'
import { cn } from '../../lib/utils'
import { Link } from 'next-view-transitions'

export const Button = ({
    href,
    as: Tag = 'a',
    children,
    className,
    disabled = false,
    variant = 'primary',
    onClick,
    ...props
}: {
    href?: string
    as?: React.ElementType
    children: React.ReactNode
    disabled?: boolean
    className?: string
    onClick?: () => void
    variant?: 'primary' | 'secondary' | 'dark' | 'gradient'
} & (
    | React.ComponentPropsWithoutRef<'a'>
    | React.ComponentPropsWithoutRef<'button'>
    | typeof Link
)) => {
    const baseStyles =
        'px-4 py-2 rounded-md bg-white button text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center'

    const variantStyles = {
        primary: 'bg-indigo-400 hover:bg-indigo-300 text-white',
        secondary:
            'bg-transparent shadow-none text-white bg-teal-500 hover:bg-teal-400',
        dark: 'bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]',
        gradient:
            'bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]',
    }

    return (
        <Tag
            href={href || undefined}
            onClick={() => !disabled && onClick?.()}
            className={cn(
                baseStyles,
                variantStyles[variant],
                className,
                disabled && 'opacity-50 cursor-not-allowed',
            )}
            {...props}
        >
            {children}
        </Tag>
    )
}

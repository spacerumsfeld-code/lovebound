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
        'px-4 py-2 rounded-md text-sm font-bold relative cursor-pointer inline-block text-center text-white'

    const variantStyles = {
        primary:
            'shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset] bg-gradient-to-b from-indigo-400 to-indigo-500 hover:bg-indigo-300',
        secondary: 'bg-transparent shadow-none bg-teal-500 hover:bg-teal-400',
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

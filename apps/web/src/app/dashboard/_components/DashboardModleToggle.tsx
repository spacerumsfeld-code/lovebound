'use client'

import { Label } from '@web/src/components/ui/label'
import { Switch } from '@web/src/components/ui/switch'
import { Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export const DashboardThemeToggle = () => {
    // @State
    const { theme, setTheme } = useTheme()
    const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light')
    const isDarkMode = theme === 'dark'

    // @Interactivity
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        setSystemTheme(mediaQuery.matches ? 'dark' : 'light')

        const handleChange = (e: MediaQueryListEvent) => {
            setSystemTheme(e.matches ? 'dark' : 'light')
        }

        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    const SWITCH = () => {
        switch (theme) {
            case 'light':
                setTheme('dark')
                break
            case 'dark':
                setTheme('light')
                break
            case 'system':
                setTheme(systemTheme === 'light' ? 'dark' : 'light')
                break
            default:
                break
        }
    }

    // @Render
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4" />
                <Label htmlFor="dark-mode">Dark mode</Label>
            </div>
            <Switch
                id="dark-mode"
                checked={isDarkMode}
                onCheckedChange={SWITCH}
            />
        </div>
    )
}

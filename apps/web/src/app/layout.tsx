import type { Metadata } from 'next'
import './globals.css'
import { cn } from '../lib/utils'
import localFont from 'next/font/local'
import { AuthProvider } from 'src/providers/AuthProvider'
import { AnalyticsProvider } from 'src/providers/AnalyticsProvider'

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
})
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
})

export const metadata: Metadata = {
    title: 'Lovebound',
    description: 'Make your own romance stories.',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    // *Render
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    `${geistSans.variable} ${geistMono.variable}`,
                    'antialiased dark:bg-neutral-900 bg-white',
                )}
            >
                <AuthProvider>
                    <AnalyticsProvider>{children}</AnalyticsProvider>
                </AuthProvider>
            </body>
        </html>
    )
}

import type { Metadata } from 'next'
import './globals.css'
import { cn } from '../lib/utils'
import { ThemeProvider } from '../providers/ThemeProvider'
import localFont from 'next/font/local'
import { AuthProvider } from 'src/providers/ClerkProvider'

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
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    `${geistSans.variable} ${geistMono.variable}`,
                    'antialiased dark:bg-black bg-white',
                )}
            >
                <AuthProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                    </ThemeProvider>
                </AuthProvider>
            </body>
        </html>
    )
}

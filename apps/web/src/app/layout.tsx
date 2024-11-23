import type { Metadata } from 'next'
import './globals.css'
import { cn } from '../lib/utils'
import { Navbar } from './_components/navbar'
import { Footer } from './_components/footer'
import { ThemeProvider } from '../providers/ThemeProvider'
import localFont from 'next/font/local'
import { ClerkProvider } from '@clerk/nextjs'

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
    title: 'Tension.io',
    description:
        'Make your own romance stories and share them with your friends.',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body
                className={cn(
                    `${geistSans.variable} ${geistMono.variable}`,
                    'antialiased dark:bg-black bg-white',
                )}
            >
                <ClerkProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <Navbar />
                        {children}
                        <Footer />
                    </ThemeProvider>
                </ClerkProvider>
            </body>
        </html>
    )
}

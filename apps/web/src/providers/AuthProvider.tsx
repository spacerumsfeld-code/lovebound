import { ClerkProvider } from '@clerk/nextjs'

/**
 * @summary
 * This is how we customize the SignIn component copy.
 */
const localization = {
    signIn: {
        start: {
            title: 'Lovebound',
            subtitle: 'Sign in or sign up to continue',
        },
    },
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    return <ClerkProvider localization={localization}>{children}</ClerkProvider>
}

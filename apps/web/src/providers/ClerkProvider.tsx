import { Resource } from 'sst'
import { ClerkProvider } from '@clerk/nextjs'

process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY =
    Resource.ClerkPublishableKey.value
process.env.NEXT_PUBLIC_CLERK_SECRET_KEY = Resource.ClerkSecretKey.value

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    return <ClerkProvider>{children}</ClerkProvider>
}

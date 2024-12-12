import { SignedIn, SignedOut, SignIn } from '@clerk/nextjs'
import { Button } from 'src/components/ui/button'
import { SITE_MAP } from 'src/constants'

export const LoginLeft = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <SignedOut>
                <SignIn
                    routing="hash"
                    signUpForceRedirectUrl={SITE_MAP.DASHBOARD}
                    forceRedirectUrl={SITE_MAP.DASHBOARD}
                />
            </SignedOut>
            <SignedIn>
                <p>You are already signed in! Let`&apos;s get to the app.</p>
                <Button href={SITE_MAP.DASHBOARD}>Go to dashboard</Button>
            </SignedIn>
        </div>
    )
}

import { SignedIn, SignedOut, SignIn } from '@clerk/nextjs'
import { Button } from 'src/components/ui/button'
import { Card } from 'src/components/ui/card'
import { SITE_MAP } from 'src/constants'

export const Login = () => {
    // *Render
    return (
        <div className="flex flex-col items-center justify-center">
            <SignedOut>
                <SignIn
                    routing="hash"
                    transferable
                    signUpForceRedirectUrl={SITE_MAP.DASHBOARD}
                    forceRedirectUrl={SITE_MAP.DASHBOARD}
                    appearance={{
                        elements: {
                            footer: 'hidden',
                        },
                    }}
                />
            </SignedOut>
            <SignedIn>
                <Card className="bg-white p-8 flex flex-col justify-center items-center gap-4 min-h-[200px]">
                    <p className="text-lg font-medium">
                        You are already signed in! Let&apos;s get you to your
                        dashboard.
                    </p>
                    <Button variant="primary" href={SITE_MAP.DASHBOARD}>
                        Go to dashboard
                    </Button>
                </Card>
            </SignedIn>
        </div>
    )
}

import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from 'src/components/ui/button'

export const PrivacyPolicy = () => {
    return (
        <main className="py-8 md:py-12 px-4 md:px-8 bg-white bg-dot-black/[0.2]">
            <div className="prose prose-neutral dark:prose-invert max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <Button
                        href="/"
                        as={Link}
                        variant="primary"
                        className="mb-4 flex items-center justify-center md:w-1/4"
                    >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Go back
                    </Button>
                    <Button
                        href="/login"
                        as={Link}
                        variant="primary"
                        className="mb-4 flex items-center justify-center md:w-1/4"
                    >
                        Get Started
                        <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    Privacy Policy
                </h1>
                <p className="text-sm text-muted-foreground mb-8">
                    Last Updated: {new Date().toLocaleDateString()}
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">
                    Our Commitment to Your Privacy
                </h2>
                <p className="mb-6">
                    At Lovebound, we take your privacy seriously. This policy
                    outlines how we collect, use, and protect your personal
                    information when you use our story generation platform.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">
                    Information We Collect
                </h2>
                <h3 className="text-xl font-medium mt-6 mb-3">
                    Account Information
                </h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Email address</li>
                    <li>First and last name</li>
                    <li>Profile picture</li>
                    <li>
                        Authentication information through our secure provider
                        (Clerk)
                    </li>
                </ul>

                <h3 className="text-xl font-medium mt-6 mb-3">
                    Usage Information
                </h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Story preferences and settings</li>
                    <li>Generated story content</li>
                    <li>Credit balance and purchase history</li>
                    <li>Basic analytics data to improve our service</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4">
                    How We Use Your Information
                </h2>
                <h3 className="text-xl font-medium mt-6 mb-3">
                    Essential Services
                </h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>To provide our story generation service</li>
                    <li>To maintain your account and credit balance</li>
                    <li>To authenticate your access to the platform</li>
                </ul>

                <h3 className="text-xl font-medium mt-6 mb-3">
                    Service Improvement
                </h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>To analyze platform performance</li>
                    <li>To enhance user experience</li>
                    <li>To debug technical issues</li>
                    <li>To develop new features</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4">
                    Data Protection
                </h2>
                <h3 className="text-xl font-medium mt-6 mb-3">Your Stories</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>All stories you generate are private by default</li>
                    <li>You maintain full ownership of your created content</li>
                    <li>
                        We employ industry-standard encryption to protect your
                        data
                    </li>
                    <li>
                        Your stories are stored securely and are only accessible
                        to you
                    </li>
                </ul>

                <h3 className="text-xl font-medium mt-6 mb-3">Analytics</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>We use Posthog for basic analytics</li>
                    <li>Analytics data is anonymized where possible</li>
                    <li>
                        We do not sell your personal information to third
                        parties
                    </li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4">
                    Data Storage
                </h2>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Your data is stored securely on our servers</li>
                    <li>We use industry-standard security measures</li>
                    <li>Backups are encrypted and secured</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4">
                    Your Rights
                </h2>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Request data deletion</li>
                    <li>Opt out of marketing communications</li>
                    <li>Export your story data</li>
                    <li>Close your account at any time</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4">
                    Third-Party Services
                </h2>
                <p className="mb-6">
                    We use select third-party services to provide our platform:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Clerk for authentication</li>
                    <li>Stripe for payment processing</li>
                    <li>Posthog for analytics</li>
                    <li>OpenAI for story generation</li>
                </ul>
                <p className="mb-6">
                    Each third-party service is carefully selected and bound by
                    their respective privacy policies and our data protection
                    requirements.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">
                    Children&apos;s Privacy
                </h2>
                <p className="mb-6">
                    Our service is not intended for users under 18 years of age.
                    We do not knowingly collect information from children under
                    18.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">
                    Changes to This Policy
                </h2>
                <p className="mb-6">
                    We may update this privacy policy periodically. We will
                    notify you of any significant changes through our platform
                    or via email.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
                <p className="mb-6">
                    If you have questions about this privacy policy or your
                    personal data, please contact us using the Support button on
                    the bottom right of the screen of your dashboard.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">
                    Your Consent
                </h2>
                <p className="mb-6">
                    By using Lovebound, you consent to this privacy policy and
                    our handling of your data as described above.
                </p>
            </div>
        </main>
    )
}

import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from 'src/components/ui/button'

export const TermsOfService = () => {
    return (
        <div className="py-8 md:py-12 px-4 md:px-8">
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
                    Terms of Service
                </h1>
                <p className="text-sm text-muted-foreground mb-8">
                    Last Updated: {new Date().toLocaleDateString()}
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">
                    Acceptance of Terms
                </h2>
                <p className="mb-6">
                    By accessing and using Lovebound, you agree to be bound by
                    these Terms of Service. If you do not agree to these terms,
                    please do not use our platform.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">
                    Service Description
                </h2>
                <p className="mb-6">
                    Lovebound is a story generation platform that uses AI
                    technology to create personalized stories. Our service
                    includes:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>AI-powered story generation</li>
                    <li>Story customization and settings</li>
                    <li>Credit-based usage system</li>
                    <li>User account management</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4">
                    User Accounts
                </h2>
                <h3 className="text-xl font-medium mt-6 mb-3">
                    Account Requirements
                </h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>You must be 13 years or older to use our service</li>
                    <li>You must provide accurate and complete information</li>
                    <li>
                        You are responsible for maintaining account security
                    </li>
                    <li>One account per user is allowed</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4">
                    Credits and Payments
                </h2>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Credits are required to generate stories</li>
                    <li>All payments are processed securely through Stripe</li>
                    <li>Credits are non-refundable once used</li>
                    <li>Unused credits remain valid in your account</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4">
                    Content Ownership
                </h2>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>You retain ownership of your generated stories</li>
                    <li>
                        You may not redistribute or resell AI-generated content
                    </li>
                    <li>We maintain rights to the underlying AI technology</li>
                    <li>Content must comply with our usage guidelines</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4">
                    Acceptable Use
                </h2>
                <p className="mb-6">You agree not to:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Generate harmful or inappropriate content</li>
                    <li>Attempt to bypass system limitations</li>
                    <li>Share account access with others</li>
                    <li>Use the service for illegal purposes</li>
                    <li>Reverse engineer our technology</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4">
                    Service Availability
                </h2>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>
                        We strive for 99.9% uptime but don&apos;t guarantee it
                    </li>
                    <li>We may perform maintenance with notice</li>
                    <li>Service availability may vary by region</li>
                    <li>We reserve the right to modify features</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4">
                    Termination
                </h2>
                <p className="mb-6">
                    We reserve the right to terminate or suspend accounts that
                    violate these terms. Users may also terminate their accounts
                    at any time.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">
                    Limitation of Liability
                </h2>
                <p className="mb-6">
                    Lovebound is provided &quot;as is&quot; without warranties.
                    We are not liable for any damages arising from service use
                    or interruption.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">
                    Changes to Terms
                </h2>
                <p className="mb-6">
                    We may update these terms periodically. Continued use of
                    Lovebound after changes constitutes acceptance of new terms.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
                <p className="mb-6">
                    For questions about these terms, please contact us using the
                    Support button on the bottom right of the screen.
                </p>
            </div>
        </div>
    )
}

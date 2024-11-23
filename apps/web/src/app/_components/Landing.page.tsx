import { CTA } from './cta'
import { Features } from './features'
import { Hero } from './hero'
import { Pricing } from './pricing'

export const LandingPage = () => {
    return (
        <main>
            <Hero />
            <Features />
            <Pricing />
            <CTA />
        </main>
    )
}

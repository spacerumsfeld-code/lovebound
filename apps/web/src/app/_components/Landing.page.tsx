import { Navbar } from './navbar'
import { Hero } from './Hero'
import { FeatureGrid } from './FeatureGrid'
import { Differentiators } from './Differentiators'
import { Demonstration } from './Demonstration'
import { Pricing } from './pricing'
import { CTA } from './cta'
import { Footer } from './footer'

export const LandingPage = () => {
    // *Render
    return (
        <main className="w-full bg-white bg-dot-black/[0.2]">
            <Navbar />
            <Hero />
            <FeatureGrid />
            <Differentiators />
            <Demonstration />
            <Pricing />
            <CTA />
            <Footer />
        </main>
    )
}

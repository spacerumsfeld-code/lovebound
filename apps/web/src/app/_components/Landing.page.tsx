import { CTA } from './cta'
import { GeminiFlowEffect } from './example'
import { Features } from './features'
import { Footer } from './footer'
// import { Hero } from './hero'
import { Hero } from './test/HeroExp'
import { Navbar } from './navbar'
import { Pricing } from './pricing'

export const LandingPage = () => {
    return (
        <main>
            <Navbar />
            {/* <Hero /> */}
            <Hero />
            <Features />
            <GeminiFlowEffect />
            <Pricing />
            <CTA />
            <Footer />
        </main>
    )
}

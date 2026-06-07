import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/landing/Hero'
import StatsBar from '@/components/landing/StatsBar'
import ReportPreview from '@/components/landing/ReportPreview'
import HowItWorks from '@/components/landing/HowItWorks'
import Features from '@/components/landing/Features'
import Testimonials from '@/components/landing/Testimonials'
import Pricing from '@/components/landing/Pricing'
import FAQ from '@/components/landing/FAQ'
import CTA from '@/components/landing/CTA'
import Footer from '@/components/landing/Footer'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar transparent />
      <Hero />
      <StatsBar />
      <ReportPreview />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}

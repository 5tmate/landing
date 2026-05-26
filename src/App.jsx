import { useEffect } from 'react'
import { IntegrationsSection, CTASection } from './Extras'
import FeaturesSection from './FeaturesSection'
import FinnSection from './FinnSection'
import { Hero } from './Hero'
import { LanguageProvider, useLocale } from './i18n'
import { MarketsSection, PricingSection, FooterSection } from './MarketsAndMore'
import Nav from './Nav'

function AppInner() {
  const { locale } = useLocale()

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <FeaturesSection />
        <FinnSection />
        <MarketsSection />
        <IntegrationsSection />
        <PricingSection />
        <CTASection />
      </main>
      <FooterSection />
    </>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  )
}

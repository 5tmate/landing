import { useEffect } from 'react'
import Nav from './Nav'
import { Hero } from './Hero'
import FeaturesSection from './FeaturesSection'
import FinnSection from './FinnSection'
import { MarketsSection, PricingSection, FooterSection } from './MarketsAndMore'
import { IntegrationsSection, CTASection } from './Extras'
import { LanguageProvider, useLocale } from './i18n'

function AppInner() {
  const { locale } = useLocale()

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return (
    <>
      <Nav />
      <Hero />
      <FeaturesSection />
      <FinnSection />
      <MarketsSection />
      <IntegrationsSection />
      <PricingSection />
      <CTASection />
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

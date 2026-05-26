import React, { useEffect, useRef, useState } from 'react'
import { m } from '@/paraglide/messages.js'

const getFeatures = () => [
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-primary">
        <path
          d="M12 2L2 7l10 5 10-5-10-5z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M2 17l10 5 10-5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.5"
        />
        <path
          d="M2 12l10 5 10-5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.75"
        />
      </svg>
    ),
    title: m.features_card_unified_title(),
    desc: m.features_card_unified_desc(),
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-primary">
        <path
          d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M8 12l3 3 5-6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: m.features_card_insurance_title(),
    desc: m.features_card_insurance_desc(),
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-primary">
        <path
          d="M2 12h4l3-9 6 18 3-9h4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: m.features_card_cashflow_title(),
    desc: m.features_card_cashflow_desc(),
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-primary">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: m.features_card_transfer_title(),
    desc: m.features_card_transfer_desc(),
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-primary">
        <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 12h6M12 9v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: m.features_card_tax_title(),
    desc: m.features_card_tax_desc(),
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-primary">
        <path d="M20 7l-8 5-8-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M4 7v10a2 2 0 002 2h12a2 2 0 002-2V7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 7l8-5 8 5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    title: m.features_card_b2b_title(),
    desc: m.features_card_b2b_desc(),
  },
]

const FeaturesSection = () => {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true)
      },
      { threshold: 0.15 },
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const features = getFeatures()

  return (
    <section
      id="product"
      ref={ref}
      className="relative px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-[120px]"
    >
      <div className="mx-auto max-w-[1200px]">
        <div
          className="mb-12 text-center md:mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <h2
            className="text-foreground mb-4 text-[2rem] font-medium sm:text-[2.5rem] md:text-[3rem]"
            style={{ lineHeight: 1.0, letterSpacing: '-1.056px' }}
          >
            {m.features_headline()}
          </h2>
          <p className="text-muted-foreground mx-auto max-w-[500px] text-base leading-relaxed sm:text-lg">
            {m.features_sub()}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-card/30 border-border hover:bg-card/50 hover:border-primary/15 relative cursor-default overflow-hidden rounded-xl border p-7 transition-all duration-200"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.06}s`,
              }}
            >
              <div className="mb-4 opacity-90">{f.icon}</div>
              <div className="text-foreground mb-2 text-base font-semibold tracking-tight">
                {f.title}
              </div>
              <div className="text-muted-foreground text-sm leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection

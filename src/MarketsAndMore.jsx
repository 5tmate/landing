import React, { useEffect, useRef, useState } from 'react'
import logo from '@/assets/logo.svg'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { m } from '@/paraglide/messages.js'

/* ── Markets Section ── */
const MarketsSection = () => {
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

  const markets = [
    {
      flag: '🇸🇬',
      name: m.markets_name_sg(),
      banks: 'DBS · OCBC · PayNow',
      status: m.markets_status_live(),
    },
    {
      flag: '🇹🇼',
      name: m.markets_name_tw(),
      banks: '玉山 · 台新 · 國泰 · Line Bank',
      status: m.markets_status_live(),
    },
    {
      flag: '🇮🇩',
      name: m.markets_name_id(),
      banks: 'Jago · GoPay · Tonik',
      status: m.markets_status_live(),
    },
    {
      flag: '🇹🇭',
      name: m.markets_name_th(),
      banks: 'Bangkok Bank · TrueMoney · PromptPay',
      status: m.markets_status_live(),
    },
    {
      flag: '🇲🇾',
      name: m.markets_name_my(),
      banks: 'Maybank · GrabPay',
      status: m.markets_status_live(),
    },
    {
      flag: '🇵🇭',
      name: m.markets_name_ph(),
      banks: 'Tonik · GCash',
      status: m.markets_status_live(),
    },
    {
      flag: '🇭🇰',
      name: m.markets_name_hk(),
      banks: 'HSBC · Citibank APAC',
      status: m.markets_status_live(),
    },
    {
      flag: '🇻🇳',
      name: m.markets_name_vn(),
      banks: 'VietcomBank',
      status: m.markets_status_beta(),
    },
  ]

  return (
    <section
      id="markets"
      ref={ref}
      className="relative px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-[120px]"
    >
      <div
        className="pointer-events-none absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 800,
          height: 800,
          background:
            'radial-gradient(ellipse, color-mix(in oklch, var(--color-primary) 3%, transparent) 0%, transparent 60%)',
        }}
      />

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
            {m.markets_headline()}
          </h2>
          <p className="text-muted-foreground mx-auto max-w-[480px] text-base leading-relaxed sm:text-lg">
            {m.markets_sub()}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {markets.map((mkt, i) => (
            <div
              key={mkt.name}
              className="bg-card/30 border-border hover:bg-card/50 hover:border-primary/10 relative overflow-hidden rounded-[10px] border p-[22px_20px] transition-all duration-200"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(16px)',
                transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.05}s`,
              }}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[28px]">{mkt.flag}</span>
                <Badge
                  variant="outline"
                  className={cn(
                    mkt.status === m.markets_status_live()
                      ? 'bg-green-500/10 border-green-500/20 text-green-500'
                      : 'bg-primary/10 border-primary/15 text-primary',
                  )}
                >
                  {mkt.status}
                </Badge>
              </div>
              <div className="text-foreground mb-1.5 text-base font-semibold tracking-tight">
                {mkt.name}
              </div>
              <div className="text-muted-foreground text-xs leading-relaxed">{mkt.banks}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Pricing Section ── */
const PricingSection = () => {
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

  const plans = [
    {
      name: m.pricing_free_name(),
      price: m.pricing_free_price(),
      period: m.pricing_free_period(),
      desc: m.pricing_free_desc(),
      features: [
        m.pricing_free_feat_1(),
        m.pricing_free_feat_2(),
        m.pricing_free_feat_3(),
        m.pricing_free_feat_4(),
      ],
      cta: m.pricing_cta_join(),
      accent: false,
    },
    {
      name: m.pricing_plus_name(),
      price: m.pricing_plus_price(),
      period: m.pricing_plus_period(),
      desc: m.pricing_plus_desc(),
      features: [
        m.pricing_plus_feat_1(),
        m.pricing_plus_feat_2(),
        m.pricing_plus_feat_3(),
        m.pricing_plus_feat_4(),
        m.pricing_plus_feat_5(),
        m.pricing_plus_feat_6(),
      ],
      cta: m.pricing_cta_join(),
      accent: true,
    },
    {
      name: m.pricing_pro_name(),
      price: m.pricing_pro_price(),
      period: m.pricing_pro_period(),
      desc: m.pricing_pro_desc(),
      features: [
        m.pricing_pro_feat_1(),
        m.pricing_pro_feat_2(),
        m.pricing_pro_feat_3(),
        m.pricing_pro_feat_4(),
        m.pricing_pro_feat_5(),
        m.pricing_pro_feat_6(),
      ],
      cta: m.pricing_cta_join(),
      accent: false,
    },
  ]

  return (
    <section id="pricing" ref={ref} className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-[120px]">
      <div className="mx-auto max-w-[1000px]">
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
            {m.pricing_headline()}
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
            {m.pricing_sub()}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {plans.map((p, i) => (
            <div
              key={p.name}
              className={cn(
                'p-8 rounded-xl flex flex-col relative border',
                p.accent ? 'border-primary/20' : 'bg-card/30 border-border',
              )}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.08}s`,
                ...(p.accent
                  ? {
                      background:
                        'linear-gradient(180deg, color-mix(in oklch, var(--color-primary) 6%, transparent), color-mix(in oklch, var(--color-primary) 2%, transparent))',
                    }
                  : {}),
              }}
            >
              {p.accent && (
                <div className="bg-primary text-primary-foreground absolute -top-px left-1/2 -translate-x-1/2 rounded-b-lg px-3 py-0.5 text-[10px] font-bold tracking-widest uppercase">
                  {m.pricing_most_popular()}
                </div>
              )}

              <div
                className={cn(
                  'text-sm font-semibold mb-3',
                  p.accent ? 'text-primary' : 'text-muted-foreground',
                )}
              >
                {p.name}
              </div>
              <div className="mb-2 flex items-baseline gap-1">
                <span className="text-foreground text-[40px] font-medium tracking-[-1px]">
                  {p.price}
                </span>
                <span className="text-muted-foreground text-sm">{p.period}</span>
              </div>
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">{p.desc}</p>

              <div className="mb-7 flex flex-1 flex-col gap-2.5">
                {p.features.map((f, fi) => (
                  <div key={fi} className="flex items-center gap-2">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className={p.accent ? 'text-primary' : 'text-muted-foreground/50'}
                    >
                      <path
                        d="M3 7l3 3 5-6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-muted-foreground text-[13px]">{f}</span>
                  </div>
                ))}
              </div>

              <Button variant={p.accent ? 'default' : 'outline'} className="w-full">
                {p.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Footer ── */
const FooterSection = () => {
  const footerColumns = [
    {
      title: m.footer_col_product(),
      links: [
        m.footer_link_features(),
        m.footer_link_finn_ai(),
        m.footer_link_pricing(),
        m.footer_link_security(),
        m.footer_link_api(),
      ],
    },
    {
      title: m.footer_col_company(),
      links: [
        m.footer_link_about(),
        m.footer_link_careers(),
        m.footer_link_blog(),
        m.footer_link_press(),
      ],
    },
    {
      title: m.footer_col_legal(),
      links: [m.footer_link_privacy(), m.footer_link_terms(), m.footer_link_compliance()],
    },
  ]

  const cities = [m.footer_city_sg(), m.footer_city_tw(), m.footer_city_id(), m.footer_city_th()]

  return (
    <footer className="border-border border-t px-5 pt-16 pb-10 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 grid grid-cols-2 gap-8 sm:grid-cols-4 md:gap-10">
          <div className="col-span-2 sm:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <img src={logo} alt="5tmate" className="size-7 rounded-[7px]" />
              <span
                className="text-foreground text-[17px] font-bold tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                5tmate
              </span>
            </div>
            <p className="text-muted-foreground max-w-[280px] text-[13px] leading-relaxed">
              {m.footer_tagline()}
            </p>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <div className="text-muted-foreground/85 mb-4 text-xs font-semibold tracking-[0.06em] uppercase">
                {col.title}
              </div>
              {col.links.map((link, i) => (
                <a
                  key={i}
                  className="text-muted-foreground hover:text-foreground mb-2.5 block cursor-pointer text-[13px] font-medium no-underline transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className="border-border flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-muted-foreground/85 text-xs">{m.footer_copyright()}</span>
          <div className="flex gap-5">
            {cities.map((city, i) => (
              <span key={i} className="text-muted-foreground/85 text-[11px] font-medium">
                {city}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export { MarketsSection }
export { PricingSection }
export { FooterSection }

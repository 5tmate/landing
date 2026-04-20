import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { m } from '@/paraglide/messages.js'

/* ── Markets Section ── */
const MarketsSection = () => {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const markets = [
    { flag: '🇸🇬', name: m.markets_name_sg(), banks: 'DBS · OCBC · PayNow',              status: m.markets_status_live() },
    { flag: '🇹🇼', name: m.markets_name_tw(), banks: '玉山 · 台新 · 國泰 · Line Bank',  status: m.markets_status_live() },
    { flag: '🇮🇩', name: m.markets_name_id(), banks: 'Jago · GoPay · Tonik',             status: m.markets_status_live() },
    { flag: '🇹🇭', name: m.markets_name_th(), banks: 'Bangkok Bank · TrueMoney · PromptPay', status: m.markets_status_live() },
    { flag: '🇲🇾', name: m.markets_name_my(), banks: 'Maybank · GrabPay',                status: m.markets_status_live() },
    { flag: '🇵🇭', name: m.markets_name_ph(), banks: 'Tonik · GCash',                    status: m.markets_status_live() },
    { flag: '🇭🇰', name: m.markets_name_hk(), banks: 'HSBC · Citibank APAC',             status: m.markets_status_live() },
    { flag: '🇻🇳', name: m.markets_name_vn(), banks: 'VietcomBank',                       status: m.markets_status_beta() },
  ]

  return (
    <section id="markets" ref={ref} className="relative py-16 px-5 sm:py-20 sm:px-8 lg:py-[120px] lg:px-10">
      <div
        className="absolute pointer-events-none"
        style={{
          top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 800, height: 800,
          background: 'radial-gradient(ellipse, color-mix(in oklch, var(--color-primary) 3%, transparent) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-[1200px] mx-auto">
        <div
          className="text-center mb-12 md:mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <h2 className="text-foreground font-medium mb-4 text-[2rem] sm:text-[2.5rem] md:text-[3rem]" style={{ lineHeight: 1.0, letterSpacing: '-1.056px' }}>
            {m.markets_headline()}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-[480px] mx-auto">
            {m.markets_sub()}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {markets.map((mkt, i) => (
            <div
              key={mkt.name}
              className="p-[22px_20px] rounded-[10px] bg-card/30 border border-border relative overflow-hidden hover:bg-card/50 hover:border-primary/10 transition-all duration-200"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(16px)',
                transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.05}s`,
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[28px]">{mkt.flag}</span>
                <Badge
                  variant="outline"
                  className={cn(
                    mkt.status === m.markets_status_live()
                      ? 'bg-green-500/10 border-green-500/20 text-green-500'
                      : 'bg-primary/10 border-primary/15 text-primary'
                  )}
                >
                  {mkt.status}
                </Badge>
              </div>
              <div className="text-base font-semibold text-foreground mb-1.5 tracking-tight">{mkt.name}</div>
              <div className="text-xs text-muted-foreground/70 leading-relaxed">{mkt.banks}</div>
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
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.15 })
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
    <section id="pricing" ref={ref} className="py-16 px-5 sm:py-20 sm:px-8 lg:py-[120px] lg:px-10">
      <div className="max-w-[1000px] mx-auto">
        <div
          className="text-center mb-12 md:mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <h2 className="text-foreground font-medium mb-4 text-[2rem] sm:text-[2.5rem] md:text-[3rem]" style={{ lineHeight: 1.0, letterSpacing: '-1.056px' }}>
            {m.pricing_headline()}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            {m.pricing_sub()}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((p, i) => (
            <div
              key={p.name}
              className={cn(
                'p-8 rounded-xl flex flex-col relative border',
                p.accent
                  ? 'border-primary/20'
                  : 'bg-card/30 border-border'
              )}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.08}s`,
                ...(p.accent ? {
                  background: 'linear-gradient(180deg, color-mix(in oklch, var(--color-primary) 6%, transparent), color-mix(in oklch, var(--color-primary) 2%, transparent))',
                } : {}),
              }}
            >
              {p.accent && (
                <div className="absolute -top-px left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-b-lg bg-primary text-[10px] font-bold text-primary-foreground uppercase tracking-widest">
                  {m.pricing_most_popular()}
                </div>
              )}

              <div className={cn('text-sm font-semibold mb-3', p.accent ? 'text-primary' : 'text-muted-foreground')}>
                {p.name}
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-[40px] font-medium text-foreground tracking-[-1px]">{p.price}</span>
                <span className="text-sm text-muted-foreground/70">{p.period}</span>
              </div>
              <p className="text-sm text-muted-foreground/70 mb-6 leading-relaxed">{p.desc}</p>

              <div className="flex-1 flex flex-col gap-2.5 mb-7">
                {p.features.map((f, fi) => (
                  <div key={fi} className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={p.accent ? 'text-primary' : 'text-muted-foreground/50'}>
                      <path d="M3 7l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-[13px] text-muted-foreground">{f}</span>
                  </div>
                ))}
              </div>

              <Button
                variant={p.accent ? 'default' : 'outline'}
                className="w-full"
              >
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
      links: [
        m.footer_link_privacy(),
        m.footer_link_terms(),
        m.footer_link_compliance(),
      ],
    },
  ]

  const cities = [
    m.footer_city_sg(),
    m.footer_city_tw(),
    m.footer_city_id(),
    m.footer_city_th(),
  ]

  return (
    <footer className="pt-16 pb-10 px-5 sm:px-8 lg:px-10 border-t border-border">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-10 mb-12">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="size-6 rounded-md bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                5
              </div>
              <span className="text-[15px] font-semibold text-foreground">5tmate</span>
            </div>
            <p className="text-[13px] text-muted-foreground/70 leading-relaxed max-w-[280px]">
              {m.footer_tagline()}
            </p>
          </div>

          {footerColumns.map(col => (
            <div key={col.title}>
              <div className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-[0.06em] mb-4">
                {col.title}
              </div>
              {col.links.map((link, i) => (
                <a key={i} className="block text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors no-underline mb-2.5 cursor-pointer">
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-6 flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
          <span className="text-xs text-muted-foreground/60">{m.footer_copyright()}</span>
          <div className="flex gap-5">
            {cities.map((city, i) => (
              <span key={i} className="text-[11px] font-medium text-muted-foreground/60">{city}</span>
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

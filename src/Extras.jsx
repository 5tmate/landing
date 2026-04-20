import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { m } from '@/paraglide/messages.js'

/* ── Integrations Marquee Section ── */
const IntegrationsSection = () => {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const row1 = ['DBS', 'OCBC', '玉山銀行', '台新銀行', '國泰世華', 'Jago', 'Tonik', 'Bangkok Bank', 'Maybank']
  const row2 = ['Line Pay', '街口支付', 'GrabPay', 'GoPay', 'TrueMoney', 'PayNow', 'PromptPay', 'GCash']
  const row3 = ['Syfe', 'StashAway', 'Finnomena', 'Futu Securities', 'FWD', 'AIA', 'Prudential', 'HSBC', 'UOB', 'Citibank']

  const Marquee = ({ items, direction = 'left', speed = 30 }) => (
    <div className="overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
      <div
        className="flex gap-3 w-max"
        style={{ animation: `marquee-${direction} ${speed}s linear infinite` }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <div
            key={i}
            className="px-[18px] py-2 rounded-lg bg-card/30 border border-border text-[13px] font-medium text-muted-foreground/70 whitespace-nowrap shrink-0"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <section
      ref={ref}
      className="relative py-20 border-t border-border/30 border-b border-border/30"
    >
      <div
        className="text-center mb-10 px-10"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <div className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-[0.08em] mb-3">
          {m.integrations_label()}
        </div>
        <h3 className="text-2xl font-medium text-foreground tracking-tight">
          {m.integrations_headline()}
        </h3>
      </div>

      <div
        className="flex flex-col gap-3"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease 0.2s' }}
      >
        <Marquee items={row1} direction="left" speed={40} />
        <Marquee items={row2} direction="right" speed={35} />
        <Marquee items={row3} direction="left" speed={45} />
      </div>
    </section>
  )
}

/* ── CTA Section ── */
const CTASection = () => {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-[120px] px-10">
      <div
        className="max-w-[800px] mx-auto text-center px-[60px] py-20 rounded-2xl relative overflow-hidden border border-primary/10"
        style={{
          background: 'linear-gradient(180deg, color-mix(in oklch, var(--color-primary) 5%, transparent), color-mix(in oklch, var(--color-primary) 1%, transparent))',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '-50%', left: '50%', transform: 'translateX(-50%)',
            width: 500, height: 500,
            background: 'radial-gradient(circle, color-mix(in oklch, var(--color-primary) 8%, transparent) 0%, transparent 60%)',
          }}
        />

        <h2
          className="text-foreground font-medium mb-4 relative"
          style={{ fontSize: 48, lineHeight: 1.05, letterSpacing: '-1.056px' }}
        >
          {m.cta_headline_prefix()}{' '}
          <span className="text-primary">{m.cta_headline_accent()}</span>
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed mb-9 relative">
          {m.cta_body()}
        </p>
        <div className="flex gap-3 justify-center relative">
          <Button size="lg">{m.cta_primary()}</Button>
          <Button size="lg" variant="outline">{m.cta_secondary()}</Button>
        </div>
      </div>
    </section>
  )
}

export { IntegrationsSection }
export { CTASection }

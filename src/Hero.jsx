import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { m } from '@/paraglide/messages.js'

/* ─────────────────────────────────────────
   Phone frame shell
───────────────────────────────────────── */
const PhoneFrame = ({ children }) => (
  <div className="phone-frame">
    {/* Volume up / down */}
    {[82, 120].map((top, i) => (
      <div key={i} className="phone-side-btn" style={{ top }} />
    ))}
    {/* Power */}
    <div className="phone-power-btn" />

    {/* Screen bezel — fixed height so the frame never grows */}
    <div className="phone-screen">
      {children}
    </div>
  </div>
)

/* ─────────────────────────────────────────
   Mobile app demo
───────────────────────────────────────── */
const AnimatedMobileDemo = () => {
  const [netWorth, setNetWorth]               = useState(0)
  const [visibleAccounts, setVisibleAccounts] = useState(0)
  const [showChart, setShowChart]             = useState(false)
  const [hasNotif, setHasNotif]               = useState(false)
  const [finnPhase, setFinnPhase]             = useState('hidden') // hidden|typing|message|actions
  const [finnText, setFinnText]               = useState('')
  const [resetKey, setResetKey]               = useState(0)

  const TARGET = 142380

  const finnMsgRef = useRef(m.hero_demo_finn_msg())
  finnMsgRef.current = m.hero_demo_finn_msg()

  const accounts = [
    { flag: '🇸🇬', name: 'DBS Savings',   sub: m.hero_demo_account_sub_sg(), amount: 'S$24,810',   pos: true,  chg: '+1.2%' },
    { flag: '🇹🇼', name: '玉山 Checking', sub: m.hero_demo_account_sub_tw(), amount: 'NT$412,500', pos: false, chg: '-0.3%' },
    { flag: '🇮🇩', name: 'Jago Wallet',   sub: m.hero_demo_account_sub_id(), amount: 'Rp 48.2M',   pos: true,  chg: '+0.8%' },
  ]

  useEffect(() => {
    const T = []
    const after = (ms, fn) => T.push(setTimeout(fn, ms))

    // Net worth counter  0.4 → 2.2s
    after(400, () => {
      const dur = 1800, t0 = Date.now()
      const id = setInterval(() => {
        const p = Math.min((Date.now() - t0) / dur, 1)
        setNetWorth(Math.round((1 - Math.pow(1 - p, 3)) * TARGET))
        if (p >= 1) clearInterval(id)
      }, 16)
      T.push(id)
    })

    // Chart line draws
    after(700, () => setShowChart(true))

    // Accounts slide in
    accounts.forEach((_, i) => after(2200 + i * 380, () => setVisibleAccounts(i + 1)))

    // Notification badge
    after(3900, () => setHasNotif(true))

    // Finn typing
    after(4500, () => setFinnPhase('typing'))

    // Finn message types out character by character, reading from ref for current locale
    after(5400, () => {
      setFinnPhase('message')
      let i = 0
      const id = setInterval(() => {
        i += 3
        setFinnText(finnMsgRef.current.slice(0, i))
        if (i >= finnMsgRef.current.length) clearInterval(id)
      }, 18)
      T.push(id)
    })

    // Action buttons appear
    after(8400, () => setFinnPhase('actions'))

    // Reset loop at 14s
    after(14000, () => {
      setNetWorth(0); setVisibleAccounts(0); setShowChart(false)
      setHasNotif(false); setFinnPhase('hidden'); setFinnText('')
      setResetKey(k => k + 1)
    })

    return () => T.forEach(clearTimeout)
  }, [resetKey])

  return (
    <PhoneFrame>
      {/* Dynamic Island */}
      <div className="absolute top-[22px] left-1/2 -translate-x-1/2 w-[124px] h-9 rounded-[18px] bg-black z-20" />

      {/* Status bar — wraps around island */}
      <div className="h-[54px] flex items-end justify-between px-6 pb-2 relative z-5 text-[12px] font-semibold text-white/82">
        <span>9:41</span>
        <div className="flex items-center gap-[5px]">
          {/* Signal bars */}
          <svg width="17" height="12" viewBox="0 0 17 12">
            {[0,1,2,3].map(i => (
              <rect key={i} x={i * 4.3} y={12 - (i + 1) * 3} width="3" height={(i + 1) * 3}
                rx="0.6" fill="rgba(255,255,255,0.82)" opacity={i < 2 ? 1 : 0.28} />
            ))}
          </svg>
          {/* WiFi */}
          <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
            <circle cx="7.5" cy="10" r="1.2" fill="rgba(255,255,255,0.82)" />
            <path d="M4.8 7.4a3.8 3.8 0 015.4 0" stroke="rgba(255,255,255,0.82)" strokeWidth="1.3" strokeLinecap="round"/>
            <path d="M2.2 4.8a7.2 7.2 0 0110.6 0" stroke="rgba(255,255,255,0.82)" strokeWidth="1.3" strokeLinecap="round" opacity="0.35"/>
          </svg>
          {/* Battery */}
          <div className="flex items-center gap-px">
            <div className="w-[23px] h-[11px] rounded-[3px] border-[1.5px] border-white/48 p-[1.5px]">
              <div className="w-[76%] h-full bg-white/82 rounded-[1px]" />
            </div>
            <div className="w-[2px] h-[5px] bg-white/35 rounded-r-[1px]" />
          </div>
        </div>
      </div>

      {/* ── Scrollable app body ── */}
      <div className="px-5 pt-[2px] overflow-y-hidden">

        {/* Header row */}
        <div className="flex justify-between items-center mb-[14px]">
          <div>
            <div className="text-[11.5px] text-white/32 font-medium mb-[3px]">{m.hero_demo_good_morning()}</div>
            <div className="text-[18px] font-[650] text-[#f4f5f6] tracking-[-0.5px]">Alvin 👋</div>
          </div>
          {/* Bell */}
          <div className="relative">
            <div className="w-9 h-9 rounded-[12px] bg-white/5 border border-white/[0.07] flex items-center justify-center">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="rgba(255,255,255,0.5)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.73 21a2 2 0 01-3.46 0" stroke="rgba(255,255,255,0.5)" strokeWidth="1.7" strokeLinecap="round"/>
              </svg>
            </div>
            {hasNotif && <div className="notif-dot" />}
          </div>
        </div>

        {/* Net worth card */}
        <div className="net-worth-card">
          <div className="net-worth-glow" />

          <div className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.08em] mb-[5px]">
            {m.hero_demo_total_net_worth()}
          </div>
          <div className="text-[33px] font-[650] tracking-[-1.5px] leading-[1.05] mb-2 tabular-nums text-[#f4f5f6]">
            S$<span className="text-primary">{netWorth.toLocaleString()}</span>
          </div>

          {/* Sparkline */}
          <svg width="100%" height="28" viewBox="0 0 260 28" preserveAspectRatio="none" className="block mb-[7px]">
            <defs>
              <linearGradient id="mFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 26 C50 24 80 20 110 16 S160 10 190 8 S230 4 260 2"
              fill="none" stroke="var(--color-primary)" strokeWidth="1.6"
              style={{ strokeDasharray: 450, strokeDashoffset: showChart ? 0 : 450, transition: 'stroke-dashoffset 1.6s cubic-bezier(0.16,1,0.3,1)' }} />
            <path d="M0 26 C50 24 80 20 110 16 S160 10 190 8 S230 4 260 2 L260 30 L0 30 Z"
              fill="url(#mFill)"
              style={{ opacity: showChart ? 1 : 0, transition: 'opacity 1.4s ease 0.4s' }} />
          </svg>

          <div className="flex items-center gap-[6px]">
            <span className="text-[10px] font-semibold text-green-500 bg-green-500/10 px-2 py-[2px] rounded-full">
              ↑ 4.2%
            </span>
            <span className="text-[10px] text-white/[0.28]">{m.hero_demo_this_month_markets()}</span>
          </div>
        </div>

        {/* Accounts list */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[13px] font-semibold text-[#f0f0f2] tracking-[-0.2px]">{m.hero_demo_accounts()}</span>
            <span className="text-[11px] font-medium text-primary">{m.hero_demo_see_all()}</span>
          </div>
          {accounts.map((a, i) => (
            <div key={i} className={cn(
              'account-row transition-all duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
              visibleAccounts > i ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3',
            )}>
              <div className="flex items-center gap-[10px]">
                <div className="w-8 h-8 rounded-[10px] bg-white/6 flex items-center justify-center text-[17px]">
                  {a.flag}
                </div>
                <div>
                  <div className="text-[12px] font-medium text-[#eeeef0] mb-[1.5px]">{a.name}</div>
                  <div className="text-[10px] text-white/[0.28]">{a.sub}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[12px] font-semibold text-[#eeeef0] mb-[1.5px]">{a.amount}</div>
                <div className={`text-[10px] font-medium ${a.pos ? 'text-green-500' : 'text-red-400'}`}>{a.chg}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Finn AI card — always in DOM, opacity-only transition so the phone never grows */}
        <div className={cn(
          'finn-card transition-[opacity,transform] duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
          finnPhase !== 'hidden' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
        )}>
          {/* Finn header */}
          <div className="flex items-center gap-2 mb-[9px]">
            <div className="finn-avatar">F</div>
            <span className="text-[12px] font-semibold text-[#f0f0f2]">Finn</span>
            <div className="ml-auto flex items-center gap-1">
              <span className="inline-block w-[5px] h-[5px] rounded-full bg-green-400" />
              <span className="text-[9px] text-white/[0.28]">now</span>
            </div>
          </div>

          {/* Message area — fixed min-height prevents card reflow between typing/text states */}
          <div className="min-h-[38px] mb-[11px]">
            {finnPhase === 'typing' ? (
              <div className="flex gap-1 pt-[6px]">
                {[0, 1, 2].map(i => (
                  <div key={i} className="finn-typing-dot" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            ) : (
              <p className="text-[12px] text-white/52 leading-[1.6] m-0">
                {finnText || ' '}
              </p>
            )}
          </div>

          {/* Action buttons — always reserve space, opacity-only reveal */}
          <div className={cn(
            'flex gap-[7px] transition-opacity duration-300',
            finnPhase === 'actions' ? 'opacity-100' : 'opacity-0',
          )}>
            <button className="finn-btn-primary">{m.hero_demo_compare_options()}</button>
            <button className="finn-btn-secondary">{m.hero_demo_later()}</button>
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="bottom-nav">
        {[
          { key: 'home',    label: m.hero_demo_tab_home(),    active: true,  icon: <svg width="21" height="21" fill="none" viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></svg> },
          { key: 'markets', label: m.hero_demo_tab_markets(), active: false, icon: <svg width="21" height="21" fill="none" viewBox="0 0 24 24"><polyline points="22,7 13.5,15.5 8.5,10.5 2,17" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/><polyline points="16,7 22,7 22,13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg> },
          { key: 'finn',    label: m.hero_demo_tab_finn(),    active: false, icon: <svg width="21" height="21" fill="none" viewBox="0 0 24 24"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></svg> },
          { key: 'profile', label: m.hero_demo_tab_profile(), active: false, icon: <svg width="21" height="21" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.7"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg> },
        ].map((tab) => (
          <div key={tab.key} className="flex-1 flex flex-col items-center gap-[3px]">
            <div className={tab.active ? 'text-primary' : 'text-white/[0.28]'}>
              {tab.icon}
            </div>
            <span className={`text-[9px] ${tab.active ? 'text-primary font-[650]' : 'text-white/[0.28] font-normal'}`}>
              {tab.label}
            </span>
          </div>
        ))}
      </div>
    </PhoneFrame>
  )
}

/* ─────────────────────────────────────────
   Hero section
───────────────────────────────────────── */
const Hero = () => {
  const [visible, setVisible] = useState(false)
  useEffect(() => { setTimeout(() => setVisible(true), 100) }, [])

  const fadeUp = cn(
    'transition-[opacity,transform] duration-[750ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
    visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[18px]',
  )

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden px-10 pt-20 pb-12">
      <div className="hero-glow-right" />
      <div className="hero-glow-left" />

      <div className="relative w-full max-w-[1200px] mx-auto flex flex-col md:flex-row justify-evenly items-center">

        {/* ── Left: copy ── */}
        <div className="flex flex-col items-start">

          <div className={cn('mb-7', fadeUp)}>
            <Badge variant="outline" className="gap-2 border-primary/20 bg-primary/5 text-primary px-3 py-1 rounded-full h-auto">
              <span className="size-1.5 rounded-full bg-primary" style={{ boxShadow: '0 0 6px var(--color-primary)' }} />
              {m.hero_badge()}
            </Badge>
          </div>

          <h1 className={cn('hero-headline delay-[80ms]', fadeUp)}>
            {m.hero_headline_line1()}<br />
            {m.hero_headline_line2()}<br />
            <span className="text-primary">{m.hero_headline_accent()}</span>
          </h1>

          <p className={cn('hero-body-text delay-[160ms]', fadeUp)}>
            {m.hero_body()}
          </p>

          <div className={cn('flex gap-3 mb-9 delay-[240ms]', fadeUp)}>
            <Button size="lg">{m.hero_cta_primary()}</Button>
            <Button size="lg" variant="outline">{m.hero_cta_secondary()}</Button>
          </div>

          {/* Social proof */}
          <div className={cn('flex items-center gap-[10px] delay-[340ms]', fadeUp)}>
            <div className="flex">
              {['#4ade80', '#60a5fa', '#f472b6', '#fb923c', '#a78bfa'].map((c, i) => (
                <div key={i}
                  className="w-[26px] h-[26px] rounded-full border-2 border-[#08090a]"
                  style={{ background: c, marginLeft: i === 0 ? 0 : -8 }}
                />
              ))}
            </div>
            <span className="text-[12px] text-white/35">
              <span className="text-[#f4f5f6] font-semibold">{m.hero_social_proof_count()}</span>{' '}
              {m.hero_social_proof_label()}
            </span>
          </div>
        </div>

        {/* ── Right: mobile phone ── */}
        <div
          className={cn(
            'flex justify-center items-center py-10',
            visible
              ? 'opacity-100 [transform:perspective(1200px)_rotateY(-6deg)_rotateX(2deg)_translateY(0)]'
              : 'opacity-0 [transform:perspective(1200px)_rotateY(-8deg)_rotateX(4deg)_translateY(24px)]',
          )}
          style={{ transition: 'opacity 1s ease 0.1s, transform 1.2s cubic-bezier(0.16,1,0.3,1) 0.1s' }}
        >
          <AnimatedMobileDemo />
        </div>

      </div>
    </section>
  )
}

export { Hero }

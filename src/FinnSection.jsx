import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { m } from '@/paraglide/messages.js'

const getConversation = () => [
  { role: 'user', text: m.finn_conv_user_1() },
  { role: 'finn', text: m.finn_conv_finn_1() },
  { role: 'user', text: m.finn_conv_user_2() },
  { role: 'finn', text: m.finn_conv_finn_2() },
  { role: 'user', text: m.finn_conv_user_3() },
  { role: 'finn', text: m.finn_conv_finn_3() },
]

const getFinnFeatures = () => [
  { title: m.finn_feature_xborder_title(), desc: m.finn_feature_xborder_desc() },
  { title: m.finn_feature_alerts_title(), desc: m.finn_feature_alerts_desc() },
  { title: m.finn_feature_nudges_title(), desc: m.finn_feature_nudges_desc() },
]

const FinnSection = () => {
  const [activeMsg, setActiveMsg] = useState(0)
  const [typing, setTyping] = useState(false)
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true)
      },
      { threshold: 0.2 },
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    const conversation = getConversation()
    const timer = setInterval(() => {
      setTyping(true)
      setTimeout(() => {
        setTyping(false)
        setActiveMsg((prev) => (prev + 1) % conversation.length)
      }, 800)
    }, 4000)
    return () => clearInterval(timer)
  }, [visible])

  const conversation = getConversation()
  const visibleMsgs = conversation.slice(0, activeMsg + 1)
  const finnFeatures = getFinnFeatures()

  return (
    <section
      id="finn-ai"
      ref={sectionRef}
      className="relative overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-[120px]"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: '10%',
          right: '-10%',
          width: 600,
          height: 600,
          background:
            'radial-gradient(ellipse, color-mix(in oklch, var(--color-primary) 5%, transparent) 0%, transparent 70%)',
        }}
      />

      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-20">
        {/* Left: copy */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-30px)',
            transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <div className="border-primary/20 bg-primary/5 mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1">
            <div className="bg-primary text-primary-foreground flex size-5 items-center justify-center rounded-[5px] text-[10px] font-bold">
              F
            </div>
            <span className="text-primary text-xs font-medium">{m.finn_badge()}</span>
          </div>

          <h2
            className="text-foreground mb-5 text-[2rem] font-medium sm:text-[2.5rem] md:text-[3rem]"
            style={{ lineHeight: 1.0, letterSpacing: '-1.056px' }}
          >
            {m.finn_headline_prefix()}{' '}
            <span className="text-primary">{m.finn_headline_accent()}</span>
          </h2>

          <p className="text-muted-foreground mb-8 max-w-full text-base leading-relaxed sm:text-lg md:max-w-[440px]">
            {m.finn_body()}
          </p>

          <div className="flex flex-col gap-4">
            {finnFeatures.map((f, i) => (
              <div key={i} className="bg-card/30 border-border rounded-lg border px-[18px] py-3.5">
                <div className="text-foreground mb-1 text-sm font-semibold tracking-tight">
                  {f.title}
                </div>
                <div className="text-muted-foreground text-[13px] leading-relaxed">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: chat mockup */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(30px)',
            transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s',
          }}
        >
          <div
            className="bg-card/30 border-border overflow-hidden rounded-xl border"
            style={{
              boxShadow:
                '0 20px 60px -15px rgba(0,0,0,0.4), 0 0 40px -10px color-mix(in oklch, var(--color-primary) 6%, transparent)',
            }}
          >
            {/* Chat header */}
            <div className="border-border bg-card/30 flex items-center gap-2.5 border-b px-5 py-3.5">
              <div className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-[7px] text-[13px] font-bold">
                F
              </div>
              <div>
                <div className="text-foreground text-sm font-semibold">{m.finn_chat_name()}</div>
                <div className="flex items-center gap-1 text-[11px] font-medium text-green-500">
                  <span className="size-1.5 rounded-full bg-green-500" />
                  {m.finn_chat_status()}
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex max-h-[300px] min-h-[300px] flex-col gap-3.5 overflow-hidden p-5 sm:max-h-[380px] sm:min-h-[380px]">
              {visibleMsgs.map((msg, i) => (
                <div
                  key={i}
                  className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}
                  style={{
                    animation: i === visibleMsgs.length - 1 ? 'fadeInMsg 0.4s ease' : 'none',
                  }}
                >
                  <div
                    className={cn(
                      'max-w-[85%] px-3.5 py-2.5 rounded-[10px] text-[13px] leading-relaxed whitespace-pre-line',
                      msg.role === 'user'
                        ? 'bg-primary/10 border border-primary/15 text-foreground/80'
                        : 'bg-card/50 border border-border text-muted-foreground',
                    )}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex gap-1 px-3.5 py-2.5">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="bg-primary/40 size-1.5 rounded-full"
                      style={{ animation: `typingDot 1s ease ${i * 0.15}s infinite` }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-border flex items-center gap-2.5 border-t px-5 py-3">
              <div className="bg-muted/10 border-border text-muted-foreground/85 flex-1 rounded-lg border px-3.5 py-2.5 text-[13px]">
                {m.finn_chat_placeholder()}
              </div>
              <div className="bg-primary text-primary-foreground flex size-[34px] cursor-pointer items-center justify-center rounded-lg text-[15px]">
                ↑
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FinnSection

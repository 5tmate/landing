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
  { title: m.finn_feature_alerts_title(),  desc: m.finn_feature_alerts_desc()  },
  { title: m.finn_feature_nudges_title(),  desc: m.finn_feature_nudges_desc()  },
]

const FinnSection = () => {
  const [activeMsg, setActiveMsg] = useState(0)
  const [typing, setTyping] = useState(false)
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.2 })
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
        setActiveMsg(prev => (prev + 1) % conversation.length)
      }, 800)
    }, 4000)
    return () => clearInterval(timer)
  }, [visible])

  const conversation = getConversation()
  const visibleMsgs = conversation.slice(0, activeMsg + 1)
  const finnFeatures = getFinnFeatures()

  return (
    <section id="finn-ai" ref={sectionRef} className="relative py-16 px-5 sm:py-20 sm:px-8 lg:py-[120px] lg:px-10 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '10%', right: '-10%', width: 600, height: 600,
          background: 'radial-gradient(ellipse, color-mix(in oklch, var(--color-primary) 5%, transparent) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
        {/* Left: copy */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-30px)',
            transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 mb-6">
            <div className="size-5 rounded-[5px] bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground">
              F
            </div>
            <span className="text-xs font-medium text-primary">{m.finn_badge()}</span>
          </div>

          <h2
            className="text-foreground font-medium mb-5 text-[2rem] sm:text-[2.5rem] md:text-[3rem]"
            style={{ lineHeight: 1.0, letterSpacing: '-1.056px' }}
          >
            {m.finn_headline_prefix()}{' '}
            <span className="text-primary">{m.finn_headline_accent()}</span>
          </h2>

          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8 max-w-full md:max-w-[440px]">
            {m.finn_body()}
          </p>

          <div className="flex flex-col gap-4">
            {finnFeatures.map((f, i) => (
              <div key={i} className="px-[18px] py-3.5 rounded-lg bg-card/30 border border-border">
                <div className="text-sm font-semibold text-foreground mb-1 tracking-tight">{f.title}</div>
                <div className="text-[13px] text-muted-foreground/70 leading-relaxed">{f.desc}</div>
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
            className="bg-card/30 border border-border rounded-xl overflow-hidden"
            style={{ boxShadow: '0 20px 60px -15px rgba(0,0,0,0.4), 0 0 40px -10px color-mix(in oklch, var(--color-primary) 6%, transparent)' }}
          >
            {/* Chat header */}
            <div className="px-5 py-3.5 border-b border-border flex items-center gap-2.5 bg-card/30">
              <div className="size-7 rounded-[7px] bg-primary flex items-center justify-center text-[13px] font-bold text-primary-foreground">
                F
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">{m.finn_chat_name()}</div>
                <div className="text-[11px] font-medium text-green-500 flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-green-500" />
                  {m.finn_chat_status()}
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="p-5 flex flex-col gap-3.5 min-h-[300px] max-h-[300px] sm:min-h-[380px] sm:max-h-[380px] overflow-hidden">
              {visibleMsgs.map((msg, i) => (
                <div
                  key={i}
                  className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}
                  style={{ animation: i === visibleMsgs.length - 1 ? 'fadeInMsg 0.4s ease' : 'none' }}
                >
                  <div className={cn(
                    'max-w-[85%] px-3.5 py-2.5 rounded-[10px] text-[13px] leading-relaxed whitespace-pre-line',
                    msg.role === 'user'
                      ? 'bg-primary/10 border border-primary/15 text-foreground/80'
                      : 'bg-card/50 border border-border text-muted-foreground'
                  )}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex gap-1 px-3.5 py-2.5">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="size-1.5 rounded-full bg-primary/40"
                      style={{ animation: `typingDot 1s ease ${i * 0.15}s infinite` }} />
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="px-5 py-3 border-t border-border flex items-center gap-2.5">
              <div className="flex-1 px-3.5 py-2.5 rounded-lg bg-muted/10 border border-border text-[13px] text-muted-foreground/60">
                {m.finn_chat_placeholder()}
              </div>
              <div className="size-[34px] rounded-lg bg-primary flex items-center justify-center cursor-pointer text-[15px] text-primary-foreground">
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

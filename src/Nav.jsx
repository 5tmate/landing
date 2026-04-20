import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { cn } from '@/lib/utils'
import { m } from '@/paraglide/messages.js'

const navLinks = () => [
  { label: m.nav_product(), href: '#product' },
  { label: m.nav_finn_ai(), href: '#finn-ai' },
  { label: m.nav_markets(), href: '#markets' },
  { label: m.nav_pricing(), href: '#pricing' },
]

const Nav = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-[100] px-10 transition-all duration-300',
      scrolled
        ? 'bg-background/85 backdrop-blur-xl border-b border-border'
        : 'bg-transparent border-b border-transparent'
    )}>
      <div className="max-w-[1200px] mx-auto flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-[7px] bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
            5
          </div>
          <span className="text-[17px] font-semibold text-foreground tracking-tight">5tmate</span>
        </div>

        <div className="flex items-center gap-8">
          {navLinks().map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors no-underline cursor-pointer"
            >
              {label}
            </a>
          ))}
          <div className="w-px h-5 bg-border" />
          <a className="text-xs font-medium text-muted-foreground no-underline cursor-pointer">
            {m.nav_login()}
          </a>
          <LanguageSwitcher />
          <Button size="sm">{m.nav_join_waitlist()}</Button>
        </div>
      </div>
    </nav>
  )
}

export default Nav

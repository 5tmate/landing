import React, { useEffect, useState } from 'react'
import logo from '@/assets/logo.svg'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { Button } from '@/components/ui/button'
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
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-[100] px-10 transition-all duration-300',
        scrolled
          ? 'bg-background/85 backdrop-blur-xl border-b border-border'
          : 'bg-transparent border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logo} alt="5tmate" className="size-8 rounded-[8px]" />
        </div>

        <div className="flex items-center gap-8">
          {navLinks().map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-muted-foreground hover:text-foreground cursor-pointer text-xs font-medium no-underline transition-colors"
            >
              {label}
            </a>
          ))}
          <div className="bg-border h-5 w-px" />
          <a className="text-muted-foreground cursor-pointer text-xs font-medium no-underline">
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

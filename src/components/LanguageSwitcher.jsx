import { useEffect, useRef, useState } from 'react'
import { LOCALES, useLocale } from '@/i18n'
import { cn } from '@/lib/utils'

const ChevronDown = ({ open }) => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    style={{ transition: 'transform 0.18s ease', transform: open ? 'rotate(180deg)' : 'none' }}
  >
    <path
      d="M2 3.5l3 3 3-3"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const Check = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path
      d="M2.5 6l2.5 2.5 4.5-5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0]

  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer border-0',
          'bg-transparent hover:bg-white/5',
          open ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
        )}
      >
        <span>{current.short}</span>
        <ChevronDown open={open} />
      </button>

      {open && (
        <div
          className="border-border absolute top-full right-0 z-200 mt-1.5 w-36 overflow-hidden rounded-lg border"
          style={{
            background: 'color-mix(in oklch, var(--color-background) 92%, transparent)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)',
          }}
        >
          {LOCALES.map(({ code, label, short }) => (
            <button
              key={code}
              onClick={() => {
                setLocale(code)
                setOpen(false)
              }}
              className={cn(
                'w-full flex items-center justify-between px-3 py-2 text-xs cursor-pointer transition-colors border-0 bg-transparent text-left',
                locale === code
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5',
              )}
            >
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground/50 w-5 shrink-0 font-medium">{short}</span>
                <span className={cn('font-medium', locale === code ? 'text-foreground' : '')}>
                  {label}
                </span>
              </div>
              {locale === code && (
                <span className="text-primary shrink-0">
                  <Check />
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

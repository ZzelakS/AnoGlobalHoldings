'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import ThemeToggle from './ThemeToggle'
import { NAV, SITE } from '@/config/site'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          scrolled || open ? 'border-line bg-bg/85 backdrop-blur-xl' : 'border-transparent'
        }`}
      >
        <div className="container-outer flex h-[96px] min-w-0 items-center justify-between gap-3 sm:h-[104px] lg:h-[124px]">
          <Link href="/" aria-label={`${SITE.name}, home`} className="block min-w-0 shrink">
            {/* both variants ship; CSS picks the one that suits the theme */}
            <Image src="/logo.svg" alt={SITE.name} width={540} height={221} priority className="h-auto w-[176px] max-w-[47vw] dark:hidden sm:w-[200px] lg:w-[248px]" />
            <Image src="/logo-dark.svg" alt="" aria-hidden width={540} height={221} className="hidden h-auto w-[176px] max-w-[47vw] dark:block sm:w-[200px] lg:w-[248px]" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => {
              const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`group relative py-1 font-mono text-[0.72rem] uppercase tracking-[0.14em] transition-colors duration-200 ${
                    active ? 'text-gold-text' : 'text-muted hover:text-heading'
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-gold transition-transform duration-300 ${
                      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              )
            })}
            <ThemeToggle />
          </nav>

          <div className="flex shrink-0 items-center gap-2.5 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-sm border border-line-hi text-heading transition-colors duration-200 hover:border-gold"
            >
              {/* hamburger */}
              <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true">
                <line x1="0" y1="1" x2="18" y2="1" stroke="currentColor" strokeWidth="1.6" />
                <line x1="0" y1="6" x2="18" y2="6" stroke="currentColor" strokeWidth="1.6" />
                <line x1="0" y1="11" x2="18" y2="11" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-nav"
        aria-hidden={!open}
        className={`band fixed inset-0 z-[60] transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="container-outer flex h-[84px] items-center justify-between">
          <Image src="/logo-dark.svg" alt="" aria-hidden width={540} height={221} className="h-auto w-[176px] max-w-[47vw]" />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="grid h-10 w-10 place-items-center rounded-sm border border-gold/40 text-gold transition-colors duration-200 hover:border-gold"
          >
            {/* x */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <line x1="1" y1="1" x2="15" y2="15" stroke="currentColor" strokeWidth="1.6" />
              <line x1="15" y1="1" x2="1" y2="15" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
        </div>
        <nav aria-label="Mobile" className="container-outer mt-10 flex flex-col">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-b border-white/10 py-5 font-display text-[1.6rem] uppercase tracking-[-0.01em] text-[#F0ECE2]"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}

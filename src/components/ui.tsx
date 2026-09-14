'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'

type Accent = 'gold' | 'forest' | 'paper'

const HEX: Record<Accent, string> = {
  gold: '#B8893B',
  forest: '#1B4332',
  paper: '#EFEBE1',
}

/**
 * CTA. A gold hairline wipes up the left edge and a light sweep crosses the
 * face on hover, and the button leans a few pixels toward the cursor.
 *
 * External links open in a NEW TAB.
 */
export function Btn({
  href,
  children,
  accent = 'gold',
  variant = 'solid',
  external = false,
  className = '',
}: {
  href: string
  children: ReactNode
  accent?: Accent
  variant?: 'solid' | 'outline'
  external?: boolean
  className?: string
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const raf = useRef(0)

  const onMove = useCallback((e: React.PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      el.style.transform = `translate(${(dx * 4).toFixed(2)}px, ${(dy * 3).toFixed(2)}px)`
    })
  }, [])

  const reset = useCallback(() => {
    const el = ref.current
    if (!el) return
    cancelAnimationFrame(raf.current)
    el.style.transform = ''
  }, [])

  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  const solid = variant === 'solid'
  const cls =
    'group relative inline-flex max-w-full items-center gap-3 overflow-hidden whitespace-normal break-words rounded-sm px-5 py-4 text-left font-mono text-[0.66rem] uppercase leading-snug tracking-[0.14em] transition-[transform,border-color,background-color] duration-300 will-change-transform sm:px-7 sm:text-[0.7rem] sm:tracking-[0.16em] ' +
    (solid
      ? 'bg-gold text-[#12180F] hover:bg-gold-hi'
      : 'border border-line-hi text-body hover:border-gold') +
    ' ' +
    className

  const inner = (
    <>
      {!solid ? (
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-[2px] origin-bottom scale-y-0 bg-gold transition-transform duration-300 group-hover:scale-y-100"
        />
      ) : null}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />
      <span className="relative">{children}</span>
      <svg
        className="relative mt-px flex-none self-center transition-transform duration-300 group-hover:translate-x-1"
        width="15"
        height="10"
        viewBox="0 0 15 10"
        fill="none"
        aria-hidden="true"
      >
        <path d="M0 5h13M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    </>
  )

  if (external) {
    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        onPointerMove={onMove}
        onPointerLeave={reset}
      >
        {inner}
      </a>
    )
  }
  return (
    <Link ref={ref} href={href} className={cls} onPointerMove={onMove} onPointerLeave={reset}>
      {inner}
    </Link>
  )
}

export function Caption({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`caption ${className}`}>{children}</p>
}

/** Gold hairline that draws itself when it enters view. */
export function Rule({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [live, setLive] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) return setLive(true)
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (setLive(true), io.unobserve(e.target))),
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`rule-gold transition-transform duration-[900ms] ease-out ${className}`}
      style={{ transform: live ? 'scaleX(1)' : 'scaleX(0)' }}
    />
  )
}

/**
 * Glass plate. Frosted, with a pointer-tracked specular highlight and a
 * hairline catch-light on the top edge. Pointer position is written to CSS
 * custom properties, never to React state.
 */
export function GlassPanel({
  children,
  className = '',
  accent = 'gold',
}: {
  children: ReactNode
  className?: string
  accent?: Accent
}) {
  const ref = useRef<HTMLDivElement>(null)
  const raf = useRef(0)

  const onMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      el.style.setProperty('--px', `${((e.clientX - r.left) / r.width) * 100}%`)
      el.style.setProperty('--py', `${((e.clientY - r.top) / r.height) * 100}%`)
    })
  }, [])

  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerEnter={() => ref.current?.style.setProperty('--glare', '1')}
      onPointerLeave={() => ref.current?.style.setProperty('--glare', '0')}
      style={{ '--px': '30%', '--py': '20%', '--glare': '0' } as React.CSSProperties}
      className={`group/glass relative overflow-hidden rounded-panel px-[clamp(24px,3.4vw,44px)] py-[clamp(28px,3.4vw,44px)] ring-1 ring-gold/20 backdrop-blur-2xl ${className}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-surface/60 dark:bg-surface/45"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[var(--glare)] transition-opacity duration-500"
        style={{
          background: `radial-gradient(38% 44% at var(--px) var(--py), ${HEX[accent]}2E, transparent 70%)`,
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent"
      />
      {children}
    </div>
  )
}

/** A plate that is scanned in by a sweeping gold line the first time it is seen. */
export function ScanPanel({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) return setSeen(true)
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (setSeen(true), io.unobserve(e.target))),
      { threshold: 0.22 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {seen ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px animate-scanline"
          style={{ background: 'linear-gradient(90deg,transparent,#D9A94E,transparent)', boxShadow: '0 0 14px #B8893B' }}
        />
      ) : null}
      <div className={`transition-opacity duration-700 ${seen ? 'opacity-100' : 'opacity-0'}`}>
        {children}
      </div>
    </div>
  )
}

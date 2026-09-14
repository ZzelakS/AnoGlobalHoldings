'use client'

import { useEffect, useRef, useState, type ReactNode, type ElementType } from 'react'

/** Fade and rise on first view, with optional stagger. */
export default function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  className = '',
}: {
  children: ReactNode
  as?: ElementType
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) return setShown(true)
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (setShown(true), io.unobserve(e.target))),
      { threshold: 0.18, rootMargin: '0px 0px -6% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}s` }}
      className={`transition-[opacity,transform] duration-[800ms] ease-out ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-[14px] opacity-0'
      } ${className}`}
    >
      {children}
    </Tag>
  )
}

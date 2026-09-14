'use client'

import { useEffect, useState } from 'react'

/**
 * Light and dark. The choice persists, and a first-time visitor gets whatever
 * their system prefers. The inline script in layout.tsx applies the class before
 * first paint so there is no flash of the wrong theme.
 */
export default function ThemeToggle({ className = '' }: { className?: string }) {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem('agh-theme', next ? 'dark' : 'light')
    } catch {
      /* private mode: the choice simply does not persist */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`grid h-10 w-10 place-items-center rounded-sm border border-line-hi text-gold transition-colors duration-200 hover:border-gold ${className}`}
    >
      {dark ? (
        /* sun */
        <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="10" cy="10" r="3.6" stroke="currentColor" strokeWidth="1.3" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <line
              key={a}
              x1="10"
              y1="1.6"
              x2="10"
              y2="3.4"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              transform={`rotate(${a} 10 10)`}
            />
          ))}
        </svg>
      ) : (
        /* moon */
        <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M16 12.4A7 7 0 0 1 7.6 4a7 7 0 1 0 8.4 8.4Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  )
}

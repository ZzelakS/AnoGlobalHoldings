'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { ImageSlot } from '@/config/site'

/**
 * ROTATING GALLERY
 *
 * Rucker Park Africa rotating gallery.
 *
 * Mobile:
 * - Full-width image with a tall 3:4 aspect ratio
 * - Caption sits below the image instead of overlaying it
 * - Dot navigation sits below the caption
 * - Swipe navigation
 * - Caption responds to light/dark mode
 *
 * Desktop:
 * - Retains the original 16:9 presentation
 * - Caption and dots remain overlaid on the image
 * - No arrow controls
 *
 * Autoplay is slow (6s), pauses on hover, focus and touch, and never runs
 * under prefers-reduced-motion.
 */
export default function Carousel({
    slots,
    ratio = 'aspect-[4/3] lg:aspect-[16/9]',
    className = '',
}: {
    slots: ImageSlot[]
    ratio?: string
    className?: string
}) {
    const [index, setIndex] = useState(0)
    const [paused, setPaused] = useState(false)
    const reducedRef = useRef(false)
    const touchX = useRef<number | null>(null)
    const count = slots.length

    useEffect(() => {
        reducedRef.current = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches
    }, [])

    const go = useCallback(
        (next: number) => {
            setIndex(((next % count) + count) % count)
        },
        [count]
    )

    useEffect(() => {
        if (paused || reducedRef.current || count < 2) return

        const id = window.setInterval(() => {
            go(index + 1)
        }, 6000)

        return () => window.clearInterval(id)
    }, [index, paused, count, go])

    if (count === 0) return null

    const current = slots[index]

    return (
        <div
            className={`group/carousel ${className}`}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            onKeyDown={(e) => {
                if (e.key === 'ArrowRight') go(index + 1)
                if (e.key === 'ArrowLeft') go(index - 1)
            }}
        >
            {/* IMAGE FRAME */}
            <div
                role="region"
                aria-roledescription="carousel"
                aria-label="Rucker Park Africa, Lagos"
                className={`relative overflow-hidden rounded-md bg-[#0C120F] ring-1 ring-gold/25 ${ratio}`}
                onTouchStart={(e) => {
                    touchX.current = e.touches[0].clientX
                    setPaused(true)
                }}
                onTouchEnd={(e) => {
                    if (touchX.current !== null) {
                        const dx =
                            e.changedTouches[0].clientX - touchX.current

                        if (Math.abs(dx) > 40) {
                            go(index + (dx < 0 ? 1 : -1))
                        }
                    }

                    touchX.current = null
                    setPaused(false)
                }}
            >
                {slots.map((slot, i) => (
                    <div
                        key={slot.src}
                        aria-hidden={i !== index}
                        className={`absolute inset-0 transition-opacity duration-700 ease-out ${i === index
                            ? 'opacity-100'
                            : 'pointer-events-none opacity-0'
                            }`}
                    >
                        <Image
                            src={slot.src}
                            alt={slot.alt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 1200px"
                            priority={i === 0}
                            className="object-cover"
                        />
                    </div>
                ))}

                {/* Forest wash — desktop only */}
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(180deg,transparent_45%,rgba(16,32,26,.8)_100%)] lg:block"
                />

                {current.placeholder ? (
                    <span className="absolute right-3 top-3 z-10 rounded-sm bg-[#0C120F] px-2.5 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-gold">
                        Placeholder
                    </span>
                ) : null}

                {/* DESKTOP CAPTION + DOTS */}
                <div className="absolute inset-x-0 bottom-0 z-10 hidden p-6 lg:block lg:p-10">
                    {count > 1 ? (
                        <div className="mb-4 flex justify-center gap-2">
                            {slots.map((slot, i) => (
                                <button
                                    key={slot.src}
                                    type="button"
                                    onClick={() => go(i)}
                                    aria-label={`Go to photograph ${i + 1}`}
                                    aria-current={i === index}
                                    className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ${i === index
                                        ? 'w-6 bg-gold'
                                        : 'w-1.5 bg-[#F0ECE2]/40 hover:bg-[#F0ECE2]/70'
                                        }`}
                                />
                            ))}
                        </div>
                    ) : null}

                    <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[#F0ECE2]">
                        {current.caption}
                    </p>
                </div>
            </div>

            {/* MOBILE CAPTION + DOTS */}
            <div className="block px-1 pt-6 lg:hidden">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[#0C120F] dark:text-[#F0ECE2]">
                    {current.caption}
                </p>

                {count > 1 ? (
                    <div className="mt-7 flex justify-center gap-2 pb-2">
                        {slots.map((slot, i) => (
                            <button
                                key={slot.src}
                                type="button"
                                onClick={() => go(i)}
                                aria-label={`Go to photograph ${i + 1}`}
                                aria-current={i === index}
                                className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ${i === index
                                    ? 'w-6 bg-gold'
                                    : 'w-1.5 bg-[#0C120F]/25 hover:bg-[#0C120F]/50 dark:bg-[#F0ECE2]/30 dark:hover:bg-[#F0ECE2]/50'
                                    }`}
                            />
                        ))}
                    </div>
                ) : null}
            </div>
        </div>
    )
}
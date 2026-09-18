import Image from 'next/image'
import type { ImageSlot } from '@/config/site'

/**
 * The one image treatment on the site.
 *
 * A gold hairline frame, a fixed aspect ratio, and — per Design Specification
 * section 6 — a Forest wash whenever text sits over the photograph, so nothing
 * is ever set on untreated imagery.
 *
 * While `slot.placeholder` is true a small tag names what the real photograph
 * should be. Drop the real file in at the same path and remove the flag.
 */
export default function Figure({
  slot,
  ratio = 'aspect-[16/9]',
  overlay = false,
  priority = false,
  sizes = '(max-width: 1024px) 100vw, 1200px',
  className = '',
  children,
}: {
  slot: ImageSlot
  ratio?: string
  overlay?: boolean
  priority?: boolean
  sizes?: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <figure className={`relative overflow-hidden rounded-md ring-1 ring-gold/25 ${ratio} ${className}`}>
      <Image
        src={slot.src}
        alt={slot.alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />

      {/* Forest wash: only where copy sits on top */}
      {overlay ? (
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,32,26,.35)_0%,rgba(16,32,26,.85)_100%)]"
        />
      ) : null}

      {slot.placeholder ? (
        <span className="absolute right-3 top-3 rounded-sm bg-[#0C120F] px-2.5 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-gold">
          Placeholder
        </span>
      ) : null}

      {children ? <figcaption className="absolute inset-x-0 bottom-0 p-6 lg:p-10">{children}</figcaption> : null}
    </figure>
  )
}

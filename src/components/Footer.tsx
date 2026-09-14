import Image from 'next/image'
import Link from 'next/link'
import { Rule } from './ui'
import { BUILT_BY, COMPANIES, NAV, SITE, whatsappHref } from '@/config/site'

export default function Footer() {
  return (
    <footer className="band relative z-[2]">
      <div className="container-outer pb-10 pt-24">
        <div className="content">
          {/* the wordmark runs large here, as a sign-off */}
          <Image
            src="/logo-dark.svg"
            alt={SITE.name}
            width={540}
            height={221}
            className="h-24 w-auto sm:h-32 lg:h-40"
          />
          <Rule className="mt-10" />

          <div className="mt-12 grid gap-12 md:grid-cols-3">
            <div>
              <p className="caption">Offices</p>
              <p className="mt-4 text-[15px] text-[#DCD8CC]">Hong Kong · Lagos</p>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-2 block text-[15px] text-[#DCD8CC] transition-colors duration-200 hover:text-gold"
              >
                {SITE.email}
              </a>
            </div>

            <nav aria-label="Footer" className="flex flex-col gap-3">
              <p className="caption mb-1">Pages</p>
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[15px] text-[#DCD8CC] transition-colors duration-200 hover:text-gold"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-3">
              <p className="caption mb-1">Group companies</p>
              {[COMPANIES.energy, COMPANIES.foundation].map((c) => (
                <a
                  key={c.href}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] text-[#DCD8CC] transition-colors duration-200 hover:text-gold"
                >
                  {c.label}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-16 border-t border-white/10 pt-8">
            <p className="text-[14px] text-[#DCD8CC]/75">
              © 2026 {SITE.name}. All rights reserved. Built by{' '}
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-gold transition-colors duration-200 hover:text-gold-hi hover:underline"
              >
                {BUILT_BY.name}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
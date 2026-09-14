import type { Metadata } from 'next'
import { Suspense } from 'react'
import EnquiryForm from '@/components/EnquiryForm'
import Figure from '@/components/Figure'
import Reveal from '@/components/Reveal'
import { Btn, Caption, GlassPanel, Rule, ScanPanel } from '@/components/ui'
import { CONTACT } from '@/config/content'
import { COMPANIES, IMAGES, SITE } from '@/config/site'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Ano Global Holdings. Hong Kong and Lagos. Commercial enquiries to anoenergy.com, foundation and programme enquiries to anocaresfoundation.org.',
}

export default function ContactPage() {
  return (
    <>
      <section className="bg-bg pb-section pt-[132px] sm:pt-44 lg:pt-64">
        <div className="container-outer">
          <div className="content">
            <Reveal>
              <h1 className="text-h1">{CONTACT.title}</h1>
              <div className="mt-major">
                <p className="font-serif text-h2 text-heading">{CONTACT.org}</p>
                <Caption className="mt-4">{CONTACT.locations}</Caption>
                <p className="mt-6 text-lead">
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-body underline decoration-gold decoration-1 underline-offset-[3px] transition-colors duration-200 hover:decoratiband"
                  >
                    {SITE.email}
                  </a>
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="mt-major">
              <Figure slot={IMAGES.contact} ratio="aspect-[4/6] lg:aspect-[1/1]" sizes="(max-width: 1024px) 100vw, 640px" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Routing enquiries onward is half the point of this page. */}
      <section className="bg-surface section">
        <div className="container-outer">
          <div className="content">
            <div className="grid gap-major lg:grid-cols-2">
              <Reveal>
                <Rule />
                <p className="mt-8 text-lead">{CONTACT.commercial}</p>
                <div className="mt-6">
                  <Btn href={COMPANIES.energy.href} accent="gold" external>
                    {COMPANIES.energy.label}
                  </Btn>
                </div>
              </Reveal>
              <Reveal>
                <Rule />
                <p className="mt-8 text-lead">{CONTACT.foundation}</p>
                <div className="mt-6">
                  <Btn href={COMPANIES.foundation.href} accent="gold" external>
                    {COMPANIES.foundation.label}
                  </Btn>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg section">
        <div className="container-outer">
          <div className="content">
            <Reveal>
              <h2 className="text-h2">{CONTACT.formHeading}</h2>
              <div className="mt-major">
                <Suspense fallback={null}>
                  <EnquiryForm />
                </Suspense>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}

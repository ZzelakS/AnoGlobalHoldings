import type { Metadata } from 'next'
import Reveal from '@/components/Reveal'
import { Btn, Caption, GlassPanel, Rule, ScanPanel } from '@/components/ui'
import { COMPANIES_PAGE } from '@/config/content'
import { COMPANIES } from '@/config/site'

export const metadata: Metadata = {
  title: 'Our Companies',
  description:
    'Ano Energy sources energy and electric mobility technology from China for African markets. The Anosike Cares Foundation is a global human development organization.',
}

export default function OurCompaniesPage() {
  return (
    <>
      <section className="bg-bg pb-section pt-[132px] sm:pt-44 lg:pt-64">
        <div className="container-outer">
          <div className="content">
            <Reveal>
              <h1 className="text-h1">{COMPANIES_PAGE.title}</h1>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-bg pb-section">
        <div className="container-outer">
          <div className="content">
            <Reveal as="article">
              <Rule />
              <h2 className="mt-8 text-h2">{COMPANIES_PAGE.energy.name}</h2>
              <Caption className="mt-4">{COMPANIES_PAGE.energy.meta}</Caption>
              <div className="measure mt-major space-y-6">
                {COMPANIES_PAGE.energy.body.map((para) => (
                  <p key={para} className="text-body">
                    {para}
                  </p>
                ))}
              </div>
              <div className="mt-major">
                <Btn href={COMPANIES.energy.href} accent="gold" external>
                  {COMPANIES.energy.cta}
                </Btn>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="band section">
        <div className="container-outer">
          <div className="content">
            <Reveal as="article">
              <span aria-hidden="true" className="block h-px w-16 bg-gold" />
              <h2 className="mt-8 text-h2">{COMPANIES_PAGE.foundation.name}</h2>
              <p className="caption mt-4 text-gold">{COMPANIES_PAGE.foundation.meta}</p>
              <div className="measure mt-major space-y-6">
                {COMPANIES_PAGE.foundation.body.map((para) => (
                  <p key={para} className="text-body text-[#DCD8CC]">
                    {para}
                  </p>
                ))}
              </div>
              <div className="mt-major">
                <Btn href={COMPANIES.foundation.href} accent="gold" variant="outline" external>
                  {COMPANIES.foundation.cta}
                </Btn>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}

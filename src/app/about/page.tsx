import type { Metadata } from 'next'
import Figure from '@/components/Figure'
import Reveal from '@/components/Reveal'
import { Btn, Caption, GlassPanel, Rule, ScanPanel } from '@/components/ui'
import { ABOUT } from '@/config/content'
import { IMAGES } from '@/config/site'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Ano Global Holdings is a strategic platform registered in Hong Kong, operating across energy, infrastructure, human development, and global partnerships.',
}

export default function AboutPage() {
  return (
    <>
      <section className="bg-bg pb-section pt-[132px] sm:pt-44 lg:pt-64">
        <div className="container-outer">
          <div className="content">
            <Reveal>
              <h1 className="max-w-[16ch] text-h1">{ABOUT.title}</h1>
            </Reveal>
            <Reveal delay={0.1} className="mt-major">
              <Figure slot={IMAGES.premise} ratio="aspect-[21/9]" priority />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="band section">
        <div className="container-outer">
          <div className="content">
            <Reveal>
              <h2 className="text-h2">{ABOUT.whatHeading}</h2>
              <div className="measure mt-major space-y-6">
                {ABOUT.what.map((para) => (
                  <p key={para} className="text-lead text-[#DCD8CC]">
                    {para}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-bg section">
        <div className="container-outer">
          <div className="content">
            <Reveal>
              <h2 className="text-h2">{ABOUT.whyHeading}</h2>
              <div className="measure mt-major space-y-6">
                {ABOUT.why.map((para) => (
                  <p key={para} className="text-body">
                    {para}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-surface section">
        <div className="container-outer">
          <div className="content">
            <Reveal>
              <div className="grid gap-major lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-x-major lg:items-center">
                <div>
                  <h2 className="text-h2">{ABOUT.whereHeading}</h2>
                  <div className="measure mt-major space-y-6">
                    {ABOUT.where.map((para) => (
                      <p key={para} className="text-body">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="mt-major">
              <Figure slot={IMAGES.whereWeWork} ratio="aspect-[16/9]" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-bg section">
        <div className="container-outer">
          <div className="content">
            <Reveal>
              <Rule />
              <Caption className="mt-8">{ABOUT.closingPillars}</Caption>
              <p className="measure mt-6 font-serif text-h2 text-heading">{ABOUT.closingLine}</p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}

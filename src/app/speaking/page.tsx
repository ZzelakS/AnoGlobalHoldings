import type { Metadata } from 'next'
import Figure from '@/components/Figure'
import Reveal from '@/components/Reveal'
import { Btn, Caption, GlassPanel, Rule, ScanPanel } from '@/components/ui'
import { SPEAKING } from '@/config/content'
import { IMAGES } from '@/config/site'

export const metadata: Metadata = {
  title: 'Speaking',
  description:
    'E.J. Anosike speaks to students, athletes, universities, companies, and institutions on borders, energy, China–Africa business, and sport as a pathway.',
  openGraph: { title: 'Speaking — E.J. Anosike', description: 'Speaking — E.J. Anosike', url: '/speaking', images: [{ url: '/og/speaking.png', width: 1200, height: 630, alt: 'Speaking — E.J. Anosike' }] },
  twitter: { card: 'summary_large_image', title: 'Speaking — E.J. Anosike', description: 'Speaking — E.J. Anosike', images: ['/og/speaking.png'] },
}

export default function SpeakingPage() {
  return (
    <>
      <section className="bg-bg pb-section pt-[132px] sm:pt-44 lg:pt-64">
        <div className="container-outer">
          <div className="content">
            <Reveal>
              <h1 className="text-h1">{SPEAKING.title}</h1>
              <p className="measure mt-major text-lead">{SPEAKING.lede}</p>
            </Reveal>
            <Reveal delay={0.1} className="mt-major">
              <Figure slot={IMAGES.speaking} ratio="aspect-[3/2]" sizes="(max-width: 1024px) 100vw, 640px" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-bg pb-section">
        <div className="container-outer">
          <div className="content">
            <Reveal>
              <Caption>{SPEAKING.topicsHeading}</Caption>
            </Reveal>
            <ul className="mt-major space-y-0">
              {SPEAKING.topics.map((topic) => (
                <Reveal as="li" key={topic.title} className="border-t border-line py-10">
                  <div className="measure">
                    <h2 className="text-h2">{topic.title}</h2>
                    <p className="mt-4 text-body">{topic.body}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="band section">
        <div className="container-outer">
          <div className="content">
            <Reveal>
              <p className="caption">{SPEAKING.platformsHeading}</p>
              <p className="measure mt-8 text-lead text-[#DCD8CC]">{SPEAKING.platforms}</p>
              <p className="measure mt-8 text-body text-[#DCD8CC]">{SPEAKING.audiences}</p>
              <div className="mt-major grid gap-6 sm:grid-cols-3">
                <Figure
                  slot={IMAGES.geneva}
                  ratio="aspect-[4/5] sm:aspect-[16/9] lg:aspect-[4/4]"
                  sizes="(max-width: 640px) 100vw, 340px"
                />
                <Figure
                  slot={IMAGES.kigali}
                  ratio="aspect-[4/5] sm:aspect-[16/9] lg:aspect-[4/4]"
                  sizes="(max-width: 640px) 100vw, 340px"
                />
                <Figure
                  slot={IMAGES.abuja}
                  ratio="aspect-[16/9] lg:aspect-[4/3]"
                  sizes="(max-width: 640px) 100vw, 340px"
                />
              </div>
              <div className="mt-major">
                <Btn href="/contact?enquiry=Speaking" accent="gold">
                  {SPEAKING.cta}
                </Btn>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}


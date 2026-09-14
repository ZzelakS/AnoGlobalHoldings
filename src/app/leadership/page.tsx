import type { Metadata } from 'next'
import Image from 'next/image'
import Figure from '@/components/Figure'
import Reveal from '@/components/Reveal'
import { Btn, Caption, GlassPanel, Rule, ScanPanel } from '@/components/ui'
import { LEADERSHIP } from '@/config/content'
import { IMAGES } from '@/config/site'

export const metadata: Metadata = {
  title: 'Leadership',
  description:
    'E.J. Anosike, Founder and Chief Executive Officer of Ano Global Holdings. A resource economist who competes professionally in China and builds in Africa.',
}

export default function LeadershipPage() {
  return (
    <>
      <section className="bg-bg pb-section pt-[132px] sm:pt-44 lg:pt-64">
        <div className="container-outer">
          <div className="content">
            <Reveal>
              <div className="grid gap-major lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-x-major">
                <Image
                  src="/founder.jpg"
                  alt="E.J. Anosike, Founder and Chief Executive Officer of Ano Global Holdings"
                  width={1200}
                  height={1600}
                  priority
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="w-full rounded-md ring-1 ring-gold/30"
                />
                <div className="lg:pt-8">
                  <h1 className="text-h1">{LEADERSHIP.name}</h1>
                  <Caption className="mt-4">{LEADERSHIP.role}</Caption>
                  <p className="measure mt-major text-lead">{LEADERSHIP.lede}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-bg pb-section">
        <div className="container-outer">
          <div className="content">
            <Reveal>
              <div className="measure space-y-6">
                {LEADERSHIP.body.map((para) => (
                  <p key={para} className="text-body">
                    {para}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="band section">
        <div className="container-outer">
          <div className="content">
            <Reveal>
              <h2 className="text-h2">{LEADERSHIP.engagementHeading}</h2>
              <ul className="mt-major grid gap-major md:grid-cols-3">
                {LEADERSHIP.engagements.map((item, i) => (
                  <ScanPanel key={item}>
                    <li>
                      <Figure
                        slot={[IMAGES.geneva, IMAGES.kigali, IMAGES.abuja][i]}
                        ratio="aspect-[3/2]"
                        sizes="(max-width: 768px) 100vw, 380px"
                      />
                      <p className="mt-7 text-body text-[#DCD8CC]">{item}</p>
                    </li>
                  </ScanPanel>
                ))}
              </ul>
              {/*
                CLIENT ASSET PENDING — Geneva address video.
                The brief asks for it embedded on this page. Drop the YouTube or
                Vimeo id into the block below when supplied; until then this
                section stays typographic, which the spec prefers to a placeholder.
              */}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-bg section">
        <div className="container-outer">
          <div className="content">
            <Reveal>
              <Rule />
              <h2 className="mt-8 text-h2">{LEADERSHIP.speakingHeading}</h2>
              <p className="measure mt-6 text-body">{LEADERSHIP.speaking}</p>
              <Figure slot={IMAGES.speaking} ratio="aspect-[21/9]" className="mt-major" />
              <div className="mt-8">
                <Btn href="/contact?enquiry=Speaking" accent="gold">
                  {LEADERSHIP.speakingCta}
                </Btn>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}

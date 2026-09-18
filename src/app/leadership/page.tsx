import type { Metadata } from 'next'
import Image from 'next/image'
import Figure from '@/components/Figure'
import Reveal from '@/components/Reveal'
import { Btn, Caption, GlassPanel, Rule, ScanPanel } from '@/components/ui'
import { LEADERSHIP } from '@/config/content'
import { IMAGES } from '@/config/site'

export const metadata: Metadata = {
  title: 'E.J. Anosike, Founder & CEO',
  description:
    'E.J. Anosike, Founder and Chief Executive Officer of Ano Global Holdings. A resource economist who competes professionally in China and builds in Africa.',
  openGraph: { title: 'E.J. Anosike, Founder & CEO — Ano Global Holdings', description: 'E.J. Anosike, Founder and Chief Executive Officer of Ano Global Holdings.', url: '/leadership', images: [{ url: '/og/leadership.png', width: 1200, height: 630, alt: 'E.J. Anosike, Founder & CEO — Ano Global Holdings' }] },
  twitter: { card: 'summary_large_image', title: 'E.J. Anosike, Founder & CEO — Ano Global Holdings', description: 'E.J. Anosike, Founder and Chief Executive Officer of Ano Global Holdings.', images: ['/og/leadership.png'] },
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

      <section className="bg-surface section">
        <div className="container-outer"><div className="content"><Reveal><Caption>Energy & Mobility · Security Systems · Food Security & Agriculture · Construction Supply · Human Development</Caption><h2 className="mt-8 text-h2">What we do</h2><div className="measure mt-major space-y-5"><p className="text-body">Energy & Mobility — solar generation and storage, electric vehicles, parts and service</p><p className="text-body">Security & Protective Systems — surveillance, access control, perimeter protection</p><p className="text-body">Food Security & Agriculture — irrigation, cold chain, processing and handling equipment</p><p className="text-body">Construction & Building Systems — equipment, materials, electromechanical supply</p><p className="text-body">Anosike Cares Foundation — education, leadership, entrepreneurship, sport, exchange</p></div><div className="mt-8 flex flex-wrap gap-4"><Btn href="/what-we-do" accent="gold">What we do</Btn><Btn href="/structure" accent="gold">Group structure and registered details</Btn></div><p className="mt-10 text-body">6 registered organizations across Hong Kong, Nigeria, and the United States</p><p className="mt-2 text-body">4 supply verticals — energy and mobility, security, food and agriculture, construction</p><p className="mt-2 text-body">50 electric vehicles sourced, cleared, and deployed in Lagos</p><p className="mt-2 text-body">UN Geneva, February 2026 — delegate of the Federal Republic of Nigeria</p></Reveal></div></div>
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
                        ratio={
                          i === 2
                            ? 'aspect-[16/9] lg:aspect-[4/3]'
                            : 'aspect-[4/5] sm:aspect-[16/9] lg:aspect-[4/4]'
                        }
                        priority
                        sizes="(max-width: 640px) 100vw, 1200px"
                      />
                      <p className="mt-7 text-body text-[#DCD8CC]">{item}</p>
                    </li>
                  </ScanPanel>
                ))}
              </ul>
              {process.env.NEXT_PUBLIC_GENEVA_VIDEO_URL ? (
                <div className="mt-major">
                  <video className="w-full rounded-md ring-1 ring-gold/20" controls playsInline preload="metadata">
                    <source src={process.env.NEXT_PUBLIC_GENEVA_VIDEO_URL} />
                  </video>
                  <p className="caption mt-4">Geneva address — United Nations headquarters</p>
                </div>
              ) : null}
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

      <section className="bg-surface section">
        <div className="container-outer"><div className="content"><Reveal>
          <Rule />
          <h2 className="mt-8 text-h2">Built in market</h2>
          <div className="measure mt-major space-y-6">
            <p className="text-body">The group's manufacturer relationships are not brokered. They were built in person, over years spent living and working in the markets the business now runs through — China, Hong Kong, Nigeria, Belgium, Canada, and the United States — first as a professional athlete competing across three continents, then as an operator.</p>
            <p className="text-body">The relationships are concentrated in China because that is where the manufacturing is and where the most time has been spent. They are maintained the same way they were built: in person, on the ground, season after season.</p>
            <p className="text-body">On 25 April 2026 the State House in Abuja issued a statement in which President Bola Ahmed Tinubu congratulated him on leading the Hong Kong Bulls to the 2026 National Basketball League championship in China, where he was named Finals Most Valuable Player, Best International Player, and Slam Dunk Champion. The President's statement also noted his commitment to Nigeria's national team, D'Tigers.</p>
          </div>
          <div className="mt-8"><Btn href="https://statehouse.gov.ng/president-tinubu-congratulates-nigerian-american-basketball-star-ejimofor-anosike-on-historic-achievements-in-china/" accent="gold" external>Read the State House statement</Btn></div>
        </Reveal></div></div>
      </section>

      <section className="bg-bg section">
        <div className="container-outer">
          <div className="content">
            <Reveal>
              <Rule />
              <h2 className="mt-8 text-h2">{LEADERSHIP.speakingHeading}</h2>
              <p className="measure mt-6 text-body">{LEADERSHIP.speaking}</p>
              <Figure slot={IMAGES.speaking} ratio="aspect-[3/2]" sizes="(max-width: 1024px) 100vw, 640px" />
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
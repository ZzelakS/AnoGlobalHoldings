import Image from 'next/image'
import Figure from '@/components/Figure'
import Reveal from '@/components/Reveal'
import { Btn, Caption, GlassPanel, Rule, ScanPanel } from '@/components/ui'
import { HOME } from '@/config/content'
// import { COMPANIES, IMAGES, PILLARS, SITE } from '@/config/site'
import Carousel from '@/components/Carousel'
// ...
import { COMPANIES, IMAGES, LAGOS_GALLERY, PILLARS, SITE } from '@/config/site'

/**
 * Home. Section rhythm per Design Specification section 4:
 * Paper (hero) → Paper (pillars) → Forest (premise) → Paper (two companies)
 * → Mist (structure proof) → Paper (founder) → Forest (contact).
 * Never two Forest sections consecutively.
 */
export default function HomePage() {
  return (
    <>
      {/* 3.1 Hero — typographic on Paper. No buttons; let the visitor scroll. */}
      <section className="bg-bg pb-section pt-[132px] sm:pt-44 lg:pt-64">
        <div className="container-outer">
          <div className="content">
            <Reveal>
              <GlassPanel className="max-w-[900px]">
                <Caption>Ano Global Holdings</Caption>
                <h1 className="mt-7 max-w-[17ch] display-xl text-display">{HOME.heroHeading}</h1>
                <Rule className="mt-9" />
                <p className="measure mt-8 text-lead text-body">{HOME.heroBody}</p>
              </GlassPanel>
            </Reveal>
            <Reveal delay={0.12} className="mt-major">
              <Figure
                slot={IMAGES.hero}
                ratio="aspect-[4/5] sm:aspect-[16/9] lg:aspect-[3/2]"
                priority
                sizes="(max-width: 640px) 100vw, 1200px"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3.2 The four pillars — thin band, small caps, letter-spaced */}
      <section className="border-y border-line bg-bg py-10">
        <div className="container-outer">
          <div className="content">
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {PILLARS.map((pillar, i) => (
                <li key={pillar} className="flex items-center gap-8">
                  <span className="caption">{pillar}</span>
                  {i < PILLARS.length - 1 ? (
                    <span aria-hidden="true" className="text-gold">
                      ·
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3.3 The premise — the thesis of the whole company */}
      <section className="band section">
        <div className="container-outer">
          <div className="content">
            <div className="grid gap-major lg:grid-cols-[minmax(0,1fr)_minmax(0,540px)] lg:items-center xl:grid-cols-[minmax(0,1fr)_minmax(0,640px)]">
              <Reveal>
                <h2 className="max-w-[20ch] text-h1">{HOME.premiseHeading}</h2>
                <div className="measure mt-major space-y-6">
                  {HOME.premise.map((para) => (
                    <p key={para} className="text-lead text-[#DCD8CC]">
                      {para}
                    </p>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <Figure slot={IMAGES.premise} ratio="aspect-[3/2]" sizes="(max-width: 1024px) 100vw, 640px" />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3.4 The two companies — the main functional element of the page */}
      <section className="bg-bg section">
        <div className="container-outer">
          <div className="content">
            <Reveal>
              <Caption>Our companies</Caption>
            </Reveal>
            <div className="mt-major grid gap-major lg:grid-cols-2">
              <Reveal>
                <GlassPanel className="h-full">
                  <article className="flex h-full flex-col">
                    <Rule />
                    <h2 className="mt-8 text-h2">{COMPANIES.energy.name}</h2>
                    <p className="measure mt-6 flex-1 text-body">{HOME.energyCard}</p>
                    <div className="mt-8">
                      <Btn href={COMPANIES.energy.href} accent="gold" external>
                        {COMPANIES.energy.label}
                      </Btn>
                    </div>
                  </article>
                </GlassPanel>
              </Reveal>

              <Reveal delay={0.08}>
                <GlassPanel className="h-full">
                  <article className="flex h-full flex-col">
                    <Rule />
                    <h2 className="mt-8 text-h2">{COMPANIES.foundation.name}</h2>
                    <p className="measure mt-6 flex-1 text-body">{HOME.foundationCard}</p>
                    <div className="mt-8">
                      <Btn href={COMPANIES.foundation.href} accent="gold" external>
                        {COMPANIES.foundation.label}
                      </Btn>
                    </div>
                  </article>
                </GlassPanel>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3.5 The proof that the structure works — build this section with care */}
<section className="bg-surface section">
  <div className="container-outer">
    <div className="content">
      <Reveal>
        <h2 className="max-w-[18ch] text-h1">{HOME.proofHeading}</h2>

        <div className="measure mt-major space-y-6">
          {HOME.proof.map((para) => (
            <p key={para} className="text-lead">
              {para}
            </p>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.1} className="mt-major">
        <Carousel
          slots={LAGOS_GALLERY}
          ratio="aspect-[4/3] lg:aspect-[16/9]"
        />
      </Reveal>
    </div>
  </div>
</section>

      {/* 3.6 Founder strip */}
      <section className="bg-bg section">
        <div className="container-outer">
          <div className="content">
            <Reveal>
              <div className="grid items-center gap-major lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
                <Image
                  src="/founder.jpg"
                  alt="E.J. Anosike, Founder and Chief Executive Officer of Ano Global Holdings"
                  width={1200}
                  height={1600}
                  sizes="(max-width: 1024px) 100vw, 380px"
                  className="w-full rounded-md ring-1 ring-gold/30"
                />
                <div>
                  <Rule />
                  <h2 className="mt-8 text-h2">{HOME.founderName}</h2>
                  <p className="measure mt-6 text-lead">{HOME.founderLine}</p>
                  <div className="mt-8">
                    <Btn href="/leadership" accent='gold'>{HOME.founderCta}</Btn>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3.7 Closing */}
      <section className="band section">
        <div className="container-outer">
          <div className="content">
            <Reveal>
              <h2 className="text-h1">{HOME.closingHeading}</h2>
              <p className="mt-8 text-lead">
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-[#F0ECE2] underline decoration-gold decoration-1 underline-offset-[3px] transition-colors duration-200 hover:decoration-gold-hi"
                >
                  {SITE.email}
                </a>
              </p>
              <p className="caption mt-6 text-gold">{SITE.locations}</p>
            </Reveal>
            <Reveal delay={0.1} className="mt-major">
              <Figure slot={IMAGES.contact} ratio="aspect-[4/6] lg:aspect-[1/1]" sizes="(max-width: 1024px) 100vw, 640px" />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}

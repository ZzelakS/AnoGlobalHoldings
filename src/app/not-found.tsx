import Reveal from '@/components/Reveal'
import { Btn } from '@/components/ui'

export default function NotFound() {
  return (
    <section className="bg-bg pb-section pt-[124px] sm:pt-40 lg:pt-56">
      <div className="container-outer">
        <div className="content">
          <Reveal>
            <h1 className="text-h1">Page not found</h1>
            <p className="measure mt-major text-lead">
              The page you are looking for is not here. The rest of the site is where you left it.
            </p>
            <div className="mt-major">
              <Btn href="/" accent="gold">Return home</Btn>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

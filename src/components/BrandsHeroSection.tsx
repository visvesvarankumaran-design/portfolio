import type { CSSProperties } from 'react'

type BrandsHeroSectionProps = {
  /** Anchor id (e.g. `brands` on Home). Omit on About to avoid duplicate ids. */
  id?: string
}

const d = (ms: number) => ({ ['--rvd']: `${ms}ms` }) as CSSProperties

export function BrandsHeroSection({ id }: BrandsHeroSectionProps) {
  return (
    <section
      id={id}
      className="pf-panel pf-panelBrands"
      aria-label="Brands"
    >
      <div className="pf-brandsInner">
        <div className="pf-brandsScript pf-reveal-fade">Brands</div>
        <h2 className="pf-brandsTitle pf-reveal" style={d(80)}>
          <span>IDEAS INTO</span>
          <span>REALITY</span>
        </h2>
        <div className="pf-brandsKicker pf-reveal" style={d(200)}>
          MANY COLLABORATIONS, COUNTLESS<br />
          LIVES SHAPED AT A TIME
        </div>
      </div>
    </section>
  )
}

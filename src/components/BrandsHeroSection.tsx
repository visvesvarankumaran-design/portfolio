type BrandsHeroSectionProps = {
  /** Anchor id (e.g. `brands` on Home). Omit on About to avoid duplicate ids. */
  id?: string
}

export function BrandsHeroSection({ id }: BrandsHeroSectionProps) {
  return (
    <section
      id={id}
      className="pf-panel pf-panelBrands"
      aria-label="Brands"
    >
      <div className="pf-brandsInner">
        <div className="pf-brandsScript">Brands</div>
        <h2 className="pf-brandsTitle">
          <span>IDEAS INTO</span>
          <span>REALITY</span>
        </h2>
        <div className="pf-brandsKicker">
          MANY COLLABORATIONS, COUNTLESS<br />
          LIVES SHAPED AT A TIME
        </div>
      </div>
    </section>
  )
}

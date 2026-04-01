const ROWS = [
  {
    titleLine1: 'FRONTEND DEVELOPER &',
    titleLine2: 'UI/UX DESIGNER',
    descriptionLine1: 'Discovered UI/UX',
    descriptionLine2: 'and immediately felt drawn in.',
    company: 'Ezyschooling',
    period: '2023 - 2024',
  },
  {
    titleLine1: 'PRODUCT DESIGNER',
    titleLine2: 'MOBILE & WEB',
    descriptionLine1: 'Shipped flows from sketches',
    descriptionLine2: 'to polished handoff for dev.',
    company: 'Northwind Labs',
    period: '2022 - 2023',
  },
  {
    titleLine1: 'UX RESEARCH &',
    titleLine2: 'INTERFACE DESIGN',
    descriptionLine1: 'Turned research notes into',
    descriptionLine2: 'journeys teams could rally around.',
    company: 'Studio Meridian',
    period: '2024 - Present',
  },
  {
    titleLine1: 'DESIGN INTERN',
    titleLine2: 'PROTOTYPE & TEST',
    descriptionLine1: 'Built clickable prototypes',
    descriptionLine2: 'and ran quick usability checks.',
    company: 'Finstein',
    period: '2021 - 2022',
  },
] as const

export function AboutExperienceRows() {
  return (
    <section className="pf-panel pf-aboutExperience" aria-label="Experience">
      <div className="pf-aboutExperienceInner">
        {ROWS.map((row, i) => (
          <article key={i} className="pf-aboutExperienceRow">
            <div className="pf-aboutExperienceRole">
              <span className="pf-aboutExperienceRoleLine">
                {row.titleLine1}
              </span>
              <span className="pf-aboutExperienceRoleLine">
                {row.titleLine2}
              </span>
            </div>
            <p className="pf-aboutExperienceDesc">
              <span className="pf-aboutExperienceDescLine">
                {row.descriptionLine1}
              </span>
              <span className="pf-aboutExperienceDescLine">
                {row.descriptionLine2}
              </span>
            </p>
            <div className="pf-aboutExperienceMeta">
              <div className="pf-aboutExperienceMetaInner">
                <div className="pf-aboutExperienceCompany">{row.company}</div>
                <span className="pf-aboutExperiencePill">{row.period}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

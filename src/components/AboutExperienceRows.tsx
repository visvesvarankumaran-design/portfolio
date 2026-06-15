const ROWS = [
  {
    titleLine1: 'UI/UX',
    titleLine2: 'DESIGNER',
    descriptionLine1: 'Design flows and clickable prototypes,',
    descriptionLine2: 'then run usability checks to refine them.',
    company: 'Finstein',
    period: '2024 - Present',
  },
  {
    titleLine1: 'FRONTEND',
    titleLine2: 'DEVELOPER',
    descriptionLine1: 'Built responsive, production-ready',
    descriptionLine2: 'interfaces — and got drawn to the UX.',
    company: 'Finstein',
    period: '2023 - 2024',
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

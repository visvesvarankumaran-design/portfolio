const STATS: { figure: string; label: string }[] = [
  { figure: '3+', label: 'Years designing SaaS, fintech & healthcare products' },
  { figure: '1.5–2M', label: 'Users reached by a fintech notification platform' },
  { figure: '120–200', label: 'Components in a Figma design system I built' },
  { figure: '3d → 4–6h', label: 'New-screen design time after the design system' },
]

export function StatsBand() {
  return (
    <section className="pf-panel pf-stats" aria-label="Impact by the numbers">
      <div className="pf-statsInner">
        {STATS.map((stat) => (
          <div className="pf-stat" key={stat.label}>
            <p className="pf-statFigure">{stat.figure}</p>
            <p className="pf-statLabel">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

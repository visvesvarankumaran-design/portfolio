import type { CSSProperties } from 'react'

const d = (ms: number) => ({ ['--rvd']: `${ms}ms` }) as CSSProperties

export function AboutApproachBanner() {
  return (
    <section className="pf-panel pf-aboutApproach" aria-label="Concept to creation">
      <div className="pf-aboutApproachInner">
        <div className="pf-aboutApproachStage">
          <div className="pf-aboutApproachScript pf-reveal-fade">Approach</div>
          <div className="pf-aboutApproachOutline pf-reveal" style={d(80)}>
            <span>CONCEPT TO</span>
            <span>CREATION</span>
          </div>
        </div>
        <p className="pf-aboutApproachKicker pf-reveal" style={d(200)}>
          NOT JUST DECORATION, BUT DIRECTION
        </p>
      </div>
    </section>
  )
}

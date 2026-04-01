import { AboutApproachBanner } from '../components/AboutApproachBanner'
import { WorkProcessSection } from '../components/WorkProcessSection'
import { ContactCtaFooter } from '../components/ContactCtaFooter'

export function WorkPage() {
  return (
    <main className="pf-hero pf-main--work">
      <section
        className="pf-panel pf-panelWork pf-panelWork--solo"
        aria-label="Work"
      >
        <div className="pf-workLanding">
          <h1 className="pf-workLandingTitle">WORK</h1>
        </div>
      </section>

      <section
        className="pf-panel pf-panelWorkProject"
        aria-label="Project showcase"
      >
        <div className="pf-workProjectInner">
          <article className="pf-case pf-case--workEnd">
            <div className="pf-caseImage" aria-hidden="true" />
            <div className="pf-caseFooter">
              <div className="pf-caseTitle">Personal Finance</div>
              <div className="pf-caseMeta">UI/UX | Mobile App</div>
            </div>
          </article>
        </div>
      </section>

      <section
        className="pf-panel pf-workReimagine"
        aria-label="Redesign, ideas reimagined"
      >
        <div className="pf-workReimagineInner">
          <div className="pf-workReimagineGrid">
            <p className="pf-workReimagineScript">Redesign</p>
            <p className="pf-workReimagineIdeas">IDEAS</p>
            <p className="pf-workReimagineKicker">
              <span className="pf-workReimagineKickerLine1">
                RETHINKING WHAT WORKS --- AND&nbsp;WHAT
              </span>
              <br />
              COULD WORK BETTER
            </p>
            <p className="pf-workReimagineHuge">REIMAGINED</p>
          </div>
        </div>
      </section>

      <section
        className="pf-panel pf-workPairSection"
        aria-label="More projects"
      >
        <div className="pf-workPairInner">
          <div className="pf-workPairGrid">
            <article className="pf-workPairCard">
              <div className="pf-workPairImage" aria-hidden="true" />
              <div className="pf-workPairBody">
                <h2 className="pf-workPairTitle">S &amp; AUTO</h2>
                <p className="pf-workPairMeta">UI/UX | Mobile App</p>
              </div>
            </article>
            <article className="pf-workPairCard">
              <div className="pf-workPairImage" aria-hidden="true" />
              <div className="pf-workPairBody">
                <h2 className="pf-workPairTitle">USED CARS</h2>
                <p className="pf-workPairMeta">UI/UX | Web App</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <AboutApproachBanner />

      <WorkProcessSection />

      <ContactCtaFooter />
    </main>
  )
}

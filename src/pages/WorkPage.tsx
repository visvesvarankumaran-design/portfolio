import { Link } from 'react-router-dom'
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
          <Link
            className="pf-case pf-case--workEnd pf-case--link"
            to="/work/bitesplit"
            state={{ from: '/work', fromLabel: 'Work' }}
            aria-label="Open BiteSplit case study"
          >
            <div
              className="pf-caseImage pf-caseImage--bitesplit"
              role="img"
              aria-label="BiteSplit — group ordering made effortless"
            >
              <div className="pf-bsCover">
                <span className="pf-bsBadge" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                </span>
                <span className="pf-bsWordmark">BiteSplit</span>
                <span className="pf-bsRule" aria-hidden="true" />
                <span className="pf-bsTagline">Group ordering made effortless.</span>
              </div>
            </div>
            <div className="pf-caseFooter">
              <div className="pf-caseTitle">BiteSplit</div>
              <div className="pf-caseMeta">UI /UX | Web App</div>
            </div>
          </Link>
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

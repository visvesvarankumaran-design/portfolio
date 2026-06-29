import { Link } from 'react-router-dom'
import { ProjectShowcase } from '../components/ProjectShowcase'
import { AboutApproachBanner } from '../components/AboutApproachBanner'
import { WorkProcessSection } from '../components/WorkProcessSection'
import { ContactCtaFooter } from '../components/ContactCtaFooter'
import airTicketCover from '../assets/Air-ticket/fScreen-2.png'

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
          <ProjectShowcase from="/work" fromLabel="Work" workEnd />
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
            <Link
              to="/work/air-ticket"
              state={{ from: '/work', fromLabel: 'Work' }}
              className="pf-workPairCard pf-workPairCard--link"
            >
              <div
                className="pf-workPairImage pf-atCover"
                role="img"
                aria-label="Air Ticket — flight booking app concept"
              >
                <div className="pf-atMock">
                  <img
                    className="pf-atMockImg"
                    src={airTicketCover}
                    alt=""
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="pf-workPairBody">
                <h2 className="pf-workPairTitle">AIR TICKET</h2>
                <p className="pf-workPairMeta">UI/UX | Mobile App</p>
              </div>
            </Link>
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

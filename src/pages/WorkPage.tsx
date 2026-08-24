import { useRef } from 'react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ProjectShowcase } from '../components/ProjectShowcase'
import { AboutApproachBanner } from '../components/AboutApproachBanner'
import { WorkProcessSection } from '../components/WorkProcessSection'
import { ContactCtaFooter } from '../components/ContactCtaFooter'
import { useReveal } from '../hooks/useReveal'
import airTicketCover from '../assets/Air-ticket/fScreen-2.png'
import dailyDiaryCover from '../assets/Daily-Diary/daily_diary-01.png'

const d = (ms: number) => ({ ['--rvd']: `${ms}ms` }) as CSSProperties

export function WorkPage() {
  const rootRef = useRef<HTMLElement>(null)
  useReveal(rootRef)

  return (
    <main className="pf-hero pf-main--work" ref={rootRef}>
      <section
        className="pf-panel pf-panelWork pf-panelWork--solo"
        aria-label="Work"
      >
        <div className="pf-workLanding">
          <h1 className="pf-workLandingTitle pf-reveal pf-reveal--hero">WORK</h1>
        </div>
      </section>

      <section
        className="pf-panel pf-panelWorkProject"
        aria-label="Project showcase"
      >
        <div className="pf-workProjectInner pf-reveal">
          <ProjectShowcase from="/work" fromLabel="Work" workEnd />
        </div>
      </section>

      <section
        className="pf-panel pf-workReimagine"
        aria-label="Redesign, ideas reimagined"
      >
        <div className="pf-workReimagineInner">
          <div className="pf-workReimagineGrid pf-reveal-fade">
            <p className="pf-workReimagineScript">Redesign</p>
            <p className="pf-workReimagineIdeas">IDEAS</p>
            <p className="pf-workReimagineKicker">
              <span className="pf-workReimagineKickerLine1">
                RETHINKING WHAT WORKS — AND&nbsp;WHAT
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
              className="pf-workPairCard pf-workPairCard--link pf-reveal"
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
            <Link
              to="/work/daily-diary"
              state={{ from: '/work', fromLabel: 'Work' }}
              className="pf-workPairCard pf-workPairCard--link pf-reveal"
              style={d(120)}
            >
              <div
                className="pf-workPairImage pf-ddCover"
                role="img"
                aria-label="Daily Diary — a digital journaling experience"
              >
                <div className="pf-ddMock">
                  <img
                    className="pf-ddMockImg"
                    src={dailyDiaryCover}
                    alt=""
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="pf-workPairBody">
                <h2 className="pf-workPairTitle">DAILY DIARY</h2>
                <p className="pf-workPairMeta">UI/UX · Concept | Web App</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <AboutApproachBanner />

      <WorkProcessSection />

      <ContactCtaFooter />
    </main>
  )
}

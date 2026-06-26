import { Link } from 'react-router-dom'
import { ProjectShowcase } from '../components/ProjectShowcase'
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
                <svg
                  className="pf-atCoverArc"
                  viewBox="0 0 600 480"
                  preserveAspectRatio="xMidYMid slice"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="atArc" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0" stopColor="#f2691e" stopOpacity="0" />
                      <stop offset="0.5" stopColor="#f2691e" stopOpacity="0.75" />
                      <stop offset="1" stopColor="#f2691e" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M-20 380 Q 300 90 620 300"
                    fill="none"
                    stroke="url(#atArc)"
                    strokeWidth="2"
                    strokeDasharray="3 11"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="pf-atPass">
                  <div className="pf-atPassMain">
                    <div className="pf-atPassTop">
                      <span className="pf-atPassBrand">
                        <svg
                          className="pf-atPassPlane"
                          viewBox="0 0 576 512"
                          aria-hidden="true"
                        >
                          <path d="M482.3 192C516.5 192 544 219.5 544 256s-27.5 64-61.7 64L378.5 320 270 510.3c-5.5 9.6-15.8 15.7-27 15.7l-39.6 0c-6.3 0-10.9-6-9.3-12.1L222 320l-86.2 0L99.4 369.7c-3 4-7.8 6.3-12.8 6.3l-28.1 0c-7.8 0-13.4-7.5-11.2-15L72 256 47.3 174c-2.2-7.5 3.4-15 11.2-15l28.1 0c5 0 9.8 2.3 12.8 6.3L135.8 224l86.2 0L173.8 65.8c-1.7-6.1 2.9-12.1 9.3-12.1L222.7 53.7c11.2 0 21.5 6.1 27 15.7L378.5 192l103.8 0z" />
                        </svg>
                        AIR TICKET
                      </span>
                      <span className="pf-atPassKicker">Boarding Pass</span>
                    </div>

                    <div className="pf-atPassRoute" aria-hidden="true">
                      <span className="pf-atPassCity">
                        <b>BLR</b>
                        <small>Bengaluru</small>
                      </span>
                      <span className="pf-atPassMid">
                        <i className="pf-atPassDot" />
                        <span className="pf-atPassDash" />
                        <svg
                          className="pf-atPassMidPlane"
                          viewBox="0 0 576 512"
                          aria-hidden="true"
                        >
                          <path d="M482.3 192C516.5 192 544 219.5 544 256s-27.5 64-61.7 64L378.5 320 270 510.3c-5.5 9.6-15.8 15.7-27 15.7l-39.6 0c-6.3 0-10.9-6-9.3-12.1L222 320l-86.2 0L99.4 369.7c-3 4-7.8 6.3-12.8 6.3l-28.1 0c-7.8 0-13.4-7.5-11.2-15L72 256 47.3 174c-2.2-7.5 3.4-15 11.2-15l28.1 0c5 0 9.8 2.3 12.8 6.3L135.8 224l86.2 0L173.8 65.8c-1.7-6.1 2.9-12.1 9.3-12.1L222.7 53.7c11.2 0 21.5 6.1 27 15.7L378.5 192l103.8 0z" />
                        </svg>
                        <span className="pf-atPassDash" />
                        <i className="pf-atPassDot pf-atPassDot--end" />
                      </span>
                      <span className="pf-atPassCity pf-atPassCity--r">
                        <b>DXB</b>
                        <small>Dubai</small>
                      </span>
                    </div>

                    <div className="pf-atPassMeta" aria-hidden="true">
                      <span>
                        <small>Gate</small>
                        <b>A12</b>
                      </span>
                      <span>
                        <small>Seat</small>
                        <b>14C</b>
                      </span>
                      <span>
                        <small>Boarding</small>
                        <b>09:24</b>
                      </span>
                    </div>
                  </div>

                  <div className="pf-atPassStub" aria-hidden="true">
                    <span className="pf-atPassBarcode" />
                    <span className="pf-atPassStubText">AIR&nbsp;TICKET</span>
                  </div>
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

import { AboutDetailBlock } from '../components/AboutDetailBlock'
import { AboutExperienceRows } from '../components/AboutExperienceRows'
import { AboutApproachBanner } from '../components/AboutApproachBanner'
import { WorkProcessSection } from '../components/WorkProcessSection'
import { BrandsHeroSection } from '../components/BrandsHeroSection'
import { LifeUnpluggedSection } from '../components/LifeUnpluggedSection'
import { ContactCtaFooter } from '../components/ContactCtaFooter'

export function AboutPage() {
  return (
    <main className="pf-hero pf-main--about">
      <section className="pf-panel pf-aboutHero" aria-label="About">
        <div className="pf-aboutHeroStage">
          <div className="pf-aboutHeroCompose">
            <div className="pf-aboutHeroPhoto" aria-hidden="true" />
            <div className="pf-aboutHeroWords">
              <span className="pf-aboutHeroWord pf-aboutHeroWord--behind">
                BEHIND
              </span>
              <span className="pf-aboutHeroWord pf-aboutHeroWord--the">THE</span>
              <span className="pf-aboutHeroWord pf-aboutHeroWord--canvas">
                CANVAS
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="pf-panel pf-aboutIntro" aria-label="Introduction">
        <p className="pf-introText">
          Hey there, I’m Visvesvaran — a Senior Product Designer turning
          messy problems into simple, human experiences that just click. With
          2.5+ years of crafting, mentoring, and adding a spark of delight, I
          design not just for screens, but for moments people remember.
        </p>
      </section>

      <section className="pf-panel pf-aboutClosing" aria-label="Philosophy">
        <div className="pf-aboutClosingInner">
          <h2 className="pf-aboutClosingHead">
            <span>
              {`IT'S NOT JUST A PROFESSION --- IT'S A WAY OF THINKING.`}
            </span>
            <span>{`IT'S HOW I SEE THE WORLD.`}</span>
          </h2>
          <div className="pf-aboutClosingCopy">
            <p>
              My work is part of my lifestyle. I move through the world
              constantly observing — noticing patterns, interactions, and subtle
              details that quietly shape meaningful experiences.
            </p>
            <p>
              I believe design is a guide, not a decoration. The best
              experiences feel invisible — effortless, intuitive, and human.
              Every detail matters, guiding direction and shaping decisions,
              moments, and memories that connect and leave a mark.
            </p>
            <p>
              {`I find aesthetics everywhere — in the rhythm of a river, the geometry of a building, the lights of a city at dusk, and the quiet moments that often go unnoticed. It's not just a hobby; it's how I see the world.`}
            </p>
          </div>
        </div>
      </section>

      <AboutDetailBlock showKnowMore={false} headlineVariant="interfaces" />

      <section className="pf-panel pf-aboutTimeline" aria-label="Timeline">
        <div className="pf-aboutTimelineInner">
          <div className="pf-aboutTimelineCol">
            <div className="pf-aboutTimelineStage">
              <div className="pf-aboutTimelineScript">Timeline</div>
              <div className="pf-aboutTimelineOutline">
                <span>TRACKS AND</span>
                <span>REALITY</span>
              </div>
            </div>
          </div>
          <p className="pf-aboutTimelineKicker">
            WHERE EVERY STEP SHAPED THE NEXT
          </p>
        </div>
      </section>

      <AboutExperienceRows />

      <AboutApproachBanner />

      <WorkProcessSection />

      <BrandsHeroSection />

      <LifeUnpluggedSection />

      <ContactCtaFooter />
    </main>
  )
}

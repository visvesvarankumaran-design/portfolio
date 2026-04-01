import { AboutDetailBlock } from '../components/AboutDetailBlock'
import { BrandsHeroSection } from '../components/BrandsHeroSection'
import { ContactCtaFooter } from '../components/ContactCtaFooter.tsx'

export function HomePage() {
  return (
    <main className="pf-hero">
      <section id="home" className="pf-panel pf-panelHero">
        <div className="pf-titleWrap">
          <h1 className="pf-heroTitle">VISVESVARAN K</h1>
        </div>

        <div className="pf-tagline">
          <div>JUNIOR PRODUCT DESIGNER --- SHAPING HOW PEOPLE</div>
          <div>EXPERIENCE TECHNOLOGY: SIMPLE, HUMAN, IMPACTFUL</div>
        </div>
      </section>

      <section id="about" className="pf-panel pf-panelIntro">
        <p className="pf-introText">
          Hey there, I'm Visvesvaran -- a Junior Product Designer turning messy
          problems into simple, human experiences that just click. With 2.5+
          years of crafting, mentoring, and adding a spark of delight, I
          design not just for screens, but for moments people remember.
        </p>
      </section>

      <section
        id="featured-work"
        className="pf-panel pf-panelWork pf-panelWork--onHome"
        aria-label="Design work"
      >
        <div className="pf-workInner">
          <div className="pf-workScript" aria-hidden="true">
            Work
          </div>
          <h2 className="pf-workTitle">
            <span>DESIGN THAT</span>
            <span>CONNECTS</span>
            <div className="pf-workKicker">
              <div>STEP INTO STORIES WHERE</div>
              <div>DESIGN MEETS IMPACT</div>
            </div>
          </h2>
          <div className="pf-case">
            <div className="pf-caseImage" aria-hidden="true" />
            <div className="pf-caseFooter">
              <div className="pf-caseTitle">Personal Finance</div>
              <div className="pf-caseMeta">UI/UX | Mobile App</div>
            </div>
          </div>
        </div>
      </section>

      <section id="playground" className="pf-panel pf-panelPlay">
        <div className="pf-playInner">
          <div className="pf-playScript">Playground</div>
          <h2 className="pf-playTitle">PIXELS AT PLAY</h2>
          <div className="pf-playKicker">NO RULES, JUST EXPERIMENT</div>
        </div>
      </section>

      <BrandsHeroSection id="brands" />

      <section id="brands-note" className="pf-panel pf-panelNarrative">
        <div className="pf-narrative">
          Over the years, I’ve collaborated with brands that believe in the power of good design—turning ideas into
          experiences that make an impact. Each collaboration brought new perspectives and stories that shaped how I think
          and create. I’ve been fortunate to work with inspiring clients and teammates who’ve challenged, elevated, and
          grown with me. Every project has been a journey of curiosity, creativity, and craft—pushing boundaries and
          shaping products that truly resonate.
        </div>
      </section>

      <section id="about-hero" className="pf-panel pf-panelAbout">
        <div className="pf-aboutInner">
          <div className="pf-aboutScript">About</div>
          <h2 className="pf-aboutTitle">
            <span>BEHIND THE</span>
            <span>CANVAS</span>
          </h2>
          <div className="pf-aboutKicker">DESIGNER, EXPLORER, STUDENT OF LIFE</div>
        </div>
      </section>

      <AboutDetailBlock id="about-detail" />

      <ContactCtaFooter />
    </main>
  )
}

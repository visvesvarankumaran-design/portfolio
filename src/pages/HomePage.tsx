import { useRef } from 'react'
import type { CSSProperties } from 'react'
import { AboutDetailBlock } from '../components/AboutDetailBlock'
import { BrandsHeroSection } from '../components/BrandsHeroSection'
import { ContactCtaFooter } from '../components/ContactCtaFooter.tsx'
import { ProjectShowcase } from '../components/ProjectShowcase'
import { SkillsSection } from '../components/SkillsSection'
import { useReveal } from '../hooks/useReveal'

/** Small helper: inline custom-property delay for staggered reveals. */
const d = (ms: number) => ({ ['--rvd']: `${ms}ms` }) as CSSProperties

export function HomePage() {
  const rootRef = useRef<HTMLElement>(null)
  useReveal(rootRef)

  return (
    <main className="pf-hero" ref={rootRef}>
      <section id="home" className="pf-panel pf-panelHero">
        <div className="pf-titleWrap">
          <h1 className="pf-heroTitle pf-reveal pf-reveal--hero">
            VISVESVARAN K
          </h1>
        </div>

        <div className="pf-tagline pf-reveal pf-reveal--hero" style={d(140)}>
          <div>UI/UX DESIGNER — SHAPING HOW PEOPLE</div>
          <div>EXPERIENCE TECHNOLOGY: SIMPLE, HUMAN, IMPACTFUL</div>
        </div>
      </section>

      <section id="about" className="pf-panel pf-panelIntro">
        <p className="pf-introText pf-reveal">
          Hey there, I'm Visvesvaran -- a UI/UX Designer turning messy
          problems into simple, human experiences that just click. Over 3 years
          I've grown from frontend development into design, so I shape not just
          screens, but how they're built -- designing for moments people
          remember.
        </p>
      </section>

      <section
        id="featured-work"
        className="pf-panel pf-panelWork pf-panelWork--onHome"
        aria-label="Design work"
      >
        <div className="pf-workInner">
          <div className="pf-workScript pf-reveal-fade" aria-hidden="true">
            Work
          </div>
          <h2 className="pf-workTitle pf-reveal" style={d(80)}>
            <span>DESIGN THAT</span>
            <span>CONNECTS</span>
            <div className="pf-workKicker">
              <div>STEP INTO STORIES WHERE</div>
              <div>DESIGN MEETS IMPACT</div>
            </div>
          </h2>
          <div className="pf-reveal" style={d(160)}>
            <ProjectShowcase from="/" fromLabel="Home" />
          </div>
        </div>
      </section>

      <SkillsSection />

      <section id="playground" className="pf-panel pf-panelPlay">
        <div className="pf-playInner">
          <div className="pf-playScript pf-reveal-fade">Playground</div>
          <h2 className="pf-playTitle pf-reveal" style={d(80)}>
            PIXELS AT PLAY
          </h2>
          <div className="pf-playKicker pf-reveal" style={d(160)}>
            NO RULES, JUST EXPERIMENT
          </div>
        </div>
      </section>

      <BrandsHeroSection id="brands" />

      <section id="brands-note" className="pf-panel pf-panelNarrative">
        <div className="pf-narrative pf-reveal">
          Over the years, I’ve collaborated with brands that believe in the power of good design—turning ideas into
          experiences that make an impact. Each collaboration brought new perspectives and stories that shaped how I think
          and create. I’ve been fortunate to work with inspiring clients and teammates who’ve challenged, elevated, and
          grown with me. Every project has been a journey of curiosity, creativity, and craft—pushing boundaries and
          shaping products that truly resonate.
        </div>
      </section>

      <section id="about-hero" className="pf-panel pf-panelAbout">
        <div className="pf-aboutInner">
          <div className="pf-aboutScript pf-reveal-fade">About</div>
          <h2 className="pf-aboutTitle pf-reveal" style={d(80)}>
            <span>BEHIND THE</span>
            <span>CANVAS</span>
          </h2>
          <div className="pf-aboutKicker pf-reveal" style={d(160)}>
            DESIGNER, EXPLORER, STUDENT OF LIFE
          </div>
        </div>
      </section>

      <AboutDetailBlock id="about-detail" />

      <ContactCtaFooter />
    </main>
  )
}

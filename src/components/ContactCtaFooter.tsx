import type { CSSProperties } from 'react'

/** Served from /public — place your PDF at public/Visvesvaran_K_Resume/Visvesvaran_K_Resume.pdf */
const RESUME_HREF = '/Visvesvaran_K_Resume/Visvesvaran_K_Resume.pdf'
const RESUME_FILENAME = 'Visvesvaran_K_Resume.pdf'

const d = (ms: number) => ({ ['--rvd']: `${ms}ms` }) as CSSProperties

export function ContactCtaFooter() {
  return (
    <>
      <section id="contact-cta" className="pf-panel pf-panelCTA">
        <div className="pf-ctaInner">
          <h2 className="pf-ctaHead pf-reveal">YOUR IDEA, MY CURIOSITY.</h2>
          <div className="pf-ctaOutline pf-reveal" style={d(100)}>
            LET'S DO IT.
          </div>
          <p className="pf-ctaSub pf-reveal" style={d(180)}>
            TELL ME YOUR VISION, YOUR IDEA, OR JUST SAY HI.
          </p>
          <div className="pf-ctaRule" />
        </div>
      </section>

      <footer id="contact" className="pf-panel pf-footer">
        <div className="pf-footerInner">
          <div className="pf-footerRows pf-reveal">
            <div className="pf-footerRow">
              <div className="pf-footerHeading">CONTACT</div>
              <div className="pf-footerRowRight">
                <a
                  className="pf-footerItem pf-footerItemLink"
                  href="tel:+919344838740"
                >
                  +91 93448 38740
                </a>
                <a
                  className="pf-footerItem pf-footerItemLink"
                  href="mailto:visvesvarankumaran@gmail.com"
                >
                  visvesvarankumaran@gmail.com
                </a>
              </div>
            </div>
            <div className="pf-footerRow">
              <div className="pf-footerHeading">SOCIAL</div>
              <div className="pf-footerRowRight">
                <a
                  className="pf-footerLink"
                  href="https://www.linkedin.com/in/visvesvaran-k-2428v/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LINKEDIN
                </a>
              </div>
            </div>
            <div className="pf-footerRow pf-footerRowCta">
              <a
                className="pf-cta pf-ctaSmall"
                href={RESUME_HREF}
                download={RESUME_FILENAME}
              >
                DOWNLOAD CV
              </a>
            </div>
          </div>
          <div className="pf-footerLower pf-reveal" style={d(120)}>
            <div className="pf-footerWatermarkSlot" aria-hidden="true">
              <p className="pf-footerSignature">Visvesvaran K</p>
            </div>
            <div className="pf-footerCopy">© 2026 Visvesvaran K. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </>
  )
}

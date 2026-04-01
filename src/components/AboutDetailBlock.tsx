import { Carousel } from './Carousel'

type AboutDetailBlockProps = {
  /** Anchor id (e.g. `about-detail` on Home). Omit on About route to avoid duplicate ids. */
  id?: string
  /** Home shows KNOW MORE; hide on dedicated About page. */
  showKnowMore?: boolean
  /** `/about` uses a different headline; Home keeps the two-line profession copy. */
  headlineVariant?: 'default' | 'interfaces'
}

export function AboutDetailBlock({
  id,
  showKnowMore = true,
  headlineVariant = 'default',
}: AboutDetailBlockProps) {
  const headDefault = (
    <div className="pf-aboutHead">
      <div>IT&apos;S NOT JUST A PROFESSION --- IT&apos;S A WAY OF THINKING.</div>
      <div>
        IT&apos;S HOW I SEE THE WORLD: IN PATTERNS, INTERACTIONS, AND THE
        DETAILS.
      </div>
    </div>
  )

  const headInterfaces = (
    <div className="pf-aboutHead pf-aboutHead--interfaces">
      <div>GOOD INTERFACES GO BEYOND AESTHETICS; THEY EVOKE</div>
      <div>CONNECTION AND FEELINGS</div>
    </div>
  )

  return (
    <section
      id={id}
      className="pf-panel pf-panelAboutDetail"
      aria-label="Profession and craft"
    >
      <div className="pf-aboutDetailInner">
        {headlineVariant === 'interfaces' ? headInterfaces : headDefault}
        <div className="pf-aboutGrid">
          <div className="pf-aboutCol">
            <p>
              With 2.5+ years in UI/ UX design, I&apos;ve led initiatives,
              collaborated with brands, and mentored designers. I craft simple
              interfaces with deep meaning, using AI and experimentation to
              turn complexity into experiences people remember.
            </p>
          </div>
          <div className="pf-aboutCol pf-aboutCenter">
            <Carousel />
          </div>
          <div className="pf-aboutCol">
            <p>
              Off the screen, I wander, click the beauty in mundane moments, and
              explore places and perspectives that spark curiosity—drawing
              inspiration from everywhere I go.
            </p>
            {showKnowMore ? (
              <button type="button" className="pf-cta">
                KNOW MORE
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

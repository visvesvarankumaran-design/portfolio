/** Research → Design → Test — same staggered cards as on /work */
export function WorkProcessSection() {
  return (
    <section
      className="pf-panel pf-workProcess"
      aria-label="Research, design, and test"
    >
      <div className="pf-workProcessInner">
        <div className="pf-workProcessStepRow">
          <article className="pf-workProcessCard">
            <span className="pf-workProcessNum">01</span>
            <h2 className="pf-workProcessTitle">RESEARCH</h2>
            <p className="pf-workProcessBody">
              Understanding user needs and uncovering insights within each
              challenge, while shaping strategy to guide creative solutions.
            </p>
          </article>
        </div>
        <div className="pf-workProcessStepRow pf-workProcessStepRow--2">
          <article className="pf-workProcessCard">
            <span className="pf-workProcessNum">02</span>
            <h2 className="pf-workProcessTitle">DESIGN</h2>
            <p className="pf-workProcessBody">
              Shaping insights into experiences that feel intuitive, thoughtful,
              and leave lasting impressions on people.
            </p>
          </article>
        </div>
        <div className="pf-workProcessStepRow pf-workProcessStepRow--3">
          <article className="pf-workProcessCard">
            <span className="pf-workProcessNum">03</span>
            <h2 className="pf-workProcessTitle">TEST</h2>
            <p className="pf-workProcessBody">
              Testing, learning, and iterating — refining experiences that adapt,
              delight, and evolve with every user interaction.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}

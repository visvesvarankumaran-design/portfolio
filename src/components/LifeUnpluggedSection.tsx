export function LifeUnpluggedSection() {
  return (
    <section
      className="pf-panel pf-lifeUnplugged"
      aria-label="Life unplugged"
    >
      <div className="pf-lifeUnplugInner">
        <header className="pf-lifeUnplugHead">
          <div className="pf-lifeUnplugScript">Life</div>
          <h2 className="pf-lifeUnplugTitle">UNPLUGGED</h2>
        </header>
        <div
          className="pf-lifeUnplugRow"
          aria-hidden="true"
        >
          <div className="pf-lifeUnplugCard pf-lifeUnplugCard--landscape" />
          <div className="pf-lifeUnplugCard pf-lifeUnplugCard--portrait" />
          <div className="pf-lifeUnplugCard pf-lifeUnplugCard--landscape" />
          <div className="pf-lifeUnplugCard pf-lifeUnplugCard--portrait" />
        </div>
      </div>
    </section>
  )
}

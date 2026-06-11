import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import imgStart from '../assets/img-1.png'
import imgRestaurants from '../assets/img-2.png'
import imgJoin from '../assets/img-4.png'
import imgCart from '../assets/img-6.png'
import imgBillLocked from '../assets/img-7.png'
import imgBillApproved from '../assets/img-8.png'
import imgSuccess from '../assets/img-9.png'

const TAGS = ['UI/UX Design', 'React', 'TypeScript', 'Socket.io', 'Framer Motion']

const META = [
  { label: 'Role', value: 'UI/UX & Frontend' },
  { label: 'Type', value: 'Web App · POC' },
  { label: 'Timeline', value: '1-week sprint' },
  { label: 'Year', value: '2026' },
]

const NEED = [
  {
    k: 'The human order form',
    v: 'One person collects everyone’s picks over chat, fixes the “wait, no onions,” and types it all into a single account. Things get missed. The order goes in late.',
  },
  {
    k: 'The host penalty',
    v: 'That same host pays upfront, then back-calculates each person’s share of items, delivery, tax and tip — and chases people for ₹230 three days later.',
  },
  {
    k: 'Ordering blind',
    v: 'Delivery apps are single-device, so nobody sees the shared cart. The group orders blind: duplicate fries, lopsided meals, zero alignment.',
  },
]

const METRICS = [
  { figure: '₹0', label: 'Every split reconciles to the invoice total — down to the paise' },
  { figure: '1 week', label: 'Designed & built solo, with AI pair-programming' },
  { figure: 'Minutes → seconds', label: 'The group coordination the flow is designed to remove' },
]

const PERSONAS = [
  'Office teams at lunch',
  'Roommates on a Friday',
  'Friends splitting a party order',
]

const FLOW = [
  'Host starts a room',
  'Guests join with a code',
  'Pick a restaurant',
  'Build the shared cart, live',
  'Lock & auto-split',
  'Everyone approves',
  'Host pays',
  'Track together',
]

const DECISIONS = [
  {
    k: 'Make the cart the hero, not the menu',
    v: 'In a group app the shared cart is the whole reason you’re here, so it gets permanent real estate instead of hiding behind a button. Watching the order assemble in real time is the “aha.”',
  },
  {
    k: 'Borrow a visual language people trust',
    v: 'Money and other people are involved — novelty would cost trust. Clean surfaces, a confident orange accent and green veg-dots echo the delivery apps everyone already knows.',
  },
  {
    k: 'The host is a referee, not a gatekeeper',
    v: 'The host controls flow — lock, checkout, pay — but never anyone’s choices. Members approve their own share, so one person isn’t babysitting the whole order.',
  },
  {
    k: 'No minimum order',
    v: 'A ₹520 side of fries is a valid order. Removing the artificial floor means the lightest member is served as gracefully as the biggest.',
  },
]

const EDGE_CASES = [
  {
    k: 'Host switches restaurant mid-session',
    v: 'Every cart and total clears instantly across all screens, so a burger menu can’t contaminate a sushi order.',
  },
  {
    k: 'A guest refreshes or drops offline',
    v: 'Room state is preserved on the server — they rejoin straight back into their own cart, nothing lost.',
  },
  {
    k: 'Cart locked at checkout',
    v: 'Once the host starts checkout, adds and removes freeze, so no one can slip in an item after shares are computed.',
  },
  {
    k: 'A member leaves the group',
    v: 'Every remaining person’s split is recomputed live, so the totals always stay correct.',
  },
]

const LEARNINGS = [
  'In a multiplayer product, the shared state is the product — most of the design effort went into making “what is everyone doing right now” obvious and trustworthy.',
  'Trust lives in the details that don’t demo well: the disabled pay button, the per-person grouping, the rupee that always reconciles.',
  'Holding both the design and the build let me move fast without losing intent — AI handled boilerplate while I owned the product calls.',
]

const NEXT = [
  'In-app payments with automatic settlement, so members pay their share directly instead of the host fronting it.',
  'Saved groups and one-tap reorder (“same as last Friday”).',
  'Dietary tags and allergen filters surfaced right in the shared cart.',
  'Light persistence so a session survives a closed tab, not just a refresh.',
]

/** A desktop screenshot dressed in browser chrome so the light UI pops on the dark canvas. */
function Shot({
  src,
  alt,
  caption,
}: {
  src: string
  alt: string
  caption?: string
}) {
  return (
    <figure className="pf-shot pf-reveal">
      <div className="pf-shotBar" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <img className="pf-shotImg" src={src} alt={alt} loading="lazy" />
      {caption ? <figcaption className="pf-shotCap">{caption}</figcaption> : null}
    </figure>
  )
}

export function BiteSplitCaseStudy() {
  const rootRef = useRef<HTMLElement>(null)

  // Back navigation follows where the case study was opened from.
  // Deep-links / direct visits (no state) fall back to Work.
  const location = useLocation()
  const origin = location.state as { from?: string; fromLabel?: string } | null
  const backTo = origin?.from ?? '/work'
  const backLabel = origin?.fromLabel ?? 'Work'

  // Scroll reveal — progressive enhancement. Content is visible by default;
  // we only enable the hide-then-fade-in behaviour once JS confirms support,
  // so the page can never get stuck invisible.
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }
    root.classList.add('is-reveal-ready')
    const targets = Array.from(root.querySelectorAll('.pf-reveal'))
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <main className="pf-cs" ref={rootRef}>
      {/* ===================== HERO ===================== */}
      <header className="pf-csHero">
        <div className="pf-csHeroInner">
          <Link to={backTo} className="pf-csBack">
            ← {backLabel}
          </Link>
          <ul className="pf-csTags" aria-label="Disciplines and stack">
            {TAGS.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <h1 className="pf-csTitle">BiteSplit</h1>
          <p className="pf-csLede">
            Group food ordering, without the math fight at the end. One shared
            cart, updated live for everyone — and a bill that splits itself, to
            the rupee, before anyone pays.
          </p>
          <p className="pf-csRole">
            A solo project — I led the UI/UX and product design and built the
            frontend, directing the full-stack work (real-time sync and the
            split engine) with AI as a pair-programmer.
          </p>
          <div className="pf-csMetaRow">
            {META.map((m) => (
              <div className="pf-csMetaItem" key={m.label}>
                <span className="pf-csMetaLabel">{m.label}</span>
                <span className="pf-csMetaValue">{m.value}</span>
              </div>
            ))}
            <a
              className="pf-csPdf"
              href="/BiteSplit-Case-Study.pdf"
              target="_blank"
              rel="noreferrer"
            >
              ↓ PDF
            </a>
          </div>
        </div>
        <div className="pf-csScrollCue" aria-hidden="true">
          <span>Scroll</span>
          <i />
        </div>
      </header>

      {/* ===================== SIGNATURE STAGE ===================== */}
      <section className="pf-csStage">
        <Shot
          src={imgCart}
          alt="BiteSplit shared cart — menu on the left, live group cart on the right"
          caption="The shared cart — items grouped per person, syncing across every device in real time."
        />
      </section>

      {/* ===================== OVERVIEW ===================== */}
      <section className="pf-csChapter pf-csChapter--center">
        <p className="pf-csOverview pf-reveal">
          It’s lunchtime. Six people, six cravings, one order — and one unlucky
          person about to front the whole bill.{' '}
          <span>BiteSplit turns that chaos into a single, calm session</span> —
          from joining a room to splitting the bill to tracking the delivery.
        </p>
      </section>

      {/* ===================== WHO IT'S FOR ===================== */}
      <section className="pf-csChapter">
        <div className="pf-csChapterHead pf-reveal">
          <span className="pf-csEyebrow">Who it’s for</span>
          <h2 className="pf-csH2">
            The people who order together — and the host who pays for it.
          </h2>
        </div>
        <div className="pf-csPersonas pf-reveal">
          {PERSONAS.map((p) => (
            <span className="pf-csPersona" key={p}>
              {p}
            </span>
          ))}
        </div>
        <p className="pf-csBody pf-csBody--lead pf-reveal">
          Anyone who’s been the host — stuck passing a phone around, fronting the
          whole bill, and chasing reimbursements days later.
        </p>
      </section>

      {/* ===================== THE NEED ===================== */}
      <section className="pf-csChapter">
        <div className="pf-csChapterHead pf-reveal">
          <span className="pf-csNum">01</span>
          <span className="pf-csEyebrow">The Need</span>
          <h2 className="pf-csH2">
            Ordering together is a coordination tax nobody enjoys paying.
          </h2>
        </div>
        <div className="pf-csNeed">
          {NEED.map((n) => (
            <div className="pf-csNeedItem pf-reveal" key={n.k}>
              <h3 className="pf-csNeedTitle">{n.k}</h3>
              <p className="pf-csBody">{n.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== THE APPROACH ===================== */}
      <section className="pf-csChapter">
        <div className="pf-csChapterHead pf-reveal">
          <span className="pf-csNum">02</span>
          <span className="pf-csEyebrow">The Approach</span>
          <h2 className="pf-csH2">
            One shared session: zero signup, one live cart, a split that always
            reconciles.
          </h2>
        </div>
        <p className="pf-csBody pf-csBody--lead pf-reveal">
          Anyone joins from their own device with just a name. Every add and
          remove broadcasts instantly over Socket.io, so the cart is a single
          source of truth the whole group watches fill up together. At checkout,
          a split engine computes each person’s share — proportionally or
          equally — and guarantees the parts always add up to the whole.
        </p>
      </section>

      {/* ===================== PROCESS ===================== */}
      <section className="pf-csChapter">
        <div className="pf-csChapterHead pf-reveal">
          <span className="pf-csNum">03</span>
          <span className="pf-csEyebrow">Process</span>
          <h2 className="pf-csH2">
            I mapped one continuous session before designing a single screen.
          </h2>
        </div>
        <p className="pf-csBody pf-csBody--lead pf-reveal">
          The guiding rule: no step should ever make you leave the room or do
          mental math. I sketched the end-to-end flow first, then designed each
          screen to that spine — so joining, ordering, splitting, paying and
          tracking all live inside one session.
        </p>
        <ol className="pf-csFlow pf-reveal">
          {FLOW.map((step, i) => (
            <li className="pf-csFlowStep" key={step}>
              <span className="pf-csFlowNum">{i + 1}</span>
              <span className="pf-csFlowLabel">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* ===================== SCENE: JOIN ===================== */}
      <section className="pf-csScene">
        <div className="pf-csSceneText pf-reveal">
          <span className="pf-csEyebrow">The experience — Join</span>
          <h3 className="pf-csH3">Join in one field</h3>
          <p className="pf-csBody">
            The host opens a room and shares a short code. Guests open the link,
            see the code already filled in, and tap join — no account, no
            install. Removing friction at the door is why the group actually
            shows up.
          </p>
        </div>
        <div className="pf-csSceneMedia pf-csSceneMedia--pair">
          <Shot src={imgStart} alt="Host starts a group order with their name" />
          <Shot src={imgJoin} alt="Guest joins the session with the code pre-filled" />
        </div>
      </section>

      {/* ===================== STAGE: RESTAURANTS ===================== */}
      <section className="pf-csStage pf-csStage--withHead">
        <div className="pf-csStageHead pf-reveal">
          <span className="pf-csEyebrow">The experience — Choose</span>
          <h3 className="pf-csH3">Pick where you’re ordering from</h3>
          <p className="pf-csBody">
            A familiar grid — rating, prep time, distance. Choosing a restaurant
            loads its real menu for everyone in the room at once.
          </p>
        </div>
        <Shot
          src={imgRestaurants}
          alt="Restaurant selection grid shared across the group"
        />
      </section>

      {/* ===================== SCENE: SPLIT ===================== */}
      <section className="pf-csScene pf-csScene--reverse">
        <div className="pf-csSceneText pf-reveal">
          <span className="pf-csEyebrow">The experience — Split</span>
          <h3 className="pf-csH3">The bill splits itself</h3>
          <p className="pf-csBody">
            Each member reviews and approves their own share, and the host
            can’t pay until everyone has — the pay button stays locked while
            anyone is still approving. A Proportional / Equal toggle and a
            transparent fee breakdown keep it fair and obvious.
          </p>
        </div>
        <div className="pf-csSceneMedia pf-csSceneMedia--pair">
          <Shot src={imgBillLocked} alt="Host view — pay locked until all members approve" />
          <Shot src={imgBillApproved} alt="All approved — Proceed to Pay unlocks" />
        </div>
      </section>

      {/* ===================== FINANCIAL RIGOR ===================== */}
      <section className="pf-csRigor pf-reveal">
        <div className="pf-csRigorInner">
          <span className="pf-csEyebrow">The hard part — Financial rigor</span>
          <h2 className="pf-csH2 pf-csH2--big">
            A split that’s off by a rupee is a broken promise.
          </h2>
          <p className="pf-csBody pf-csBody--lead">
            Currency math runs on integers in the smallest unit (paise), never
            floats — and the stray rounding unit is assigned deterministically,
            so the sum of all shares equals the invoice total exactly. The host
            is never left covering a gap.
          </p>
          <div className="pf-csEquation">
            <span className="pf-csEqPart">₹3,758 cart</span>
            <span className="pf-csEqOp">+ fees &amp; tax →</span>
            <span className="pf-csEqTotal">₹5,022</span>
            <span className="pf-csEqOp">splits cleanly into</span>
            <span className="pf-csEqPart">₹2,756</span>
            <span className="pf-csEqOp">+</span>
            <span className="pf-csEqPart">₹2,266</span>
          </div>
        </div>
      </section>

      {/* ===================== STAGE: SUCCESS ===================== */}
      <section className="pf-csStage pf-csStage--withHead">
        <div className="pf-csStageHead pf-reveal">
          <span className="pf-csEyebrow">The experience — Track</span>
          <h3 className="pf-csH3">Order placed, tracked together</h3>
          <p className="pf-csBody">
            One shared confirmation, a live tracking timeline, and the
            participant list — the group stays in sync all the way to the door.
          </p>
        </div>
        <Shot src={imgSuccess} alt="Shared order confirmation with live tracking" />
      </section>

      {/* ===================== DESIGN DECISIONS ===================== */}
      <section className="pf-csChapter">
        <div className="pf-csChapterHead pf-reveal">
          <span className="pf-csNum">04</span>
          <span className="pf-csEyebrow">Design decisions</span>
          <h2 className="pf-csH2">The calls that shaped how it feels.</h2>
        </div>
        <div className="pf-csCards">
          {DECISIONS.map((d) => (
            <div className="pf-csCard pf-reveal" key={d.k}>
              <h3 className="pf-csCardTitle">{d.k}</h3>
              <p className="pf-csBody">{d.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== EDGE CASES ===================== */}
      <section className="pf-csChapter">
        <div className="pf-csChapterHead pf-reveal">
          <span className="pf-csNum">05</span>
          <span className="pf-csEyebrow">Edge cases</span>
          <h2 className="pf-csH2">
            Real groups are chaotic — the unhappy paths got real attention.
          </h2>
        </div>
        <div className="pf-csCards">
          {EDGE_CASES.map((e) => (
            <div className="pf-csCard pf-reveal" key={e.k}>
              <h3 className="pf-csCardTitle">{e.k}</h3>
              <p className="pf-csBody">{e.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== OUTCOME ===================== */}
      <section className="pf-csImpact">
        <div className="pf-csChapterHead pf-reveal">
          <span className="pf-csNum">06</span>
          <span className="pf-csEyebrow">Outcome</span>
          <h2 className="pf-csH2">From a logistical headache to a calm, social ritual.</h2>
        </div>
        <div className="pf-csMetrics">
          {METRICS.map((m) => (
            <div className="pf-csMetric pf-reveal" key={m.label}>
              <div className="pf-csMetricFigure">{m.figure}</div>
              <div className="pf-csMetricLabel">{m.label}</div>
            </div>
          ))}
        </div>
        <p className="pf-csBody pf-csBody--lead pf-reveal">
          As a proof of concept, BiteSplit shows how AI pair-programming lets one
          designer own a real-time product end-to-end — while still owning the
          calls on what’s correct and what feels right.
        </p>
      </section>

      {/* ===================== REFLECTION ===================== */}
      <section className="pf-csImpact">
        <div className="pf-csChapterHead pf-reveal">
          <span className="pf-csNum">07</span>
          <span className="pf-csEyebrow">Reflection &amp; what’s next</span>
          <h2 className="pf-csH2">What it taught me — and where it goes.</h2>
        </div>
        <div className="pf-csReflect">
          <div className="pf-csReflectCol pf-reveal">
            <h3 className="pf-csCardTitle">What I learned</h3>
            <ul className="pf-csList">
              {LEARNINGS.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
          <div className="pf-csReflectCol pf-reveal">
            <h3 className="pf-csCardTitle">What’s next</h3>
            <ul className="pf-csList">
              {NEXT.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
        </div>
        <Link to={backTo} className="pf-csBackBig pf-reveal">
          ← Back to {backLabel}
        </Link>
      </section>
    </main>
  )
}

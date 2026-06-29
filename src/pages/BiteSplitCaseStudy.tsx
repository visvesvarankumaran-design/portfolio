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
  { label: 'Type', value: 'Responsive web · POC' },
  { label: 'Timeline', value: '1-week sprint' },
  { label: 'Year', value: '2026' },
]

/**
 * Optional links. Fill these in to light up the hero CTAs:
 *   DEMO_URL  — a live, playable build (Vercel/Netlify/etc.)
 *   VIDEO_URL — a 20–30s screen-recording of two devices syncing live
 * Left empty, the buttons simply don't render — nothing dead ships.
 */
const DEMO_URL = ''
const VIDEO_URL = ''

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

/**
 * Design guarantees, not usage metrics. This is a proof of concept with no
 * production users, so these are verifiable properties of what I designed and
 * built — never invented outcome numbers.
 */
const METRICS = [
  { figure: 'To the paise', label: 'Every split reconciles exactly to the invoice total — a property of the split engine, not an estimate.' },
  { figure: 'Zero install', label: 'Anyone joins a room from a phone or laptop with just a link and a name.' },
  { figure: 'Live', label: 'Every add, remove and approval syncs across all devices in real time.' },
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
  'Building from my own assumptions got me to a working POC fast, but it’s also the honest limit of this piece: until real groups use it, the problem framing stays a hypothesis I believe rather than one I’ve proven.',
]

const NEXT = [
  'Validate the assumptions: put the prototype in front of real groups at lunch and watch where coordination still breaks.',
  'In-app payments with automatic settlement, so members pay their share directly instead of the host fronting it.',
  'Saved groups and one-tap reorder (“same as last Friday”).',
  'Dietary tags and allergen filters surfaced right in the shared cart.',
  'Light persistence so a session survives a closed tab, not just a refresh.',
]

/* ---- Foundations: the visual system behind the screens ---- */
const PALETTE = [
  { name: 'Spice Orange', hex: '#FC8019', note: 'Brand · primary actions · price' },
  { name: 'Ink', hex: '#232533', note: 'Headlines · key values' },
  { name: 'Slate', hex: '#686B78', note: 'Labels · secondary text' },
  { name: 'Veg Green', hex: '#48C479', note: 'Veg dot · approved · success' },
  { name: 'Surface', hex: '#FFFFFF', note: 'Cards · menu · cart' },
  { name: 'Cloud', hex: '#F5F5F6', note: 'Page background · inactive rows' },
]

const TYPE_SCALE = [
  { role: 'Display', sample: 'Split the bill', spec: '32 · Bold' },
  { role: 'Title', sample: 'Your shared cart', spec: '20 · Semibold' },
  { role: 'Body', sample: 'Paneer Tikka · No onions', spec: '15 · Regular' },
  { role: 'Price', sample: '₹2,756', spec: '16 · Semibold · tabular' },
  { role: 'Label', sample: 'WAITING FOR APPROVAL', spec: '12 · Medium · caps' },
]

const SYSTEM = [
  { k: '8-pt grid', v: 'Spacing, padding and gaps step in multiples of 8 for an even, predictable rhythm.' },
  { k: 'Tabular numerals', v: 'Money is always set in tabular figures so columns of rupees line up and stay scannable.' },
  { k: 'One radius', v: '12px on cards and fields; fully-rounded pills for the primary button and status chips.' },
  { k: 'State, not just colour', v: 'Status reads through an icon and a label as well as colour, so meaning never rests on hue alone.' },
]

const COMPONENTS = [
  'Restaurant card',
  'Menu item row',
  'Veg / non-veg dot',
  'Shared-cart line',
  'Per-person split card',
  'Approval status chip',
  'Locked pay button',
  'Room-code field',
  'Proportional / Equal toggle',
]

/* ---- Accessibility: considerations I designed to (and would enforce) ---- */
const A11Y = [
  {
    k: 'Meaning beyond colour',
    v: 'Veg / non-veg uses a dot shape plus a label, and approval status carries an icon and text — colour-blind users never lose information.',
  },
  {
    k: 'An honest disabled state',
    v: 'The locked pay button spells its state out in words, not just a greyed-out fill, so the reason it’s blocked is explained rather than only felt.',
  },
  {
    k: 'Contrast, used honestly',
    v: 'Ink #232533 on white carries all body text at ~15:1, well past WCAG AA. Spice Orange is treated as an accent and fill — I keep small text off it, since white-on-orange is a known contrast trap.',
  },
  {
    k: 'Keyboard & live updates',
    v: 'Join, add, remove and approve are standard focusable controls, and cart changes are designed to announce through a polite live region rather than only appearing.',
  },
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

/**
 * A worked split, to make the engine concrete. A 3-person cart of ₹1,214 in
 * items + ₹122 fees = ₹1,336.00, shown both ways. Both reconcile to the paise:
 *  · Proportional — share of the total in the ratio of what each person ordered.
 *    Rounding to whole paise leaves two over; a fixed "largest remainder" rule
 *    hands them to Meera and Dev, so the column still sums to ₹1,336.00.
 *  · Equal — ₹1,336 ÷ 3 = ₹445.33̅; the one stray paisa goes to the first joiner.
 */
const SPLIT_TOTAL = '₹1,336.00'
const SPLIT_SUB = '₹1,214 in items + ₹122 delivery, taxes & charges'
const SPLIT_ROWS = [
  { name: 'Aarav', items: '₹575', prop: '₹632.78', equal: '₹445.34' },
  { name: 'Meera', items: '₹399', prop: '₹439.10', equal: '₹445.33' },
  { name: 'Dev', items: '₹240', prop: '₹264.12', equal: '₹445.33' },
]

/**
 * Two role-specific user flows — Host and Guest — each a vertical flowchart
 * with rounded terminals, rectangular steps and a diamond decision that loops.
 * Rendered from a data model by <FlowColumn/> so both stay consistent.
 */
type FlowNode =
  | { kind: 'start' | 'end'; label: string }
  | { kind: 'step'; label: string }
  | { kind: 'decision'; label: string; loopTo: number; noLabel?: string }

const HOST_FLOW: FlowNode[] = [
  { kind: 'start', label: 'Open the link' },
  { kind: 'step', label: 'Create a room' },
  { kind: 'step', label: 'Share the code' },
  { kind: 'step', label: 'Pick a restaurant' },
  { kind: 'step', label: 'Build the shared cart' },
  { kind: 'step', label: 'Lock the cart' },
  { kind: 'step', label: 'Wait for approvals' },
  { kind: 'decision', label: 'Everyone approved?', loopTo: 6, noLabel: 'No · keep waiting' },
  { kind: 'step', label: 'Pay the bill' },
  { kind: 'end', label: 'Track together' },
]

const GUEST_FLOW: FlowNode[] = [
  { kind: 'start', label: 'Open the link' },
  { kind: 'step', label: 'Enter the code' },
  { kind: 'step', label: 'Join the room' },
  { kind: 'step', label: 'Add your items' },
  { kind: 'step', label: 'Review your order' },
  { kind: 'decision', label: 'Order look good?', loopTo: 3, noLabel: 'No · edit items' },
  // Cart locks here (host action) → the bill auto-splits → share now exists.
  { kind: 'step', label: 'See your share' },
  { kind: 'step', label: 'Approve your share' },
  { kind: 'step', label: 'Wait for everyone' },
  { kind: 'end', label: 'Track together' },
]

// SVG layout constants (one narrow column).
const CX = 175
const GAP = 116
const TOP = 44
const COL_W = 350
const halfH = (n: FlowNode) =>
  n.kind === 'decision' ? 52 : n.kind === 'step' ? 27 : 25
const cyOf = (i: number) => TOP + i * GAP

/** One role's flow as a self-contained, scalable SVG flowchart. */
function FlowColumn({
  title,
  accent,
  nodes,
}: {
  title: string
  accent: string
  nodes: FlowNode[]
}) {
  const arrowId = `ufArrow-${accent}`
  const totalH = cyOf(nodes.length - 1) + halfH(nodes[nodes.length - 1]) + 24
  const desc = nodes.map((n) => n.label).join(' → ')
  return (
    <figure className="pf-ufCol pf-reveal">
      <figcaption className="pf-ufColTitle">{title}</figcaption>
      <svg
        viewBox={`0 0 ${COL_W} ${totalH}`}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={`${title}: ${desc}`}
      >
        <defs>
          <marker
            id={arrowId}
            markerWidth="9"
            markerHeight="8"
            refX="7"
            refY="3"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path d="M0,0 L7,3 L0,6 Z" fill="#f2691e" />
          </marker>
        </defs>

        {/* connectors between consecutive nodes (drawn under the nodes) */}
        {nodes.slice(0, -1).map((n, i) => {
          const fromY = cyOf(i) + halfH(n)
          const toY = cyOf(i + 1) - halfH(nodes[i + 1])
          return (
            <g key={`edge-${i}`}>
              <path
                className="pf-ufEdge"
                d={`M${CX},${fromY} L${CX},${toY}`}
                markerEnd={`url(#${arrowId})`}
              />
              {n.kind === 'decision' ? (
                <text
                  className="pf-ufBranch"
                  x={CX + 12}
                  y={(fromY + toY) / 2}
                  textAnchor="start"
                >
                  Yes
                </text>
              ) : null}
            </g>
          )
        })}

        {/* "No" loops back up from each decision to its target step */}
        {nodes.map((n, i) =>
          n.kind === 'decision' ? (
            <g key={`loop-${i}`}>
              <path
                className="pf-ufEdge"
                d={`M${CX - 95},${cyOf(i)} L40,${cyOf(i)} L40,${cyOf(
                  n.loopTo,
                )} L${CX - 120},${cyOf(n.loopTo)}`}
                markerEnd={`url(#${arrowId})`}
              />
              <text
                className="pf-ufBranch"
                x={24}
                y={(cyOf(i) + cyOf(n.loopTo)) / 2}
                textAnchor="middle"
                transform={`rotate(-90 24 ${(cyOf(i) + cyOf(n.loopTo)) / 2})`}
              >
                {n.noLabel ?? 'No'}
              </text>
            </g>
          ) : null,
        )}

        {/* nodes */}
        {nodes.map((n, i) => {
          const cy = cyOf(i)
          if (n.kind === 'decision') {
            return (
              <g key={`node-${i}`}>
                <polygon
                  className="pf-ufDecision"
                  points={`${CX},${cy - 52} ${CX + 95},${cy} ${CX},${cy + 52} ${
                    CX - 95
                  },${cy}`}
                />
                <text className="pf-ufDecText" x={CX} y={cy + 1}>
                  {n.label}
                </text>
              </g>
            )
          }
          if (n.kind === 'start' || n.kind === 'end') {
            return (
              <g key={`node-${i}`}>
                <rect
                  className={n.kind === 'start' ? 'pf-ufTermStart' : 'pf-ufTermEnd'}
                  x={CX - 100}
                  y={cy - 25}
                  width={200}
                  height={50}
                  rx={25}
                />
                <text
                  className={`pf-ufTermText${
                    n.kind === 'end' ? ' pf-ufTermText--end' : ''
                  }`}
                  x={CX}
                  y={cy + 1}
                >
                  {n.label}
                </text>
              </g>
            )
          }
          return (
            <g key={`node-${i}`}>
              <rect
                className="pf-ufNode"
                x={CX - 120}
                y={cy - 27}
                width={240}
                height={54}
                rx={12}
              />
              <text className="pf-ufNodeText" x={CX} y={cy + 1}>
                {n.label}
              </text>
            </g>
          )
        })}
      </svg>
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
    <main className="pf-cs pf-bs" ref={rootRef}>
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
            split engine) with AI as a pair-programmer. It’s a responsive web
            app: everyone joins from their own device — phone or laptop — with
            just a link, and the frames here show the desktop layout.
          </p>
          <div className="pf-csMetaRow">
            {META.map((m) => (
              <div className="pf-csMetaItem" key={m.label}>
                <span className="pf-csMetaLabel">{m.label}</span>
                <span className="pf-csMetaValue">{m.value}</span>
              </div>
            ))}
            <div className="pf-csCtas">
              {VIDEO_URL ? (
                <a
                  className="pf-csCta pf-csCta--primary"
                  href={VIDEO_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  ▶ Watch it sync (30s)
                </a>
              ) : null}
              {DEMO_URL ? (
                <a
                  className="pf-csCta"
                  href={DEMO_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  ↗ Live demo
                </a>
              ) : null}
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
        <p className="pf-csNote pf-reveal">
          A note on honesty: this is a self-initiated concept, born from a problem
          I keep living, not a researched brief. The groups above are the
          assumptions I designed against — not validated segments. Putting the
          prototype in front of real groups is the first item under “What’s next.”
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

        <div className="pf-ufWrap pf-reveal">
          <span className="pf-csEyebrow">User flow</span>
          <h3 className="pf-csH3">Two roles, one shared session.</h3>
          <p className="pf-csBody">
            The host and a guest take different paths, so each gets its own flow.
            They’re not separate apps, though — both meet on the same live cart,
            and neither reaches checkout until everyone has approved. Each flow
            carries a decision that loops: the host waits until all approve, the
            guest can edit until their order looks right, then approves the
            share once the cart locks.
          </p>
          <div className="pf-ufCols">
            <FlowColumn title="Host journey" accent="host" nodes={HOST_FLOW} />
            <span className="pf-ufJoin" aria-hidden="true">
              same live cart
            </span>
            <FlowColumn title="Guest journey" accent="guest" nodes={GUEST_FLOW} />
          </div>
          <div className="pf-ufLegend" aria-hidden="true">
            <span className="pf-ufKey pf-ufKey--start">Start / End</span>
            <span className="pf-ufKey pf-ufKey--step">Step</span>
            <span className="pf-ufKey pf-ufKey--decision">Decision</span>
          </div>
        </div>
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

          <div className="pf-csSplit">
            <div className="pf-csSplitTop">
              <span className="pf-csEyebrow">Worked example · 3-person cart</span>
              <p className="pf-csBody">
                {SPLIT_SUB} = <b>{SPLIT_TOTAL}</b>. The same bill, split two ways
                — both reconcile to the paise.
              </p>
            </div>
            <table className="pf-csSplitTable">
              <thead>
                <tr>
                  <th scope="col">Person</th>
                  <th scope="col">Ordered</th>
                  <th scope="col">Proportional</th>
                  <th scope="col">Equal</th>
                </tr>
              </thead>
              <tbody>
                {SPLIT_ROWS.map((r) => (
                  <tr key={r.name}>
                    <th scope="row">{r.name}</th>
                    <td className="pf-csNum2">{r.items}</td>
                    <td className="pf-csNum2">{r.prop}</td>
                    <td className="pf-csNum2">{r.equal}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row">Total</th>
                  <td className="pf-csNum2">₹1,214</td>
                  <td className="pf-csNum2">{SPLIT_TOTAL}</td>
                  <td className="pf-csNum2">{SPLIT_TOTAL}</td>
                </tr>
              </tfoot>
            </table>
            <p className="pf-csSplitNote">
              Every share is computed in integer paise, never floats.
              Proportional rounding leaves two stray paise; a fixed
              “largest-remainder” rule hands them to Meera and Dev, so each
              column sums to exactly {SPLIT_TOTAL} — the host never eats the
              difference.
            </p>
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

      {/* ===================== FOUNDATIONS ===================== */}
      <section className="pf-csChapter">
        <div className="pf-csChapterHead pf-reveal">
          <span className="pf-csNum">06</span>
          <span className="pf-csEyebrow">Foundations</span>
          <h2 className="pf-csH2">The visual system that keeps it consistent.</h2>
        </div>

        <div className="pf-fnGrid">
          {/* Colour */}
          <div className="pf-fnCard pf-reveal">
            <h3 className="pf-fnCardTitle">Colour</h3>
            <ul className="pf-fnSwatches">
              {PALETTE.map((c) => (
                <li className="pf-fnSwatch" key={c.hex}>
                  <span
                    className="pf-fnChip"
                    style={{ background: c.hex }}
                    aria-hidden="true"
                  />
                  <span className="pf-fnSwatchMeta">
                    <b>{c.name}</b>
                    <code>{c.hex}</code>
                    <small>{c.note}</small>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Type */}
          <div className="pf-fnCard pf-reveal">
            <h3 className="pf-fnCardTitle">Type scale</h3>
            <ul className="pf-fnType">
              {TYPE_SCALE.map((t) => (
                <li className="pf-fnTypeRow" key={t.role}>
                  <span
                    className={`pf-fnTypeSample pf-fnType--${t.role.toLowerCase()}`}
                  >
                    {t.sample}
                  </span>
                  <span className="pf-fnTypeMeta">
                    {t.role} · {t.spec}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* System rules */}
        <div className="pf-fnRules">
          {SYSTEM.map((r) => (
            <div className="pf-fnRule pf-reveal" key={r.k}>
              <h3 className="pf-fnRuleTitle">{r.k}</h3>
              <p className="pf-csBody">{r.v}</p>
            </div>
          ))}
        </div>

        {/* Components */}
        <div className="pf-fnComponents pf-reveal">
          <span className="pf-csEyebrow">Reusable components</span>
          <ul className="pf-fnChips">
            {COMPONENTS.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===================== ACCESSIBILITY ===================== */}
      <section className="pf-csChapter">
        <div className="pf-csChapterHead pf-reveal">
          <span className="pf-csNum">07</span>
          <span className="pf-csEyebrow">Accessibility</span>
          <h2 className="pf-csH2">
            Money and groups raise the stakes — so does getting access right.
          </h2>
        </div>
        <div className="pf-csCards">
          {A11Y.map((a) => (
            <div className="pf-csCard pf-reveal" key={a.k}>
              <h3 className="pf-csCardTitle">{a.k}</h3>
              <p className="pf-csBody">{a.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== OUTCOME ===================== */}
      <section className="pf-csImpact">
        <div className="pf-csChapterHead pf-reveal">
          <span className="pf-csNum">08</span>
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
          <span className="pf-csNum">09</span>
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

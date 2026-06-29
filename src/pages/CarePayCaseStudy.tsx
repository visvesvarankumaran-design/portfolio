import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

const TAGS = ['Product Design', 'Systems Design', 'Schema-driven', 'React', 'Fintech · Healthcare']

const META = [
  { label: 'Role', value: 'Product & systems design' },
  { label: 'Type', value: 'Enterprise web platform' },
  { label: 'Domain', value: 'Clinical revenue · payouts' },
  { label: 'Year', value: '2026' },
]

/**
 * Optional links. Left empty, the buttons simply don't render.
 */
const DEMO_URL = ''
const VIDEO_URL = ''

/* ---- The problem: why spreadsheets break at this scale ---- */
const PROBLEMS = [
  {
    k: 'Contracts are not flat',
    v: 'A consultant might earn 0% on the first ₹1,00,000 of revenue, 10% on the next ₹2,00,000, and 15% beyond — marginal slabs, cumulative tiers and flat fees, often blended inside a single agreement.',
  },
  {
    k: 'Every unit exports differently',
    v: 'Oncology centres and multi-speciality clinics run different billing systems, each with its own headers, date formats and columns. Hardcoded import scripts broke the moment a column moved.',
  },
  {
    k: 'Dirty data, real money',
    v: 'Incoming sheets carry duplicate transactions, missing doctor IDs, zero-value rows and invalid service codes — each one a silent calculation error in a ₹-denominated payout.',
  },
  {
    k: 'Overrides and exclusions',
    v: 'Pharmacy, consumables and high-cost implants must be excluded from sharing; specific procedures like PET-CT need flat-rate or distinct-percentage overrides. The rules live per doctor, per service.',
  },
  {
    k: 'Slow, opaque, disputed',
    v: 'Settling hundreds of consultants across centres took 10–15 days, with no real-time breakdown for doctors — so every cycle ended in fee disputes the finance team had to litigate by hand.',
  },
]

/* ---- The five-layer pipeline (replaces a screenshot — this IS the product) ---- */
type Layer = { n: string; title: string; chips: string[] }
const PIPELINE: Layer[] = [
  {
    n: '01',
    title: 'User interface',
    chips: ['Master data', 'Validation rules', 'Payout templates', 'Ledger'],
  },
  {
    n: '02',
    title: 'Dynamic schema ingestion',
    chips: ['Raw Excel / CSV', 'Column mapper', 'Typed master registries'],
  },
  {
    n: '03',
    title: 'Validation & audit engine',
    chips: ['Apply schema profiles', 'Flag duplicates', 'Flag negatives & gaps'],
  },
  {
    n: '04',
    title: 'Calculation & rule engine',
    chips: ['Exclusion rules', 'Service overrides', 'Marginal slabs'],
  },
  {
    n: '05',
    title: 'Deduction & net settlement',
    chips: ['HCF charges', 'TDS (194J)', 'Final ledger'],
  },
]

/* ---- Core modules ---- */
const MODULES = [
  {
    k: 'Master Data & Schema Configurator',
    v: 'Administrators define input schemas as data — declaring that “OPD_Bill_v1” carries Doctor_ID, Net_Amount and Service_Category — instead of waiting on a code change.',
  },
  {
    k: 'Validation Profile Editor',
    v: 'Pre-processing gates expressed as rules: flag if Amount ≤ 0, flag if Transaction_Date is in the future, flag rows with no doctor association.',
  },
  {
    k: 'Payout Template Builder',
    v: 'Reusable payout profiles — cash and credit slab brackets, minimum-eligibility thresholds and service-specific rules — assembled once and shared across consultants.',
  },
  {
    k: 'Doctor Logic Override Editor',
    v: 'Maps each doctor to a template while allowing bespoke overrides, so a unique contract never forces a fork of the whole engine.',
  },
  {
    k: 'Fee Processing Console',
    v: 'Runs the monthly cycle end to end: upload, validate, execute the multi-pass calculator and compile a download-ready breakdown ledger.',
  },
]

/* ---- The marginal-slab worked example (the financial-rigor centrepiece) ---- */
const SLAB_REVENUE = '₹3,50,000'
const SLAB_ROWS = [
  { band: '₹0 – ₹1,00,000', rate: '10%', inBand: '₹1,00,000', payout: '₹10,000' },
  { band: '₹1,00,001 – ₹3,00,000', rate: '15%', inBand: '₹2,00,000', payout: '₹30,000' },
  { band: '₹3,00,001 +', rate: '20%', inBand: '₹50,000', payout: '₹10,000' },
]
const SLAB_TOTAL = '₹50,000'
const SLAB_FLAT = '₹70,000'

/* ---- The rule engine: what runs before the slabs ---- */
const RULES = [
  {
    k: 'Exclusion rules',
    v: 'Non-shareable charges — pharmacy, consumables, room rent — are filtered out by service-group code before a single rupee enters the slab math.',
  },
  {
    k: 'Incremental exclusion (skip-N)',
    v: 'Contracts where the first N transactions of a service are non-payable: “the first 3 consultations are free; the doctor is paid from the 4th onward.” The engine counts occurrences, not just amounts.',
  },
  {
    k: 'Custom payout overrides',
    v: 'JSON conditions evaluated as an AST — e.g. Service_Group == “PET CT” AND Department == “Radiology” — then a flat amount, a fixed percentage, or a custom formula like (Payable − 500) × 0.25.',
  },
]

/* ---- Net settlement: the deduction waterfall ---- */
const WATERFALL = [
  {
    k: 'Revenue split',
    v: 'Transactions are divided into cash collections and credit billing (corporate / TPA insurance). Each side can run its own slab table, protecting cash flow against delayed insurance realisation.',
  },
  {
    k: 'HCF deduction',
    v: 'Hospital / infrastructure service charges come off the gross service amount before the doctor’s share is computed — not after.',
  },
  {
    k: 'Minimum-eligibility guard',
    v: 'If cumulative monthly net revenue misses a configured threshold, the payout falls back to the contracted baseline or zero — never a silent under- or over-pay.',
  },
  {
    k: 'TDS & net payable',
    v: 'Professional tax (e.g. 10% under Section 194J) is withheld automatically to produce the final net-payable figure on the ledger.',
  },
]

/* ---- End-to-end processing workflow ---- */
const FLOW = [
  'Select unit & period',
  'Download templates',
  'Upload billing CSVs',
  'Two-level validation',
  'Multi-pass compute',
  'Settlement report',
]

/* ---- Why it's built this way ---- */
const DECISIONS = [
  {
    k: 'Configuration over code',
    v: 'Schemas, validations and payout rules are data, edited by finance admins — so onboarding a new contract or billing format never requires a deployment.',
  },
  {
    k: 'Marginal, never flat',
    v: 'The engine taxes each bracket on its own slice. On a ₹3.5L revenue that is the difference between ₹50,000 and ₹70,000 — a 40% overpay if you apply the top rate to the whole sum.',
  },
  {
    k: 'Audit-first ledger',
    v: 'Every payout is a row-by-row trail — which rules excluded what, which slab paid which slice — so a number can always be defended, not just asserted.',
  },
  {
    k: 'Cash and credit, kept apart',
    v: 'Separate progression tables stop delayed insurance money from inflating a payout the hospital hasn’t actually collected yet.',
  },
]

/* ---- Validation: the two gates every file passes ---- */
const VALIDATION = [
  {
    k: 'Structural checks',
    v: 'Column count, data types and non-empty rows are verified against the active schema before any business rule runs.',
  },
  {
    k: 'Business-rule checks',
    v: 'Negative amounts, backdated or future dates, and missing doctor associations are flagged — files only clear once every row earns a green check.',
  },
]

/* ---- Outcome ---- */
const METRICS = [
  { figure: '12 days → < 1 hr', label: 'Monthly settlement cycles collapse from a 10–15 day manual grind to a single processing run.' },
  { figure: '2–4% leakage', label: 'Eliminating Excel formula errors and manual oversights closes the overpayment gap that used to slip through every month.' },
  { figure: 'Row-by-row', label: 'Doctors download a transparent breakdown showing exactly how exclusions, rules and slabs produced their number.' },
]

const LEARNINGS = [
  'When the domain logic is the product, the schema is the design — most of the work was modelling contracts as data so the engine never has to be rewritten per doctor.',
  'Correctness is a design surface: a marginal-vs-flat slab choice is invisible in the UI but worth tens of thousands of rupees per consultant, per month.',
  'Trust in a payout system is built in the trail, not the total — the row-by-row ledger is what turns a disputed number into an explained one.',
  'Validation belongs at the door. Catching dirty data before the math runs is far cheaper than reconciling a wrong payout after it has been emailed out.',
]

const NEXT = [
  'Versioned contracts, so a mid-year rule change recomputes cleanly without rewriting history.',
  'Anomaly detection on incoming sheets — surfacing the row that looks wrong before a human has to.',
  'Self-serve template simulation: let a consultant model “what would I earn under this agreement” before it is signed.',
  'A signed audit export bundling the ledger, the rules applied and the source data for compliance.',
]

/* ---- Navigation & user-flow map (rendered as a themed SVG) ---- */
type UfKind = 'terminal' | 'screen' | 'spine' | 'action' | 'output'
type UfNode = {
  id: string
  x: number
  y: number
  w: number
  h: number
  kind: UfKind
  label: string
  sub: string
}

/** Node positions for the architecture map. viewBox is 1000 × 930. */
const UF_NODES: UfNode[] = [
  { id: 'login', x: 500, y: 54, w: 200, h: 58, kind: 'terminal', label: 'Login', sub: 'Secure portal' },
  { id: 'dash', x: 500, y: 184, w: 248, h: 64, kind: 'screen', label: 'Home Dashboard', sub: 'Unit switcher · KPIs' },
  { id: 'master', x: 172, y: 322, w: 234, h: 64, kind: 'screen', label: 'Master Data', sub: 'Registries · profiles' },
  { id: 'fee', x: 500, y: 322, w: 248, h: 64, kind: 'spine', label: 'Fee Processing', sub: 'Period calendar' },
  { id: 'settings', x: 828, y: 322, w: 234, h: 64, kind: 'screen', label: 'Settings', sub: 'Schemas · validation' },
  { id: 'period', x: 500, y: 458, w: 234, h: 56, kind: 'action', label: 'Select period', sub: 'e.g. August 2022' },
  { id: 'workspace', x: 500, y: 586, w: 268, h: 64, kind: 'screen', label: 'Input Data Workspace', sub: 'Upload · validations' },
  { id: 'process', x: 500, y: 714, w: 234, h: 56, kind: 'action', label: 'Process Payout', sub: 'Rule + slab engine' },
  { id: 'ledger', x: 172, y: 854, w: 234, h: 64, kind: 'output', label: 'Output Ledger', sub: 'Per-doctor breakdown' },
  { id: 'report', x: 500, y: 854, w: 234, h: 64, kind: 'output', label: 'Visual Report', sub: 'Charts · KPIs' },
  { id: 'email', x: 828, y: 854, w: 234, h: 64, kind: 'output', label: 'Email Dispatch', sub: 'Simulated slips' },
]

/** Two role-specific journeys through the same platform. */
const UF_PERSONAS = [
  {
    role: 'Unit Finance Officer',
    tag: 'Operator',
    goal: 'Ingest raw billing, clear errors, and release verified payouts.',
    steps: [
      'Log in to the CarePay portal',
      'Select the assigned clinical unit',
      'Open Fee Processing → pick the period',
      'Download the schema-compliant CSV template',
      'Drag & drop the monthly billing sheet',
      'Clear Level 1 & 2 validation flags',
      'Run Process Payout',
      'Review ledgers & trigger doctor emails',
    ],
  },
  {
    role: 'Corporate Finance Auditor',
    tag: 'Viewer · Approver',
    goal: 'Verify the configuration and the numbers, then sign off the period.',
    steps: [
      'Inspect processing schemas & validation profiles',
      'Audit doctor masters & payout templates',
      'Spot-check a consultant in the output ledger',
      'Approve the period — freezing all changes',
    ],
  },
]

/** The whole application as a single branching flow: one entry, two fan-outs. */
function UserFlowMap() {
  return (
    <div className="pf-cpUfScroll pf-reveal">
      <svg
        className="pf-cpUfSvg"
        viewBox="0 0 1000 930"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="CarePay navigation map: Login leads to the Home Dashboard, which branches to Master Data, the Fee Processing Console, and Settings. Fee Processing leads to selecting a period, the Input Data Workspace, then Process Payout, which produces the Output Ledger, the Visual Report, and the Email Dispatch."
      >
        <defs>
          <marker
            id="cpArrow"
            markerWidth="9"
            markerHeight="8"
            refX="7"
            refY="3"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path d="M0,0 L7,3 L0,6 Z" fill="#34d399" />
          </marker>
        </defs>

        {/* login → dashboard */}
        <path className="pf-cpUfEdge pf-cpUfEdge--spine" d="M500,83 V152" markerEnd="url(#cpArrow)" />

        {/* dashboard fan-out to the three top-level sections */}
        <path className="pf-cpUfEdge" d="M500,216 V252" />
        <path className="pf-cpUfEdge" d="M172,252 H828" />
        <path className="pf-cpUfEdge" d="M172,252 V288" markerEnd="url(#cpArrow)" />
        <path className="pf-cpUfEdge pf-cpUfEdge--spine" d="M500,252 V288" markerEnd="url(#cpArrow)" />
        <path className="pf-cpUfEdge" d="M828,252 V288" markerEnd="url(#cpArrow)" />

        {/* the processing spine */}
        <path className="pf-cpUfEdge pf-cpUfEdge--spine" d="M500,354 V428" markerEnd="url(#cpArrow)" />
        <path className="pf-cpUfEdge pf-cpUfEdge--spine" d="M500,486 V552" markerEnd="url(#cpArrow)" />
        <path className="pf-cpUfEdge pf-cpUfEdge--spine" d="M500,618 V684" markerEnd="url(#cpArrow)" />

        {/* validation gate — fix & re-validate loop on the workspace */}
        <path className="pf-cpUfLoop" d="M634,576 H706 V596 H636" markerEnd="url(#cpArrow)" />
        <text className="pf-cpUfLoopText" x="714" y="587" textAnchor="start">
          fix &amp; re-validate
        </text>

        {/* process → three outputs */}
        <path className="pf-cpUfEdge pf-cpUfEdge--spine" d="M500,742 V783" />
        <path className="pf-cpUfEdge" d="M172,783 H828" />
        <path className="pf-cpUfEdge" d="M172,783 V822" markerEnd="url(#cpArrow)" />
        <path className="pf-cpUfEdge" d="M500,783 V822" markerEnd="url(#cpArrow)" />
        <path className="pf-cpUfEdge" d="M828,783 V822" markerEnd="url(#cpArrow)" />

        {/* nodes */}
        {UF_NODES.map((n) => {
          const isPill = n.kind === 'terminal' || n.kind === 'action'
          const onFill = n.kind === 'action'
          return (
            <g key={n.id}>
              <rect
                className={`pf-cpUfBox pf-cpUf-${n.kind}`}
                x={n.x - n.w / 2}
                y={n.y - n.h / 2}
                width={n.w}
                height={n.h}
                rx={isPill ? n.h / 2 : 14}
              />
              <text
                className={`pf-cpUfLabel${onFill ? ' pf-cpUfLabel--on' : ''}`}
                x={n.x}
                y={n.y - 6}
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {n.label}
              </text>
              <text
                className={`pf-cpUfSub${onFill ? ' pf-cpUfSub--on' : ''}`}
                x={n.x}
                y={n.y + 14}
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {n.sub}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

/** A vertical, connected diagram of the processing pipeline — the system at a glance. */
function Pipeline() {
  return (
    <ol className="pf-cpPipe" aria-label="Processing pipeline, top to bottom">
      {PIPELINE.map((layer, i) => (
        <li className="pf-cpPipeRow pf-reveal" key={layer.n}>
          <div className="pf-cpPipeCard">
            <span className="pf-cpPipeNum">{layer.n}</span>
            <div className="pf-cpPipeBody">
              <h3 className="pf-cpPipeTitle">{layer.title}</h3>
              <ul className="pf-cpPipeChips">
                {layer.chips.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
          {i < PIPELINE.length - 1 ? (
            <span className="pf-cpPipeArrow" aria-hidden="true">
              ↓
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  )
}

export function CarePayCaseStudy() {
  const rootRef = useRef<HTMLElement>(null)

  // Back navigation follows where the case study was opened from.
  const location = useLocation()
  const origin = location.state as { from?: string; fromLabel?: string } | null
  const backTo = origin?.from ?? '/work'
  const backLabel = origin?.fromLabel ?? 'Work'

  // Scroll reveal — progressive enhancement, identical pattern to the other
  // case studies: content is visible by default, only hidden once JS confirms
  // IntersectionObserver support, so it can never get stuck invisible.
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
    <main className="pf-cs pf-cp" ref={rootRef}>
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
          <h1 className="pf-csTitle">CarePay</h1>
          <p className="pf-csLede">
            Doctor payouts, computed not by spreadsheet. A schema-driven engine
            that turns tiered fee-sharing contracts, messy billing exports and
            tax rules into an audit-ready ledger — settled in an hour, not a
            fortnight.
          </p>
          <p className="pf-csRole">
            A systems and product design case study. I modelled the contract
            domain, designed the schema-driven architecture and the multi-pass
            calculation engine, and the operator-facing console finance teams run
            the monthly cycle from. The visuals here are the system’s own
            architecture and worked math — this is a back-office platform, so the
            diagrams, not screenshots, are the product.
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
                  ▶ Watch a run
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
            </div>
          </div>
        </div>
        <div className="pf-csScrollCue" aria-hidden="true">
          <span>Scroll</span>
          <i />
        </div>
      </header>

      {/* ===================== SIGNATURE STAGE — the pipeline ===================== */}
      <section className="pf-csStage pf-csStage--withHead">
        <div className="pf-csStageHead pf-reveal">
          <span className="pf-csEyebrow">The system at a glance</span>
          <h3 className="pf-csH3">One file in, an audited ledger out.</h3>
          <p className="pf-csBody">
            A raw billing export enters at the top and flows through five layers —
            ingestion, validation, the rule and slab engine, and net settlement —
            emerging as a defensible, row-by-row payout for every consultant.
          </p>
        </div>
        <Pipeline />
      </section>

      {/* ===================== OVERVIEW ===================== */}
      <section className="pf-csChapter pf-csChapter--center">
        <p className="pf-csOverview pf-reveal">
          In a multi-speciality hospital group, doctor pay is one of the hardest
          numbers to get right.{' '}
          <span>
            CarePay replaces the nested-Excel ritual with a schema-driven engine
          </span>{' '}
          — one that ingests any billing format, validates it, and computes every
          tiered share to the rupee.
        </p>
      </section>

      {/* ===================== THE PROBLEM ===================== */}
      <section className="pf-csChapter">
        <div className="pf-csChapterHead pf-reveal">
          <span className="pf-csNum">01</span>
          <span className="pf-csEyebrow">The problem</span>
          <h2 className="pf-csH2">
            Hundreds of consultants, thousands of rules, one spreadsheet holding
            it all together.
          </h2>
        </div>
        <p className="pf-csBody pf-csBody--lead pf-reveal">
          Fees were computed monthly in heavily nested Excel sheets. At a few
          doctors it works; at a hospital network it becomes a 10–15 day bottleneck
          where a single mis-keyed formula quietly overpays — or shortchanges — a
          consultant.
        </p>
        <div className="pf-csCards" style={{ marginTop: 'clamp(28px, 4vh, 48px)' }}>
          {PROBLEMS.map((p) => (
            <div className="pf-csCard pf-reveal" key={p.k}>
              <h3 className="pf-csCardTitle">{p.k}</h3>
              <p className="pf-csBody">{p.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== THE APPROACH ===================== */}
      <section className="pf-csChapter">
        <div className="pf-csChapterHead pf-reveal">
          <span className="pf-csNum">02</span>
          <span className="pf-csEyebrow">The approach</span>
          <h2 className="pf-csH2">
            Make the contract the data — and the engine never needs rewriting.
          </h2>
        </div>
        <p className="pf-csBody pf-csBody--lead pf-reveal">
          Rather than hardcode each hospital’s formats and each doctor’s
          agreement, CarePay is built on configurable metadata profiles. Schemas,
          validation gates and payout templates are all editable data — so a new
          billing format or a bespoke contract is a configuration, not a code
          change. That single decision is what lets one engine serve every unit in
          the network.
        </p>
      </section>

      {/* ===================== ARCHITECTURE — modules ===================== */}
      <section className="pf-csChapter">
        <div className="pf-csChapterHead pf-reveal">
          <span className="pf-csNum">03</span>
          <span className="pf-csEyebrow">Architecture</span>
          <h2 className="pf-csH2">Five modules, one schema-driven spine.</h2>
        </div>
        <p className="pf-csBody pf-csBody--lead pf-reveal">
          The platform is modular by design: each surface owns one
          responsibility, and they all read from the same metadata registry — so
          a schema defined once is honoured everywhere downstream.
        </p>
        <div className="pf-cpModules">
          {MODULES.map((m, i) => (
            <div className="pf-cpModule pf-reveal" key={m.k}>
              <span className="pf-cpModuleNum">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="pf-cpModuleTitle">{m.k}</h3>
                <p className="pf-csBody">{m.v}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== VALIDATION ===================== */}
      <section className="pf-csChapter">
        <div className="pf-csChapterHead pf-reveal">
          <span className="pf-csNum">04</span>
          <span className="pf-csEyebrow">Validation & audit</span>
          <h2 className="pf-csH2">
            Bad data is caught at the door, before the math ever runs.
          </h2>
        </div>
        <p className="pf-csBody pf-csBody--lead pf-reveal">
          Every uploaded file passes two gates against the active profile. Only
          when both clear — and every row earns a green check — can the
          calculator run. A wrong payout caught here costs nothing; one caught
          after the email goes out costs a dispute.
        </p>
        <div className="pf-csCards">
          {VALIDATION.map((v) => (
            <div className="pf-csCard pf-reveal" key={v.k}>
              <h3 className="pf-csCardTitle">{v.k}</h3>
              <p className="pf-csBody">{v.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== THE RULE ENGINE ===================== */}
      <section className="pf-csChapter">
        <div className="pf-csChapterHead pf-reveal">
          <span className="pf-csNum">05</span>
          <span className="pf-csEyebrow">The rule engine</span>
          <h2 className="pf-csH2">
            Before the slabs, a hierarchy of rules decides what even counts.
          </h2>
        </div>
        <p className="pf-csBody pf-csBody--lead pf-reveal">
          Line items pass through a rule engine — conditions expressed as JSON and
          evaluated as an abstract syntax tree — in a fixed order, so exclusions
          and overrides resolve predictably every time.
        </p>
        <div className="pf-cpRuleChain">
          {RULES.map((r, i) => (
            <div className="pf-cpRule pf-reveal" key={r.k}>
              <span className="pf-cpRuleStep" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="pf-csCardTitle">{r.k}</h3>
              <p className="pf-csBody">{r.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== FINANCIAL RIGOR — marginal slabs ===================== */}
      <section className="pf-csRigor pf-reveal">
        <div className="pf-csRigorInner">
          <span className="pf-csEyebrow">The hard part — marginal slabs</span>
          <h2 className="pf-csH2 pf-csH2--big">
            Tax each bracket on its own slice — not the whole sum.
          </h2>
          <p className="pf-csBody pf-csBody--lead">
            In a marginal-slab contract, revenue is split across brackets and each
            rate applies only to the portion falling inside its band. Applying the
            top rate to the entire amount — the common spreadsheet shortcut — is
            both wrong and expensive. Here is the same {SLAB_REVENUE} of revenue,
            done right.
          </p>

          <div className="pf-cpSlab">
            <div className="pf-cpSlabTop">
              <span className="pf-csEyebrow">Worked example · total revenue {SLAB_REVENUE}</span>
              <p className="pf-csBody">
                Each band pays its own rate on only the revenue that lands inside
                it. The shares add up to the payout — exactly.
              </p>
            </div>
            <table className="pf-cpSlabTable">
              <thead>
                <tr>
                  <th scope="col">Band</th>
                  <th scope="col">Rate</th>
                  <th scope="col">Revenue in band</th>
                  <th scope="col">Payout</th>
                </tr>
              </thead>
              <tbody>
                {SLAB_ROWS.map((r) => (
                  <tr key={r.band}>
                    <th scope="row">{r.band}</th>
                    <td className="pf-cpNum">{r.rate}</td>
                    <td className="pf-cpNum">{r.inBand}</td>
                    <td className="pf-cpNum">{r.payout}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row">Marginal total</th>
                  <td className="pf-cpNum" />
                  <td className="pf-cpNum">{SLAB_REVENUE}</td>
                  <td className="pf-cpNum pf-cpNum--accent">{SLAB_TOTAL}</td>
                </tr>
              </tfoot>
            </table>
            <p className="pf-cpSlabNote">
              A flat-rate shortcut would apply the top 20% to the whole{' '}
              {SLAB_REVENUE} and pay <b>{SLAB_FLAT}</b> — a <b>₹20,000</b>{' '}
              overpay on a single consultant, every month. Across a network, that
              is the margin leakage the engine exists to close.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== NET SETTLEMENT — waterfall ===================== */}
      <section className="pf-csChapter">
        <div className="pf-csChapterHead pf-reveal">
          <span className="pf-csNum">06</span>
          <span className="pf-csEyebrow">Net settlement</span>
          <h2 className="pf-csH2">
            From gross share to net payable, in defensible steps.
          </h2>
        </div>
        <p className="pf-csBody pf-csBody--lead pf-reveal">
          Once the slabs have run, the figure passes through sequential ledger
          adjustments — each one a line a doctor or an auditor can point to.
        </p>
        <ol className="pf-cpWaterfall">
          {WATERFALL.map((w, i) => (
            <li className="pf-cpWaterStep pf-reveal" key={w.k}>
              <span className="pf-cpWaterNum">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="pf-csCardTitle">{w.k}</h3>
                <p className="pf-csBody">{w.v}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ===================== WORKFLOW ===================== */}
      <section className="pf-csChapter">
        <div className="pf-csChapterHead pf-reveal">
          <span className="pf-csNum">07</span>
          <span className="pf-csEyebrow">End-to-end workflow</span>
          <h2 className="pf-csH2">How a finance team runs a month.</h2>
        </div>
        <p className="pf-csBody pf-csBody--lead pf-reveal">
          From the Fee Processing Console, an operator picks a unit and period,
          drops in the billing sheets, and watches validation, computation and
          reporting happen in one continuous pass — ending in a multi-tab
          settlement report with a per-doctor breakdown and an email trigger.
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

      {/* ===================== USER FLOW ===================== */}
      <section className="pf-csChapter">
        <div className="pf-csChapterHead pf-reveal">
          <span className="pf-csNum">08</span>
          <span className="pf-csEyebrow">User flow</span>
          <h2 className="pf-csH2">
            One entry, two fan-outs — and never a dead end.
          </h2>
        </div>
        <p className="pf-csBody pf-csBody--lead pf-reveal">
          The whole portal is a single branching flow. A login opens the
          dashboard, which fans out to the three top-level sections; the Fee
          Processing spine runs down through a period, the upload workspace and
          the calculation engine, then fans out again into the three settlement
          outputs. The workspace gate is the one loop — files cycle through
          validation until every row is clean.
        </p>

        <UserFlowMap />

        <div className="pf-cpUfLegend pf-reveal" aria-hidden="true">
          <span className="pf-cpUfKey pf-cpUfKey--terminal">Entry</span>
          <span className="pf-cpUfKey pf-cpUfKey--screen">Screen</span>
          <span className="pf-cpUfKey pf-cpUfKey--spine">Main path</span>
          <span className="pf-cpUfKey pf-cpUfKey--action">Action</span>
          <span className="pf-cpUfKey pf-cpUfKey--output">Output</span>
        </div>

        <div className="pf-cpUfPersonasHead pf-reveal">
          <span className="pf-csEyebrow">Two roles, one platform</span>
          <h3 className="pf-csH3">Who walks which path.</h3>
          <p className="pf-csBody">
            The same screens serve two jobs. The operator drives a monthly cycle
            end to end; the auditor inspects the configuration and the numbers,
            then freezes the period with an approval.
          </p>
        </div>
        <div className="pf-cpPersonas">
          {UF_PERSONAS.map((p) => (
            <div className="pf-cpPersona pf-reveal" key={p.role}>
              <div className="pf-cpPersonaTop">
                <h4 className="pf-cpPersonaRole">{p.role}</h4>
                <span className="pf-cpPersonaTag">{p.tag}</span>
              </div>
              <p className="pf-cpPersonaGoal">{p.goal}</p>
              <ol className="pf-cpPersonaSteps">
                {p.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== DESIGN DECISIONS ===================== */}
      <section className="pf-csChapter">
        <div className="pf-csChapterHead pf-reveal">
          <span className="pf-csNum">09</span>
          <span className="pf-csEyebrow">Design decisions</span>
          <h2 className="pf-csH2">The calls that shaped the engine.</h2>
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

      {/* ===================== OUTCOME ===================== */}
      <section className="pf-csImpact">
        <div className="pf-csChapterHead pf-reveal">
          <span className="pf-csNum">10</span>
          <span className="pf-csEyebrow">Outcome</span>
          <h2 className="pf-csH2">From a 12-day grind to a one-hour, auditable run.</h2>
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
          The deeper win is agility: the network can onboard a consultant with an
          innovative fee-sharing model as a configuration — no custom software —
          while every doctor gets a transparent breakdown that ends disputes
          before they start.
        </p>
      </section>

      {/* ===================== REFLECTION ===================== */}
      <section className="pf-csImpact">
        <div className="pf-csChapterHead pf-reveal">
          <span className="pf-csNum">11</span>
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

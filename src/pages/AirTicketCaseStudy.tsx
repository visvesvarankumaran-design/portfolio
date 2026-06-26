import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import screenOnboarding from '../assets/Air-ticket/fScreen-1.png'
import screenHome from '../assets/Air-ticket/fScreen-2.png'
import screenTickets from '../assets/Air-ticket/fScreen-3.png'
import screenSeat from '../assets/Air-ticket/fScreen-4.png'
import screenPayment from '../assets/Air-ticket/fScreen-5.png'
import screenPass from '../assets/Air-ticket/fScreen-6.png'
import screenProfile from '../assets/Air-ticket/fScreen-7.png'
import screenNotifications from '../assets/Air-ticket/fScreen-8.png'

const TAGS = ['UI/UX Design', 'Mobile App', 'Figma', 'Proof of Concept']

const META = [
  { label: 'Role', value: 'UI/UX Design' },
  { label: 'Type', value: 'Mobile App · Proof of Concept' },
  { label: 'Platform', value: 'iOS & Android' },
  { label: 'Year', value: '2024' },
]

/**
 * Each booked screen, mapped to the job it does in the flow.
 * gate/time/status dress the flow up as a departures board — the page's motif.
 * tone drives the status colour: go (cyan) · warn (amber) · dim (muted).
 */
const SCREENS = [
  {
    src: screenOnboarding,
    num: '01',
    eyebrow: 'Onboarding',
    title: 'Welcome & Get Started',
    body: 'The first impression — a bold illustration and a single “Get Started” call to action. One clear next step, no clutter, so a new traveller knows exactly where to tap.',
    gate: 'A12',
    time: '09:24',
    status: 'Boarding',
    tone: 'warn',
  },
  {
    src: screenHome,
    num: '02',
    eyebrow: 'Home · Search',
    title: 'Search your flight',
    body: 'A personalised greeting sits above the core search card: From / To, departure and return dates, and passenger count. Upcoming flights live just below, so the whole booking starts on one screen.',
    gate: 'A14',
    time: '09:40',
    status: 'On Time',
    tone: 'go',
  },
  {
    src: screenTickets,
    num: '03',
    eyebrow: 'Results · My Ticket',
    title: 'Browse available flights',
    body: 'Search returns a scannable list of flights — airline, route, duration and price laid out the same way every time, so comparing options takes a glance, not effort.',
    gate: 'B03',
    time: '10:05',
    status: 'Gate Open',
    tone: 'go',
  },
  {
    src: screenSeat,
    num: '04',
    eyebrow: 'Seat selection',
    title: 'Pick your seat',
    body: 'An interactive seat map with a clear legend — selected, available, unavailable. Class is collapsible and the chosen seats stay highlighted, turning a fiddly step into a simple tap-to-pick.',
    gate: 'B07',
    time: '10:20',
    status: 'Seat Map',
    tone: 'go',
  },
  {
    src: screenPayment,
    num: '05',
    eyebrow: 'Checkout',
    title: 'Payment method',
    body: 'Saved cards, an “Add new method” option, and a transparent fare breakdown — adults, children, tax and total — so the traveller sees exactly what they pay before hitting Pay Now.',
    gate: 'C21',
    time: '10:55',
    status: 'Final Call',
    tone: 'warn',
  },
  {
    src: screenPass,
    num: '06',
    eyebrow: 'Boarding',
    title: 'Booking pass',
    body: 'The digital boarding pass: passenger, route, departure / arrival, seat, terminal and gate, plus a scannable barcode and a Download Ticket button to keep it offline.',
    gate: 'C24',
    time: '11:30',
    status: 'Departed',
    tone: 'dim',
  },
  {
    src: screenProfile,
    num: '07',
    eyebrow: 'Account',
    title: 'Profile & settings',
    body: 'Everything personal in one place — payment methods, language, a dark-theme toggle and a help centre — with a clean settings/support split and a logout at the bottom.',
    gate: 'D02',
    time: '12:10',
    status: 'On Time',
    tone: 'go',
  },
  {
    src: screenNotifications,
    num: '08',
    eyebrow: 'Engagement',
    title: 'Notifications',
    body: 'An activity feed grouped by Today / Yesterday — booking confirmations alongside fare deals — so the traveller stays in the loop without digging through email.',
    gate: 'D09',
    time: '12:45',
    status: 'Scheduled',
    tone: 'dim',
  },
]

/**
 * The annotated callouts per screen — short notes on the key actions and
 * elements, pointed at the phone (like the reference case-study breakdowns).
 */
const ACTIONS: Record<string, string[]> = {
  '01': [
    'A bold hero illustration sets the travel tone the moment the app opens.',
    'One “Get Started” button — a single, obvious next step with zero clutter.',
  ],
  '02': [
    'From / To, dates and passenger count all live on one search card.',
    'A personalised greeting anchors the top so the screen feels yours.',
    'Upcoming flights sit just below, so booking starts without a tap.',
  ],
  '03': [
    'Every row shows airline, route, duration and price in the same order.',
    'Identical layout each time makes comparing flights a glance, not a task.',
  ],
  '04': [
    'An interactive seat map with a clear selected / available / taken legend.',
    'Chosen seats stay highlighted so you never lose your place.',
    'Class sections collapse to keep the map calm and readable.',
  ],
  '05': [
    'Saved cards plus a clear “Add new method” option.',
    'A transparent fare breakdown — adults, children, tax, total — before Pay Now.',
  ],
  '06': [
    'A full digital boarding pass: passenger, route, seat, terminal and gate.',
    'A scannable barcode and a Download Ticket action to keep it offline.',
  ],
  '07': [
    'Payment, language, a dark-theme toggle and a help centre — every setting in one place.',
    'A clear Logout sits on its own at the very bottom, away from everything else.',
  ],
  '08': [
    'An activity feed grouped by Today / Yesterday.',
    'Booking confirmations sit alongside fare deals, so nothing is missed.',
  ],
}

/**
 * The region each callout frames, as % of the phone image
 * (left, top, width, height). A dashed box outlines the element so the
 * data stays visible. Order matches ACTIONS[num] — box 1 ↔ note 1.
 */
type Box = { left: number; top: number; width: number; height: number }
const BOXES: Record<string, Box[]> = {
  '01': [
    { left: 11, top: 25, width: 70, height: 18 }, // hero illustration
    { left: 9.5, top: 83.5, width: 81, height: 7 }, // Get Started button
  ],
  '02': [
    { left: 8, top: 34, width: 84, height: 41 }, // search card
    { left: 10, top: 11, width: 34, height: 7 }, // greeting
    { left: 8, top: 76, width: 84, height: 10 }, // upcoming flights
  ],
  '03': [
    { left: 8, top: 32.5, width: 84, height: 14 }, // first flight row
    { left: 8, top: 49, width: 84, height: 14 }, // repeated rows
  ],
  '04': [
    { left: 7, top: 18, width: 86, height: 6 }, // legend
    { left: 12.5, top: 43, width: 16, height: 9.5 }, // a highlighted seat
    { left: 7, top: 26.5, width: 86, height: 6 }, // collapse header
  ],
  '05': [
    { left: 8, top: 31, width: 84, height: 27 }, // saved cards / add new
    { left: 8, top: 62, width: 84, height: 17 }, // fare breakdown
  ],
  '06': [
    { left: 8, top: 21, width: 84, height: 37 }, // boarding pass card
    { left: 8, top: 60.5, width: 84, height: 18 }, // barcode card
  ],
  '07': [
    { left: 7, top: 44, width: 86, height: 29 }, // settings list
    { left: 8, top: 84.5, width: 84, height: 7 }, // logout
  ],
  '08': [
    { left: 7.5, top: 20, width: 16, height: 5 }, // Today / Yesterday grouping
    { left: 8, top: 38.5, width: 84, height: 15 }, // a notification card
  ],
}

/** A phone screenshot (the device frame is baked in) with dashed callout boxes. */
function PhoneShot({
  src,
  alt,
  boxes = [],
}: {
  src: string
  alt: string
  boxes?: Box[]
}) {
  return (
    <div className="pf-atPhone">
      <div className="pf-atPhoneInner">
        <img className="pf-atPhoneImg" src={src} alt={alt} loading="lazy" />
        {boxes.map((b, i) => (
          <span
            className="pf-atBox"
            key={i}
            style={{
              left: `${b.left}%`,
              top: `${b.top}%`,
              width: `${b.width}%`,
              height: `${b.height}%`,
            }}
            aria-hidden="true"
          >
            <span className="pf-atBoxNum">{i + 1}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export function AirTicketCaseStudy() {
  const rootRef = useRef<HTMLElement>(null)

  // Back navigation follows where the case study was opened from.
  // Deep-links / direct visits (no state) fall back to Work.
  const location = useLocation()
  const origin = location.state as { from?: string; fromLabel?: string } | null
  const backTo = origin?.from ?? '/work'
  const backLabel = origin?.fromLabel ?? 'Work'

  // Scroll reveal — progressive enhancement. Content is visible by default;
  // we only enable the hide-then-fade-in behaviour once JS confirms support.
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
    <main className="pf-cs pf-dep" ref={rootRef}>
      {/* ===================== HERO ===================== */}
      <header className="pf-csHero">
        <div className="pf-csHeroInner">
          <Link to={backTo} className="pf-csBack">
            ← {backLabel}
          </Link>
          <div className="pf-depTicker" aria-hidden="true">
            <span className="pf-depTickerDot" />
            Now departing · Gate A12 · On time
          </div>
          <ul className="pf-csTags" aria-label="Disciplines and tools">
            {TAGS.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <h1 className="pf-csTitle">Air Ticket</h1>
          <p className="pf-csLede">
            A proof-of-concept flight-booking app for mobile — built for both
            iOS and Android. Eight key screens explore the core booking idea,
            from first launch to boarding pass: search, seat, payment and
            check-in.
          </p>
          <p className="pf-csRole">
            A UI/UX proof of concept — I designed the screens and visual system
            in Figma as a complete, polished design, for both iOS and Android.
          </p>
          <div className="pf-csMetaRow">
            {META.map((m) => (
              <div className="pf-csMetaItem" key={m.label}>
                <span className="pf-csMetaLabel">{m.label}</span>
                <span className="pf-csMetaValue">{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ===================== OVERVIEW ===================== */}
      <section className="pf-csChapter pf-csChapter--center">
        <p className="pf-csOverview pf-reveal">
          Booking a flight should feel like one calm journey, not a dozen
          disconnected forms.{' '}
          <span>Each screen does exactly one job</span> — and hands you cleanly
          to the next.
        </p>
      </section>

      {/* ===================== SCREEN-BY-SCREEN (annotated) ===================== */}
      <section className="pf-csChapter">
        <div className="pf-csChapterHead pf-reveal">
          <span className="pf-csEyebrow">Now boarding, screen by screen</span>
          <h2 className="pf-csH2">
            The key screens, and the role each plays in the booking flow.
          </h2>
        </div>

        <div className="pf-atFlow">
          {SCREENS.map((s) => (
            <article className="pf-atItem pf-reveal" key={s.num}>
              <PhoneShot
                src={s.src}
                alt={`Air Ticket — ${s.title}`}
                boxes={BOXES[s.num] ?? []}
              />
              <div className="pf-atItemText">
                <div className="pf-depTag">
                  <span className="pf-depFlap">{s.num}</span>
                  <span className="pf-depTagCode">
                    AT{s.num} · Gate {s.gate}
                  </span>
                </div>
                <span className="pf-csEyebrow">{s.eyebrow}</span>
                <h3 className="pf-csH3">{s.title}</h3>
                <p className="pf-csBody">{s.body}</p>
                <ul className="pf-depAnnos">
                  {(ACTIONS[s.num] ?? []).map((a, i) => (
                    <li className="pf-depAnno" key={i}>
                      <span className="pf-depAnnoNum">{i + 1}</span>
                      <span className="pf-depAnnoText">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="pf-csImpact">
        <Link to={backTo} className="pf-csBackBig pf-reveal">
          ← Back to {backLabel}
        </Link>
      </section>
    </main>
  )
}

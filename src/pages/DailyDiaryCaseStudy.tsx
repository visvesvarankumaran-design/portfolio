import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ContactCtaFooter } from '../components/ContactCtaFooter'
import screenDiary from '../assets/Daily-Diary/daily_diary-01.png'
import screenHighlight from '../assets/Daily-Diary/daily_diary-02.png'
import screenVision from '../assets/Daily-Diary/daily_diary-03-crop.png'
import screenStreak from '../assets/Daily-Diary/daily_diary-04.png'

const TAGS = ['UI/UX', 'Product Design', 'Concept', 'Web App']

const META = [
  { label: 'Discipline', value: 'UI / UX Design' },
  { label: 'Type', value: 'Self-initiated concept' },
  { label: 'Platform', value: 'Web' },
  { label: 'Year', value: '2026' },
]

/** Each screen mapped to the idea it carries in the product. */
const SCREENS = [
  {
    src: screenDiary,
    num: '01',
    eyebrow: 'The Diary',
    title: 'A page that feels like paper',
    body: 'The heart of the app is a two-page spread lifted straight from a real notebook. The left page holds the day’s context — a big serif date, a mood chip and the weather; the right is ruled paper with a spiral binding where the entry is written in a handwriting typeface. It reads as a diary, not a text box.',
    notes: [
      'Mood and weather chips capture how the day felt, not just what happened.',
      'A polaroid photo with a “tap to shuffle” caption ties a memory to the words.',
      'Ruled paper, spiral rings and handwriting type make the page feel physical.',
    ],
  },
  {
    src: screenHighlight,
    num: '02',
    eyebrow: 'Make it yours',
    title: 'Highlight what matters',
    body: 'Writing shouldn’t be flat. An inline highlighter marks the lines that matter in soft pastel colours, emoji drop straight into the text, and the photo caption is pulled from the entry itself — small touches that turn a log into something expressive and personal.',
    notes: [
      'Multi-colour highlights add emphasis and emotion to key lines.',
      'Inline emoji and image attachments keep entries lively.',
      'The photo caption echoes a line from the entry, tying words and image together.',
    ],
  },
  {
    src: screenVision,
    num: '03',
    eyebrow: 'Vision Board',
    title: 'A canvas for dreams',
    body: 'Beyond the daily page, a freeform Vision Board gives dreams a place to live. It’s an open canvas where you pin photos, drop sticky-note affirmations and sketch, with a light tool rail for select, draw, erase and image. The diary looks back; the vision board looks forward.',
    notes: [
      'An infinite, draggable canvas — arrange photos and notes anywhere.',
      'Sticky-note affirmations like “Dream Big” keep intentions in view.',
      'A minimal tool rail: select, pen, eraser and add-image.',
    ],
  },
  {
    src: screenStreak,
    num: '04',
    eyebrow: 'Streak & Progress',
    title: 'Turning a habit into a game',
    body: 'Consistency is the hard part of journaling, so it gets its own home. A Streak & Progress dashboard turns the habit into a game — a GitHub-style activity calendar, current and longest streaks, total entries, and milestone badges from “First Entry” all the way to “Year Champion.”',
    notes: [
      'A contribution-style heatmap shows the writing habit at a glance.',
      'Current streak, best streak and total entries sit up top as quick wins.',
      'Milestones with progress bars give a reason to come back tomorrow.',
    ],
  },
]

/** The roadmap — led by the real next chapter: a shared diary for two. */
const NEXT: { k: string; v: string; lead?: boolean }[] = [
  {
    lead: true,
    k: 'A shared diary for two',
    v: 'The next chapter: two linked accounts writing in one private diary — partners, close friends or family passing a real diary back and forth, day by day. Journaling becomes something you do together.',
  },
  {
    k: 'Accounts & cloud sync',
    v: 'Secure sign-in so entries stay private, backed up, and available on every device.',
  },
  {
    k: 'Daily reminders',
    v: 'Gentle, well-timed nudges — a streak only works if the app helps you show up.',
  },
  {
    k: 'A native mobile app',
    v: 'Journaling happens at bedtime on a phone; the web POC would follow onto iOS and Android.',
  },
  {
    k: 'Privacy & lock',
    v: 'A diary is personal — a passcode / biometric lock and private-by-default storage.',
  },
]

export function DailyDiaryCaseStudy() {
  const rootRef = useRef<HTMLElement>(null)

  // Back navigation follows where the case study was opened from.
  const location = useLocation()
  const origin = location.state as { from?: string; fromLabel?: string } | null
  const backTo = origin?.from ?? '/work'
  const backLabel = origin?.fromLabel ?? 'Work'

  // Scroll reveal — visible by default; enhanced once JS confirms support.
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
          if (entry.isIntersecting || entry.boundingClientRect.top < 1) {
            entry.target.classList.add('is-in')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px' },
    )
    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <main className="pf-cs pf-dd" ref={rootRef}>
      {/* ===================== HERO ===================== */}
      <header className="pf-csHero">
        <div className="pf-csHeroInner">
          <Link to={backTo} className="pf-csBack">
            ← {backLabel}
          </Link>
          <div className="pf-ddRibbon" aria-hidden="true">
            <span className="pf-ddRibbonDot" />
            Dear Diary,
          </div>
          <ul className="pf-csTags" aria-label="Disciplines and tools">
            {TAGS.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <h1 className="pf-csTitle">Daily Diary</h1>
          <p className="pf-csLede">
            A self-initiated concept for a journaling habit that actually
            sticks — the warmth of a real paper diary, plus the one thing paper
            can’t do: gently keep you coming back. I took it from Figma screens
            through to a small working web POC.
          </p>
          <p className="pf-csRole">
            A solo project, end to end — UX flows and UI in Figma, then a
            front-end POC to prove the feel in the browser. No client and no
            brief; just an exploration of what a modern, emotional journaling
            product could be.
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
          A diary you actually want to return to —{' '}
          <span>personal, tactile, and a little rewarding</span> every time you
          write.
        </p>
      </section>

      {/* ===================== THE IDEA ===================== */}
      <section className="pf-csChapter">
        <div className="pf-csChapterHead pf-reveal">
          <span className="pf-csEyebrow">The idea</span>
          <h2 className="pf-csH2">Make journaling warm — and worth repeating.</h2>
        </div>
        <p className="pf-csBody pf-csBody--lead pf-reveal">
          Paper diaries are personal and calm, but they don’t remind you and they
          don’t show progress. Note apps are the opposite — efficient, but cold.
          Daily Diary sits in between: a page that looks and feels like a real
          diary — date, mood, weather, a polaroid, handwriting on ruled paper —
          wrapped in streaks and milestones that make writing every day feel
          earned.
        </p>
      </section>

      {/* ===================== SCREEN-BY-SCREEN ===================== */}
      <section className="pf-csChapter">
        <div className="pf-csChapterHead pf-reveal">
          <span className="pf-csEyebrow">Inside the concept</span>
          <h2 className="pf-csH2">
            Four ideas that make writing every day feel good.
          </h2>
        </div>

        <div className="pf-ddFlow">
          {SCREENS.map((s) => (
            <article className="pf-ddItem pf-reveal" key={s.num}>
              <figure className="pf-ddShot">
                <div className="pf-ddShotBar" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <img
                  className="pf-ddShotImg"
                  src={s.src}
                  alt={`Daily Diary — ${s.title}`}
                  loading="lazy"
                />
              </figure>
              <div className="pf-ddItemText">
                <div className="pf-ddItemLede">
                  <div className="pf-ddKicker">
                    <span className="pf-ddNum">{s.num}</span>
                    <span className="pf-csEyebrow">{s.eyebrow}</span>
                  </div>
                  <h3 className="pf-csH3">{s.title}</h3>
                  <p className="pf-csBody">{s.body}</p>
                </div>
                <ul className="pf-ddNotes">
                  {s.notes.map((a, i) => (
                    <li className="pf-ddNote" key={i}>
                      <span className="pf-ddNoteDot" aria-hidden="true" />
                      <span className="pf-ddNoteText">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ===================== WHAT'S NEXT ===================== */}
      <section className="pf-csChapter">
        <div className="pf-csChapterHead pf-reveal">
          <span className="pf-csEyebrow">What’s next</span>
          <h2 className="pf-csH2">One diary, two people.</h2>
        </div>
        <p className="pf-csBody pf-csBody--lead pf-reveal">
          The feel is proven in the POC. The next chapter turns Daily Diary from
          a solo habit into a shared one — a private space two people write in
          together.
        </p>
        <div className="pf-ddNext">
          {NEXT.map((r) => (
            <div
              className={`pf-ddNextCard${r.lead ? ' pf-ddNextCard--lead' : ''} pf-reveal`}
              key={r.k}
            >
              <h3 className="pf-ddNextTitle">{r.k}</h3>
              <p className="pf-csBody">{r.v}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pf-csImpact">
        <Link to={backTo} className="pf-csBackBig pf-reveal">
          ← Back to {backLabel}
        </Link>
      </section>

      {/* ===================== CONTACT ===================== */}
      <ContactCtaFooter />
    </main>
  )
}

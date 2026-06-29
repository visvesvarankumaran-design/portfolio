import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

type Project = {
  id: string
  title: string
  meta: string
  /** Internal case-study route. Omit for a not-yet-linked project. */
  to?: string
  /** 'bitesplit'/'carepay' use branded covers; 'soon' is a placeholder slot. */
  variant: 'bitesplit' | 'carepay' | 'soon'
}

/**
 * Add a new project by appending an entry here.
 * For a fully custom cover, add a new `variant` and a matching block in <Cover/>.
 */
const PROJECTS: Project[] = [
  {
    id: 'bitesplit',
    title: 'BiteSplit',
    meta: 'UI /UX | Web App',
    to: '/work/bitesplit',
    variant: 'bitesplit',
  },
  {
    id: 'carepay',
    title: 'CarePay',
    meta: 'Product / Systems | Web App',
    to: '/work/carepay',
    variant: 'carepay',
  },
]

function Cover({ project }: { project: Project }) {
  if (project.variant === 'bitesplit') {
    return (
      <div
        className="pf-caseImage pf-caseImage--bitesplit"
        role="img"
        aria-label="BiteSplit — group ordering made effortless"
      >
        <div className="pf-bsCover">
          <span className="pf-bsBadge" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </span>
          <span className="pf-bsWordmark">BiteSplit</span>
          <span className="pf-bsRule" aria-hidden="true" />
          <span className="pf-bsTagline">Group ordering made effortless.</span>
        </div>
      </div>
    )
  }
  if (project.variant === 'carepay') {
    return (
      <div
        className="pf-caseImage pf-caseImage--carepay"
        role="img"
        aria-label="CarePay — schema-driven clinical fee automation"
      >
        <div className="pf-cpCover">
          <span className="pf-cpCoverBadge" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 3v18h18" />
              <path d="M7 14l3-4 3 3 4-6" />
            </svg>
          </span>
          <span className="pf-cpCoverWordmark">CarePay</span>
          <span className="pf-cpCoverRule" aria-hidden="true" />
          <span className="pf-cpCoverTagline">
            Tiered doctor payouts, computed to the rupee.
          </span>
        </div>
      </div>
    )
  }
  return (
    <div
      className="pf-caseImage pf-caseImage--soon"
      role="img"
      aria-label="Next project coming soon"
    >
      <span className="pf-soonText">
        Next project
        <br />
        in the works
      </span>
    </div>
  )
}

export function ProjectShowcase({
  from,
  fromLabel,
  workEnd = false,
}: {
  from: string
  fromLabel: string
  workEnd?: boolean
}) {
  const [index, setIndex] = useState(0)
  const n = PROJECTS.length
  const hovering = useRef(false)

  // Auto-advance right-to-left; pauses on hover and for reduced-motion users.
  useEffect(() => {
    if (n <= 1) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => {
      if (!hovering.current) setIndex((i) => (i + 1) % n)
    }, 5500)
    return () => window.clearInterval(id)
  }, [n])

  const go = (i: number) => setIndex((i + n) % n)

  return (
    <div
      className={`pf-projects${workEnd ? ' pf-projects--workEnd' : ''}`}
      onMouseEnter={() => {
        hovering.current = true
      }}
      onMouseLeave={() => {
        hovering.current = false
      }}
      aria-roledescription="carousel"
      aria-label="Selected projects"
    >
      <div className="pf-projectsViewport">
        <div
          className="pf-projectsTrack"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {PROJECTS.map((p, i) => {
            const card = (
              <>
                <Cover project={p} />
                <div className="pf-caseFooter">
                  <div className="pf-caseTitle">{p.title}</div>
                  <div className="pf-caseMeta">{p.meta}</div>
                </div>
              </>
            )
            return (
              <div
                className="pf-projectsSlide"
                key={p.id}
                aria-hidden={i !== index}
              >
                {p.to ? (
                  <Link
                    className="pf-case pf-case--link"
                    to={p.to}
                    state={{ from, fromLabel }}
                    aria-label={`Open ${p.title} case study`}
                    tabIndex={i === index ? 0 : -1}
                  >
                    {card}
                  </Link>
                ) : (
                  <div className="pf-case pf-case--static">{card}</div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {n > 1 ? (
        <div className="pf-projectsNav">
          <button
            type="button"
            className="pf-projectsArrow"
            aria-label="Previous project"
            onClick={() => go(index - 1)}
          >
            ‹
          </button>
          <div className="pf-projectsDots" role="tablist">
            {PROJECTS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                className={`pf-projectsDot${i === index ? ' is-active' : ''}`}
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to ${p.title}`}
                onClick={() => go(i)}
              />
            ))}
          </div>
          <button
            type="button"
            className="pf-projectsArrow"
            aria-label="Next project"
            onClick={() => go(index + 1)}
          >
            ›
          </button>
        </div>
      ) : null}
    </div>
  )
}

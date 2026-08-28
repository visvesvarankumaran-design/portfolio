import { useCallback, useEffect, useRef, useState } from 'react'
import type { PointerEvent as RPointerEvent } from 'react'
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
    id: 'carepay',
    title: 'Doctor Payroll System',
    meta: 'UI/UX · Systems Design | Web App',
    to: '/work/carepay',
    variant: 'carepay',
  },
  {
    id: 'bitesplit',
    title: 'BiteSplit',
    meta: 'UI/UX · Passion Project | Web App',
    to: '/work/bitesplit',
    variant: 'bitesplit',
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
        aria-label="Doctor Payroll System — schema-driven clinical fee automation"
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
          <span className="pf-cpCoverWordmark">Doctor Payroll System</span>
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
  const [drag, setDrag] = useState(0)
  const [dragging, setDragging] = useState(false)
  const n = PROJECTS.length

  // Drag/swipe state kept in refs so the fast pointer stream never reads stale
  // React state. No auto-advance — the carousel only moves on user intent.
  const viewportRef = useRef<HTMLDivElement>(null)
  const startX = useRef(0)
  const startTime = useRef(0)
  const dragRef = useRef(0)
  const movedRef = useRef(false)
  const widthRef = useRef(1)
  const draggingRef = useRef(false)
  const wheelCooldown = useRef(0)

  const go = (i: number) => setIndex((i + n) % n)

  // Keep the live index readable inside window listeners without re-binding them.
  const indexRef = useRef(0)
  indexRef.current = index

  // Move/up are bound to `window` during a drag (not the element), so the drag
  // keeps tracking even if the pointer leaves the card — the reliable slider
  // pattern. Stable identities so add/removeEventListener always match.
  const handleMove = useCallback(
    (e: PointerEvent) => {
      if (!draggingRef.current) return
      let dx = e.clientX - startX.current
      if (Math.abs(dx) > 6) movedRef.current = true
      const idx = indexRef.current
      if ((idx === 0 && dx > 0) || (idx === n - 1 && dx < 0)) dx *= 0.35
      dragRef.current = dx
      setDrag(dx)
    },
    [n],
  )

  const handleUp = useCallback(() => {
    if (!draggingRef.current) return
    draggingRef.current = false
    setDragging(false)
    const dx = dragRef.current
    const dist = Math.abs(dx)
    const dt = Math.max(performance.now() - startTime.current, 1)
    // advance on a decent drag (12% of the width) OR a quick flick
    const flick = dist > 40 && dist / dt > 0.5
    const passed = dist > widthRef.current * 0.12 || flick
    if (passed && dx < 0) setIndex((i) => (i + 1) % n)
    else if (passed && dx > 0) setIndex((i) => (i - 1 + n) % n)
    dragRef.current = 0
    setDrag(0)
    window.removeEventListener('pointermove', handleMove)
    window.removeEventListener('pointerup', handleUp)
    window.removeEventListener('pointercancel', handleUp)
  }, [n, handleMove])

  const onPointerDown = (e: RPointerEvent<HTMLDivElement>) => {
    if (n <= 1) return
    if (e.pointerType === 'mouse' && e.button !== 0) return
    startX.current = e.clientX
    startTime.current = performance.now()
    dragRef.current = 0
    movedRef.current = false
    widthRef.current = viewportRef.current?.offsetWidth || 1
    draggingRef.current = true
    setDragging(true)
    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerup', handleUp)
    window.addEventListener('pointercancel', handleUp)
  }

  // Safety: drop listeners if the component unmounts mid-drag.
  useEffect(
    () => () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerup', handleUp)
      window.removeEventListener('pointercancel', handleUp)
    },
    [handleMove, handleUp],
  )

  // Trackpad / horizontal-wheel scroll → move between projects. Native listener
  // with passive:false so we can preventDefault (stops the browser back/forward
  // swipe). Vertical scrolling is ignored so the page still scrolls normally.
  useEffect(() => {
    const el = viewportRef.current
    if (!el || n <= 1) return
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
      e.preventDefault()
      if (Math.abs(e.deltaX) < 12) return
      const now = performance.now()
      if (now < wheelCooldown.current) return
      if (e.deltaX > 0) setIndex((i) => (i + 1) % n)
      else setIndex((i) => (i - 1 + n) % n)
      wheelCooldown.current = now + 450
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [n])

  return (
    <div
      className={`pf-projects${workEnd ? ' pf-projects--workEnd' : ''}`}
      aria-roledescription="carousel"
      aria-label="Selected projects"
    >
      <div
        className={`pf-projectsViewport${dragging ? ' is-dragging' : ''}`}
        ref={viewportRef}
        onPointerDown={onPointerDown}
      >
        <div
          className="pf-projectsTrack"
          style={{
            transform: `translateX(calc(${-index * 100}% + ${drag}px))`,
            transition: dragging ? 'none' : undefined,
          }}
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
                    draggable={false}
                    onClickCapture={(e) => {
                      // A drag ends in a click — swallow it so swiping never
                      // opens the case study.
                      if (movedRef.current) {
                        e.preventDefault()
                        e.stopPropagation()
                      }
                    }}
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
        </div>
      ) : null}
    </div>
  )
}

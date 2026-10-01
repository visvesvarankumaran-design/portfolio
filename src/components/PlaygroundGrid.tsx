import { useState, useEffect, useCallback, useRef } from 'react'
import type { CSSProperties, MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import profilePhoto from '../assets/about-section/profile.jpg'
import smartHomeScreen from '../assets/Pixel_Playground/Remot-out (6).png'
import energyDashboard from '../assets/Pixel_Playground/Main Dashboard.png'
import energyUsage from '../assets/Pixel_Playground/Usage Breakdown.png'
import sneakerWelcome from '../assets/Pixel_Playground/Frame 81.png'
import colorPalette from '../assets/Pixel_Playground/colors-palette.png'

interface PlaygroundPost {
  id: string
  title: string
  /** Two short lines — what the screen is and the one idea behind it. */
  description: string
  tags: string[]
  /** One or more screens; several become a swipeable post. Empty = placeholder. */
  images: string[]
  /** 'web' screens open wider and scroll inside the post; default is mobile. */
  kind?: 'mobile' | 'web'
}

/**
 * UI screens shown as LinkedIn-style posts.
 * Add a screen: import the image above and replace a placeholder below.
 */
const PLAYGROUND_POSTS: PlaygroundPost[] = [
  {
    id: 'smart-home',
    title: 'Smart Home Dashboard',
    description:
      'Every room’s devices one tap away — local weather up top, quick on/off toggles below.',
    tags: ['DailyUI', 'MobileUI', 'SmartHome'],
    images: [smartHomeScreen],
  },
  {
    id: 'energy-hub',
    title: 'Energy Hub — Home Energy Monitor',
    description:
      'A calm view of home power — live load, top consumers and a room-by-room breakdown.',
    tags: ['DailyUI', 'WebUI', 'Dashboard'],
    images: [energyDashboard, energyUsage],
    kind: 'web',
  },
  {
    id: 'sneaker-welcome',
    title: 'Sneaker Store — Welcome Screen',
    description:
      'A bold first screen for a shoe store — the product floats centre stage, with one clear Get started.',
    tags: ['DailyUI', 'MobileUI', 'Ecommerce'],
    images: [sneakerWelcome],
  },
  {
    id: 'color-system',
    title: 'Design System — Colour Palette',
    description:
      'A six-scale colour system — each shade mapped to its role, with contrast checked.',
    tags: ['DesignSystem', 'Colors', 'UI'],
    images: [colorPalette],
    kind: 'web',
  },
]

const d = (ms: number) => ({ ['--rvd']: `${ms}ms` }) as CSSProperties

const dayLabel = (i: number) => `Daily UI · ${String(i + 1).padStart(2, '0')}`

function PostHeader({ index }: { index: number }) {
  return (
    <header className="pf-post__head">
      <img className="pf-post__avatar" src={profilePhoto} alt="" />
      <div className="pf-post__who">
        <span className="pf-post__name">Visvesvaran K</span>
        <span className="pf-post__sub">UI/UX Designer · {dayLabel(index)}</span>
      </div>
    </header>
  )
}

function PostText({
  post,
  titleId,
}: {
  post: PlaygroundPost
  titleId?: string
}) {
  return (
    <div className="pf-post__text">
      <h3 id={titleId} className="pf-post__title">
        {post.title}
      </h3>
      <p className="pf-post__desc">{post.description}</p>
    </div>
  )
}

function PostTags({ tags }: { tags: string[] }) {
  return (
    <ul className="pf-post__tags">
      {tags.map((t) => (
        <li key={t}>#{t}</li>
      ))}
    </ul>
  )
}

/**
 * The post image area. With several images it becomes a small slider
 * (arrows, dots, "1 / 2" counter) — arrow clicks never open the post.
 */
function PostMedia({
  post,
  slide,
  onSlide,
  className = '',
}: {
  post: PlaygroundPost
  slide: number
  onSlide: (i: number) => void
  className?: string
}) {
  const n = post.images.length
  const step = (e: MouseEvent, delta: number) => {
    e.stopPropagation()
    onSlide((slide + delta + n) % n)
  }

  return (
    <div
      className={`pf-post__media${post.kind === 'web' ? ' pf-post__media--web' : ''} ${className}`}
    >
      {/* Frame holds the image; in the web lightbox it's the scroller, so the
          arrows/dots (its siblings) stay put while a tall page scrolls. */}
      <div className="pf-post__frame">
        {n === 0 ? (
          <span className="pf-post__soon">Coming soon</span>
        ) : (
          <img
            key={post.images[slide]}
            src={post.images[slide]}
            alt={
              n > 1 ? `${post.title} — screen ${slide + 1} of ${n}` : post.title
            }
            loading="lazy"
          />
        )}
      </div>

      {n > 1 ? (
        <>
          <span className="pf-post__count">
            {slide + 1} / {n}
          </span>
          <button
            type="button"
            className="pf-post__arrow pf-post__arrow--prev"
            aria-label="Previous screen"
            onClick={(e) => step(e, -1)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            className="pf-post__arrow pf-post__arrow--next"
            aria-label="Next screen"
            onClick={(e) => step(e, 1)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <div className="pf-post__dots">
            {post.images.map((img, i) => (
              <button
                key={img}
                type="button"
                className={`pf-post__dot${i === slide ? ' is-active' : ''}`}
                aria-label={`Show screen ${i + 1}`}
                aria-current={i === slide}
                onClick={(e) => {
                  e.stopPropagation()
                  onSlide(i)
                }}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}

export function PlaygroundGrid() {
  // Current slide per post (only matters for multi-image posts).
  const [slides, setSlides] = useState<Record<string, number>>({})
  const [open, setOpen] = useState<{ index: number; slide: number } | null>(
    null,
  )

  const slideOf = (id: string) => slides[id] ?? 0
  const setSlide = (id: string, i: number) =>
    setSlides((s) => ({ ...s, [id]: i }))

  const openPost = (index: number) => {
    const post = PLAYGROUND_POSTS[index]
    if (post.images.length) setOpen({ index, slide: slideOf(post.id) })
  }

  const closePost = useCallback(() => {
    setOpen(null)
  }, [])

  // Lock page scroll while the post is open; restore on close/unmount.
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        closePost()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, closePost])

  const openPostData = open ? PLAYGROUND_POSTS[open.index] : null

  // Card carousel: a native scroll-snap track, so touch swipe and trackpad
  // work for free; the arrows just scroll it by one card.
  const trackRef = useRef<HTMLDivElement>(null)
  const [edges, setEdges] = useState({ start: true, end: false })

  const updateEdges = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setEdges({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    })
  }, [])

  useEffect(() => {
    updateEdges()
    window.addEventListener('resize', updateEdges)
    return () => window.removeEventListener('resize', updateEdges)
  }, [updateEdges])

  const scrollCards = (dir: 1 | -1) => {
    const el = trackRef.current
    const card = el?.querySelector<HTMLElement>('.pf-post')
    if (!el || !card) return
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: 'smooth' })
  }

  return (
    <>
      <div className="pf-playCarousel pf-reveal" style={d(240)}>
        <div
          className="pf-playGrid"
          ref={trackRef}
          onScroll={updateEdges}
          aria-label="Playground screens"
        >
          {PLAYGROUND_POSTS.map((post, idx) => {
            const clickable = post.images.length > 0
            return (
              <article
                key={post.id}
                className={`pf-post pf-reveal${clickable ? ' pf-post--clickable' : ' pf-post--empty'}`}
                style={d(280 + idx * 80)}
                onClick={() => openPost(idx)}
                role={clickable ? 'button' : undefined}
                tabIndex={clickable ? 0 : undefined}
                aria-label={clickable ? `Open ${post.title}` : undefined}
                onKeyDown={(e) => {
                  if (
                    clickable &&
                    e.target === e.currentTarget &&
                    (e.key === 'Enter' || e.key === ' ')
                  ) {
                    e.preventDefault()
                    openPost(idx)
                  }
                }}
              >
                <PostHeader index={idx} />
                <PostText post={post} />
                <PostMedia
                  post={post}
                  slide={slideOf(post.id)}
                  onSlide={(i) => setSlide(post.id, i)}
                />
                <PostTags tags={post.tags} />
              </article>
            )
          })}
        </div>
        {edges.start && edges.end ? null : (
          <div className="pf-playNav">
            <button
              type="button"
              className="pf-playNav__btn"
              aria-label="Previous screens"
              disabled={edges.start}
              onClick={() => scrollCards(-1)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              className="pf-playNav__btn"
              aria-label="Next screens"
              disabled={edges.end}
              onClick={() => scrollCards(1)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Portalled to <body> so no animated ancestor can trap it under the header */}
      {open &&
        openPostData &&
        createPortal(
          <div className="pf-lightbox" onClick={closePost}>
            <div
              className={`pf-lightbox__content pf-post${openPostData.kind === 'web' ? ' pf-lightbox__content--web' : ''}`}
              role="dialog"
              aria-modal="true"
              aria-labelledby="pf-post-title"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="pf-lightbox__close"
                aria-label="Close"
                onClick={closePost}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
              <PostHeader index={open.index} />
              <PostText post={openPostData} titleId="pf-post-title" />
              <PostMedia
                post={openPostData}
                slide={open.slide}
                onSlide={(i) => {
                  setOpen({ ...open, slide: i })
                  setSlide(openPostData.id, i)
                }}
                className="pf-lightbox__media"
              />
              <PostTags tags={openPostData.tags} />
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}

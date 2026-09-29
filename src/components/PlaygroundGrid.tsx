import { useState, useEffect, useCallback } from 'react'
import type { CSSProperties } from 'react'

interface PlaygroundCard {
  id: string
  title: string
  image: string | null
}

const PLAYGROUND_ITEMS: PlaygroundCard[] = [
  {
    id: 'placeholder-1',
    title: 'Coming Soon',
    image: null,
  },
  {
    id: 'placeholder-2',
    title: 'Coming Soon',
    image: null,
  },
  {
    id: 'placeholder-3',
    title: 'Coming Soon',
    image: null,
  },
]

const d = (ms: number) => ({ ['--rvd']: `${ms}ms` }) as CSSProperties

export function PlaygroundGrid() {
  const [lightbox, setLightbox] = useState<{ image: string; title: string } | null>(null)

  const openLightbox = (item: PlaygroundCard) => {
    if (item.image) {
      setLightbox({ image: item.image, title: item.title })
    }
  }

  const closeLightbox = useCallback(() => {
    setLightbox(null)
  }, [])

  // Lock page scroll while the lightbox is open; restore on close/unmount.
  useEffect(() => {
    if (!lightbox) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [lightbox])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightbox) {
        closeLightbox()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightbox, closeLightbox])

  return (
    <>
      <div className="pf-playGrid pf-reveal" style={d(240)}>
        {PLAYGROUND_ITEMS.map((item, idx) => (
          <article
            key={item.id}
            className={`pf-playCard pf-reveal ${item.image ? 'pf-playCard--clickable' : ''}`}
            style={d(280 + idx * 80)}
            onClick={() => openLightbox(item)}
            role={item.image ? 'button' : undefined}
            tabIndex={item.image ? 0 : undefined}
            onKeyDown={(e) => {
              if (item.image && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault()
                openLightbox(item)
              }
            }}
          >
            <div className="pf-playCard__media">
              {item.image ? (
                <img src={item.image} alt={item.title} loading="lazy" />
              ) : (
                <div className="pf-playCard__placeholder">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                </div>
              )}
            </div>
            <h3 className="pf-playCard__title">{item.title}</h3>
          </article>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightbox && (
        <div className="pf-lightbox" onClick={closeLightbox}>
          <button className="pf-lightbox__close" aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <div className="pf-lightbox__content" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.image} alt={lightbox.title} />
            <p className="pf-lightbox__title">{lightbox.title}</p>
          </div>
        </div>
      )}
    </>
  )
}

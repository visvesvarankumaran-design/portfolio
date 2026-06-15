import { useEffect, useState } from 'react'
import obs1 from '../assets/observe-1.jpeg'
import obs2 from '../assets/observe-2.jpeg'
import obs3 from '../assets/observe-3.jpeg'

const SLIDES = [
  { src: obs1, alt: 'Sunset over the sea, a boat on the horizon' },
  { src: obs2, alt: 'Light rays breaking through clouds over a city skyline' },
  { src: obs3, alt: 'A quiet road at night under a line of streetlights' },
] as const

export function Carousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length)
    }, 2600)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="pf-carousel" aria-label="Photography — how I see the world">
      {SLIDES.map((slide, i) => {
        const n = SLIDES.length
        const pos = (i - index + n) % n
        let cls = 'pf-slide pf-hidden'
        if (pos === 0) cls = 'pf-slide pf-center'
        else if (pos === 1) cls = 'pf-slide pf-right'
        else if (pos === n - 1) cls = 'pf-slide pf-left'
        return (
          <img
            key={i}
            className={cls}
            src={slide.src}
            alt={slide.alt}
            loading="lazy"
          />
        )
      })}
    </div>
  )
}

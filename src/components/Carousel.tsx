import { useEffect, useState } from 'react'

const SLIDES = ['#ff6b6b', '#6bc5ff', '#baff2b'] as const

export function Carousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length)
    }, 1500)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="pf-carousel" aria-label="image carousel">
      <div className="pf-photoBack" />
      {SLIDES.map((color, i) => {
        const n = SLIDES.length
        let pos = (i - index + n) % n
        let cls = 'pf-slide pf-hidden'
        if (pos === 0) cls = 'pf-slide pf-center'
        else if (pos === 1) cls = 'pf-slide pf-right'
        else if (pos === n - 1) cls = 'pf-slide pf-left'
        return <div key={i} className={cls} style={{ background: color }} />
      })}
    </div>
  )
}

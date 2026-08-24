import type { CSSProperties } from 'react'
import life1 from '../assets/life-unplugged/life-1.jpeg'
import life2 from '../assets/life-unplugged/life-2.jpeg'
import life3 from '../assets/life-unplugged/life-3.jpeg'
import life4 from '../assets/life-unplugged/life-4.jpeg'

const PHOTOS = [
  { src: life1, shape: 'landscape', alt: 'Rolling tea-plantation hills under a cloudy sky' },
  { src: life2, shape: 'portrait', alt: 'Riding a Royal Enfield down a winding forest ghat road' },
  { src: life3, shape: 'landscape', alt: 'A misty forested valley seen from a hilltop viewpoint' },
  { src: life4, shape: 'portrait', alt: 'Farmland and a reservoir under heavy monsoon clouds' },
] as const

export function LifeUnpluggedSection() {
  return (
    <section
      className="pf-panel pf-lifeUnplugged"
      aria-label="Life unplugged"
    >
      <div className="pf-lifeUnplugInner">
        <header className="pf-lifeUnplugHead pf-reveal-fade">
          <div className="pf-lifeUnplugScript">Life</div>
          <h2 className="pf-lifeUnplugTitle">UNPLUGGED</h2>
        </header>
        <div className="pf-lifeUnplugRow">
          {PHOTOS.map((photo, i) => (
            <div
              className={`pf-lifeUnplugCard pf-lifeUnplugCard--${photo.shape} pf-reveal-img`}
              style={{ ['--rvd']: `${i * 90}ms` } as CSSProperties}
              key={i}
            >
              <img
                className="pf-lifeUnplugImg"
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

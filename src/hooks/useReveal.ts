import { useEffect } from 'react'
import type { RefObject } from 'react'

/**
 * Scroll-reveal (smooth & editorial): elements marked with `.pf-reveal` inside
 * the given root start hidden and fade + rise in as they enter the viewport.
 *
 * Progressive enhancement — content is visible by default. The hidden state
 * only applies once JS confirms IntersectionObserver support, and it is skipped
 * entirely for `prefers-reduced-motion` users. Mirrors the case-study reveal so
 * the whole site shares one motion language.
 */
export function useReveal(rootRef: RefObject<HTMLElement | null>) {
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
    const targets = Array.from(
      root.querySelectorAll(
        '.pf-reveal, .pf-reveal-fade, .pf-reveal-wipe, .pf-reveal-img',
      ),
    )
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Reveal when entering view, OR when already scrolled past (top above
          // the viewport) — so fast scrolls and #anchor jumps never leave an
          // element stuck hidden.
          if (entry.isIntersecting || entry.boundingClientRect.top < 1) {
            entry.target.classList.add('is-in')
            io.unobserve(entry.target)
          }
        })
      },
      // No negative bottom margin: bottom-most elements (e.g. footer) must be
      // able to trigger even when the page can't scroll them any higher.
      { threshold: 0.1, rootMargin: '0px' },
    )
    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [rootRef])
}

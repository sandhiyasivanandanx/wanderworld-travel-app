import { useState, useEffect, useCallback, useRef } from 'react'
import './ImageSlider.css'

export default function ImageSlider({ slides }) {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const timerRef = useRef(null)

  const go = useCallback((index) => {
    if (animating) return
    setAnimating(true)
    setCurrent(index)
    setTimeout(() => setAnimating(false), 600)
  }, [animating])

  const next = useCallback(() => go((current + 1) % slides.length), [current, go, slides.length])
  const prev = useCallback(() => go((current - 1 + slides.length) % slides.length), [current, go, slides.length])

  useEffect(() => {
    timerRef.current = setInterval(next, 5000)
    return () => clearInterval(timerRef.current)
  }, [next])

  if (!slides || slides.length === 0) return null

  const slide = slides[current]

  return (
    <div className="slider">
      {slides.map((s, i) => (
        <div key={i} className={`slider-slide ${i === current ? 'active' : ''}`}>
          <img src={s.image} alt={s.title} className="slider-img" />
          <div className="slider-overlay" />
        </div>
      ))}

      <div className="slider-content container">
        <div className="slider-text">
          {slide.eyebrow && <span className="slider-eyebrow">{slide.eyebrow}</span>}
          <h1 className="slider-title serif">{slide.title}</h1>
          <p className="slider-sub">{slide.subtitle}</p>
          {slide.cta && (
            <div className="slider-actions">
              {slide.cta}
            </div>
          )}
        </div>
      </div>

      <button className="slider-btn slider-prev" onClick={prev} aria-label="Previous">‹</button>
      <button className="slider-btn slider-next" onClick={next} aria-label="Next">›</button>

      <div className="slider-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`slider-dot ${i === current ? 'active' : ''}`}
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

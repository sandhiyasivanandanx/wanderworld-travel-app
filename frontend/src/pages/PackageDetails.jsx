import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getTour } from '../api/client'
import './PackageDetails.css'

export default function PackageDetails() {
  const { id } = useParams()
  const [tour, setTour] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('itinerary')
  const [openDay, setOpenDay] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    getTour(id).then(r => {
      setTour(r.data)
      setLoading(false)
    }).catch(() => setLoading(false))
    window.scrollTo(0, 0)
  }, [id])

  if (loading) return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p>Loading your adventure...</p>
    </div>
  )

  if (!tour) return <div className="container mt-80 text-center"><h2>Tour not found</h2></div>

  const diffColor = tour.difficulty === 'Easy' ? 'green' : tour.difficulty === 'Moderate' ? 'yellow' : 'red'

  return (
    <div className="package-details-page">
      {/* Hero Banner */}
      <div className="package-hero" style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(15,15,18,1)), url(${tour.cover_image})` }}>
        <div className="container">
          <div className="hero-content">
            <div className="badge-row">
              <span className={`badge badge-${diffColor}`}>{tour.difficulty}</span>
              <span className="badge badge-primary">★ {tour.rating}</span>
            </div>
            <h1>{tour.title}</h1>
            <div className="hero-meta">
              <span>⏱ {tour.duration_days} Days</span>
              <span>👤 Max {tour.max_group_size} Pers.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container package-grid mt-40">
        <main className="package-main">
          {/* Quick Facts Section */}
          <section className="info-card mb-40">
            <h2 className="section-title">📊 Quick Facts</h2>
            <div className="facts-grid">
              <div className="fact-item">
                <span className="fact-label">Capital</span>
                <span className="fact-value">{tour.quick_facts?.capital || 'TBD'}</span>
              </div>
              <div className="fact-item">
                <span className="fact-label">Currency</span>
                <span className="fact-value">{tour.quick_facts?.currency || 'USD ($)'}</span>
              </div>
              <div className="fact-item">
                <span className="fact-label">Language</span>
                <span className="fact-value">{tour.quick_facts?.language || 'English'}</span>
              </div>
              <div className="fact-item">
                <span className="fact-label">Contact</span>
                <span className="fact-value">{tour.quick_facts?.calling_code || '+1'}</span>
              </div>
            </div>
          </section>

          {/* Core Attractions Section */}
          {tour.attractions && (
            <section className="info-card mb-40">
              <h2 className="section-title">✨ Top Attractions</h2>
              <div className="attractions-row">
                {tour.attractions.map((a, i) => (
                  <span key={i} className="attraction-chip">{a}</span>
                ))}
              </div>
            </section>
          )}

          {/* Description */}
          <section className="info-card mb-40">
            <h2 className="section-title">📖 Overview</h2>
            <p className="description-text">{tour.description}</p>
          </section>

          {/* Main Tabs */}
          <div className="tabs-container">
            <div className="tabs-header">
              <button className={`tab-btn ${activeTab === 'itinerary' ? 'active' : ''}`} onClick={() => setActiveTab('itinerary')}>🗓 Itinerary</button>
              <button className={`tab-btn ${activeTab === 'highlights' ? 'active' : ''}`} onClick={() => setActiveTab('highlights')}>🎯 Highlights</button>
              <button className={`tab-btn ${activeTab === 'includes' ? 'active' : ''}`} onClick={() => setActiveTab('includes')}>✅ Inclusions</button>
            </div>

            <div className="tab-content">
              {activeTab === 'itinerary' && (
                <div className="itinerary-list">
                  {(tour.itinerary || []).map((day) => (
                    <div key={day.day} className={`itinerary-item ${openDay === day.day ? 'open' : ''}`}>
                      <div className="itinerary-header" onClick={() => setOpenDay(openDay === day.day ? null : day.day)}>
                        <span className="day-number">Day {day.day}</span>
                        <h4 className="day-title">{day.title}</h4>
                        <span className="chevron"></span>
                      </div>
                      <div className="itinerary-body">
                        <p>{day.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'highlights' && (
                <ul className="feature-list">
                  {(tour.highlights || []).map((h, i) => (
                    <li key={i} className="feature-item"><span className="check">✓</span> {h}</li>
                  ))}
                </ul>
              )}

              {activeTab === 'includes' && (
                <div className="in-out-grid">
                  <div className="in-col">
                    <h3 className="in-out-title">✓ Price Includes</h3>
                    <ul className="feature-list">
                      {(tour.includes || []).map((inc, i) => (
                        <li key={i} className="feature-item green"><span className="check">✔</span> {inc}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="out-col">
                    <h3 className="in-out-title">✕ Price Excludes</h3>
                    <ul className="feature-list">
                      {(tour.exclusions || []).map((exc, i) => (
                        <li key={i} className="feature-item red"><span className="check">✖</span> {exc}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        <aside className="pkg-sidebar">
          <div className="pkg-price-card card">
            <div className="price-tag">
              <span className="price-amount">${tour.price?.toLocaleString()}</span>
              <span className="price-per text-muted">/ per person</span>
            </div>
            <div className="price-details">
              <div className="price-row">
                <span className="text-muted">ID: #{tour.id}</span>
                <span className="fw-600">Verified</span>
              </div>
              <div className="price-row">
                <span className="text-muted">Total Days</span>
                <span className="fw-600">{tour.duration_days}</span>
              </div>
            </div>
            <button onClick={() => navigate('/booking', { state: { tour } })} className="btn btn-primary w-full" style={{justifyContent:'center', gap: 10, padding: 18, fontSize:18}}>
              Book Now <span>→</span>
            </button>
            <button onClick={() => { setActiveTab('itinerary'); window.scrollTo(0, document.querySelector('.tabs-container').offsetTop - 100); }} className="btn btn-outline w-full mt-12" style={{justifyContent:'center', gap: 10, padding: 18, fontSize:18}}>
              View Itinerary <span>📅</span>
            </button>
            <p className="text-sm text-muted text-center mt-12">No pre-payment required today</p>
          </div>

          <div className="info-card mt-24">
            <h3 style={{fontSize:16, marginBottom:16}}>🏠 Included Stays</h3>
            <div className="mini-hotel-list">
              <p className="text-sm text-muted">Boutique 4-star hotels & heritage stays included throughout the journey.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPlace } from '../api/client'
import api from '../api/client'
import './PlaceItineraryPage.css'

const CATEGORY_TO_INTERESTS = {
  Beach: ['Beach'],
  Cultural: ['Cultural'],
  Historical: ['Cultural'],
  Nature: ['Nature'],
  City: ['City'],
  Adventure: ['Adventure'],
  Wildlife: ['Nature'],
}

const SLOT_ICONS = { morning: '🌅', afternoon: '☀️', evening: '🌙' }

export default function PlaceItineraryPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [place, setPlace] = useState(null)
  const [itinerary, setItinerary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedDay, setExpandedDay] = useState(1)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        // 1. Fetch place details
        const placeRes = await getPlace(id)
        const placeData = placeRes.data
        setPlace(placeData)

        // 2. Map category → interests & generate itinerary
        const interests = CATEGORY_TO_INTERESTS[placeData.category] || ['Nature']
        const duration = 3

        const itinRes = await api.post('/free-itinerary/advanced', {
          budget: 18000,
          travel_type: 'Solo',
          interests,
          duration,
          destination: placeData.name,
        })

        // Override random destination with actual place name
        setItinerary({ ...itinRes.data, destination: placeData.name })
      } catch (err) {
        console.error('Error loading place itinerary:', err)
        setError('Could not load itinerary. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [id])

  const formatPrice = (p) => `₹${Math.round(p).toLocaleString('en-IN')}`

  const handleBookNow = () => {
    navigate('/booking', {
      state: {
        itinerary,
        place,
        originalQuery: { duration: itinerary.itinerary.length },
        currency: { symbol: '₹', rate: 1 },
      },
    })
  }

  if (loading) {
    return (
      <div className="pip-loading">
        <div className="spinner" />
        <p>Crafting your perfect itinerary for {id ? 'this destination' : '…'}…</p>
      </div>
    )
  }

  if (error || !place || !itinerary) {
    return (
      <div className="pip-error">
        <div style={{ fontSize: 64 }}>😕</div>
        <h3>Could not load itinerary</h3>
        <p>{error || 'Something went wrong.'}</p>
        <button onClick={() => navigate(-1)} className="btn btn-outline">Go Back</button>
      </div>
    )
  }

  const tax = itinerary.total_estimated_cost * 0.04
  const grandTotal = itinerary.total_estimated_cost + tax

  return (
    <div className="pip-page">

      {/* Hero Banner */}
      <div className="pip-hero" style={{ backgroundImage: `url(${place.image_url})` }}>
        <div className="pip-hero-overlay" />
        <div className="pip-hero-content container">
          <span className="pip-badge">{place.category}</span>
          <h1>{place.name}</h1>
          <p>{place.description}</p>
          <div className="pip-meta">
            <span>⭐ {place.rating?.toFixed(1)}</span>
            <span>🗓 Best: {place.best_time}</span>
            <span>📅 {itinerary.itinerary.length}-Day Plan</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container pip-content">
        <div className="pip-grid">

          {/* Left: Day-by-day plans */}
          <div className="pip-days">
            <h2 className="pip-section-title">
              Trip <span className="text-gradient">Profile</span>
            </h2>
            <div className="pip-tips mb-40">
              <div className="pip-price-row mb-12"><span>Destination</span><span style={{fontWeight:600}}>{place.name}</span></div>
              <div className="pip-price-row mb-12"><span>Duration</span><span style={{fontWeight:600}}>{itinerary.itinerary.length} Days</span></div>
              <div className="pip-price-row"><span>Travel Hubs</span><span style={{fontWeight:600}}>{place.name} Central / Nearby Airports</span></div>
            </div>

            <h2 className="pip-section-title">
              Lodging <span className="text-gradient">Details</span>
            </h2>
            <div className="table-responsive mb-40" style={{background: 'var(--glass)', borderRadius: 12, padding: 16}}>
              <table style={{width: '100%', textAlign: 'left', borderCollapse: 'collapse'}}>
                <thead>
                  <tr style={{borderBottom: '1px solid var(--border)', color: 'var(--mid)'}}>
                    <th style={{padding: '12px 8px'}}>City</th>
                    <th style={{padding: '12px 8px'}}>Hotel Name</th>
                    <th style={{padding: '12px 8px'}}>Address</th>
                    <th style={{padding: '12px 8px'}}>Check-in/out</th>
                    <th style={{padding: '12px 8px'}}>Res. ID</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
                    <td style={{padding: '12px 8px'}}>{place.name}</td>
                    <td style={{padding: '12px 8px'}}>{place.hotels?.[0]?.name || "Grand Premium Stay"}</td>
                    <td style={{padding: '12px 8px'}}>Central City Area</td>
                    <td style={{padding: '12px 8px'}}>14:00 / 11:00</td>
                    <td style={{padding: '12px 8px', fontFamily: 'monospace'}}>#HTL-{Math.floor(Math.random()*90000)+10000}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="pip-section-title">
              Your <span className="text-gradient">{itinerary.itinerary.length}-Day Plan</span>
            </h2>

                {itinerary.itinerary.map((day) => {
                  const isExpanded = expandedDay === day.day;
                  // Try to find a main activity summary for the topic
                  const mainTitle = day.morning?.title || day.afternoon?.title || 'Arrival & Check-in';
                  
                  return (
                    <div key={day.day} className={`pip-accordion-card ${isExpanded ? 'active' : ''}`}>
                      <div 
                        className="pip-accordion-header"
                        onClick={() => setExpandedDay(isExpanded ? null : day.day)}
                      >
                        <div className="pip-accordion-title">
                          <span className="pip-accordion-day">📍 Day {day.day < 10 ? `0${day.day}` : day.day}:</span>
                          <span className="pip-accordion-topic">{place.name} — {mainTitle}</span>
                        </div>
                        <div className="pip-accordion-toggle">
                          {isExpanded ? '−' : '+'}
                        </div>
                      </div>
                      
                      {isExpanded && (
                        <div className="pip-accordion-body">
                          <ul className="pip-accordion-list">
                            {['morning', 'afternoon', 'evening'].map(slot => {
                              const act = day[slot];
                              if (!act) return null;
                              return (
                                <li key={slot}>
                                  <div className="pip-list-bullet"></div>
                                  <div className="pip-list-text">
                                    <strong>{act.title}</strong>
                                    {act.reason && <div className="pip-list-desc">{act.reason}</div>}
                                  </div>
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                      )}
                    </div>
                  )
                })}

              <div className="pip-tips mt-24">
                <h3>💡 Extra / Travel Tips</h3>
                {itinerary.tips.map((tip, i) => (
                  <div key={i} className="pip-tip">— {tip}</div>
                ))}
              </div>

            {/* Important Info */}
            <div className="pip-tips mt-24" style={{borderColor: '#ef4444'}}>
              <h3 style={{color: '#ef4444'}}>⚠️ Important Info</h3>
              <div className="pip-tip"><strong>Connectivity:</strong> Good 4G/5G coverage in city limits. Wi-Fi available at hotels.</div>
              <div className="pip-tip"><strong>Transport:</strong> Options include ridesharing, local trains, and pre-booked cabs.</div>
              <div className="pip-tip"><strong>Local tips:</strong> Carry cash for local markets. Wear comfortable shoes for walking.</div>
              <div className="pip-tip"><strong>Emergency numbers:</strong> Police: 100/112, Ambulance: 102/108 (vary by country).</div>
            </div>
          </div>

          {/* Right: Price card + Book Now */}
          <div className="pip-sidebar">
            <div className="pip-price-card">
              <div className="pip-price-header">
                <div className="pip-price-amount">{formatPrice(itinerary.total_estimated_cost + tax)}</div>
                <div className="pip-price-emi">Per Person<br/>EMI starts at ₹3,500/month</div>
              </div>

              <div className="pip-price-summary-box">
                <div className="pip-summary-title">{itinerary.itinerary.length} Days / {Math.max(1, itinerary.itinerary.length - 1)} Nights</div>
                <div className="pip-summary-subtitle">Tour of {place.name}</div>
              </div>

              <div className="pip-price-divider" />

              <div className="pip-price-actions">
                <button className="pip-book-btn" onClick={handleBookNow}>Book Now</button>
                <button className="pip-enquire-btn">Enquire Now</button>
              </div>
              <div className="pip-cancellation-note">
                Hassle-free cancellation up to 48 hours before journey.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

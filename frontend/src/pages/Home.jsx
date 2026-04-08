import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ImageSlider from '../components/ImageSlider'
import { TourCard } from '../components/Cards'
import { getCountries, getTours } from '../api/client'
import AdvancedPlanner from '../components/advanced-planner/AdvancedPlanner'
import './Home.css'

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1400',
    eyebrow: '🌸 Cherry Blossom Season',
    title: 'Discover Japan\'s Magic',
    subtitle: 'Ancient temples, neon cities, and the world\'s most spectacular spring bloom.',
    cta: (
      <>
        <Link to="/tours" className="btn btn-primary">Explore Tours</Link>
        <Link to="/destinations" className="btn btn-outline">View Destinations</Link>
      </>
    ),
  },
  {
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1400',
    eyebrow: '🗼 City of Light',
    title: 'Paris Awaits You',
    subtitle: 'Romance, haute cuisine, and the iconic Eiffel Tower right at your doorstep.',
    cta: (
      <>
        <Link to="/tours" className="btn btn-primary">Plan Your Trip</Link>
        <Link to="/destinations" className="btn btn-outline">Explore France</Link>
      </>
    ),
  },
  {
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1400',
    eyebrow: '🏔 Lost City of the Incas',
    title: 'Trek to Machu Picchu',
    subtitle: 'The legendary Inca citadel hidden in the Andean clouds — a once-in-a-lifetime journey.',
    cta: (
      <>
        <Link to="/tours" className="btn btn-primary">Book Inca Trail</Link>
        <Link to="/destinations" className="btn btn-outline">Explore Peru</Link>
      </>
    ),
  },
  {
    image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=1400',
    eyebrow: '🏺 Land of the Pharaohs',
    title: 'Egypt\'s Ancient Wonders',
    subtitle: 'Pyramids, Nile cruises, and the Red Sea — history and adventure combined.',
    cta: (
      <>
        <Link to="/tours" className="btn btn-primary">Explore Egypt</Link>
        <Link to="/destinations" className="btn btn-outline">See All Destinations</Link>
      </>
    ),
  },
]

const STATS = [
  { value: '10+', label: 'Countries' },
  { value: '100+', label: 'Destinations' },
  { value: '8', label: 'Tour Packages' },
  { value: '50K+', label: 'Happy Travellers' },
]

const STYLE_DATA = {
  Friends: [
    { name: 'Goa', desc: 'Beach & Nightlife', img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400' },
    { name: 'Leh-Ladakh', desc: 'Road Trips & Adventure', img: 'https://images.unsplash.com/photo-1585147986070-4c5f8f8e4b5a?w=400' },
    { name: 'Bali, Indonesia', desc: 'Villas & Tropical Nature', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400' },
    { name: 'Tokyo, Japan', desc: 'Tech & Culture', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400' },
    { name: 'Barcelona, Spain', desc: 'Architecture & Parties', img: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400' },
    { name: 'Iceland', desc: 'Northern Lights & Road Trips', img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400' },
  ],
  Family: [
    { name: 'Kerala', desc: 'Houseboats & Backwaters', img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400' },
    { name: 'Singapore', desc: 'Theme Parks & City Life', img: 'https://images.unsplash.com/photo-1525625293386-3fb0ad7c1fd6?w=400' },
    { name: 'Dubai, UAE', desc: 'Entertainment & Shopping', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400' },
    { name: 'Switzerland', desc: 'Alps & Scenic Rail', img: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=400' },
  ],
  Solo: [
    { name: 'Kyoto, Japan', desc: 'Safety & Serenity', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400' },
    { name: 'Berlin, Germany', desc: 'History & Social Hostels', img: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=400' },
    { name: 'Chiang Mai, Thailand', desc: 'Digital Nomad Hub', img: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=400' },
    { name: 'Hampi, Karnataka', desc: 'History & Backpacking', img: 'https://images.unsplash.com/photo-1621570079576-85bf09592ecd?w=400' },
  ],
  Wellness: [
    { name: 'Rishikesh, Uttarakhand', desc: 'Yoga & Meditation', img: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400' },
    { name: 'Ubud, Bali', desc: 'Spiritual Healing & Greenery', img: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=400' },
    { name: 'Sedona, USA', desc: 'Energy & Vortex Sites', img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400' },
    { name: 'Tulum, Mexico', desc: 'Eco Resorts & Spas', img: 'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?w=400' },
  ],
}

const WHY_US = [
  { icon: '🏆', title: 'Expert Guides', desc: 'Local experts with deep knowledge and passion for every destination.' },
  { icon: '💎', title: 'Premium Stay', desc: 'Carefully selected hotels from boutique gems to five-star resorts.' },
  { icon: '🛡', title: 'Safe & Secure', desc: 'Comprehensive travel insurance and 24/7 emergency support.' },
  { icon: '✈', title: 'Seamless Travel', desc: 'All logistics handled — flights, transfers, and tickets included.' },
]

export default function Home() {
  const [countries, setCountries] = useState([])
  const [tours, setTours] = useState([])
  const [activeStyleTab, setActiveStyleTab] = useState('Friends')

  useEffect(() => {
    getCountries().then(r => setCountries(r.data)).catch(() => {})
    getTours().then(r => setTours(r.data)).catch(() => {})
  }, [])

  return (
    <div className="home">
      <ImageSlider slides={HERO_SLIDES} />

      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="container stats-inner">
          {STATS.map((s, i) => (
            <div key={i} className="stat-item">
              <div className="stat-value text-gradient">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Countries */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow">🌍 Where to Go</div>
            <h2>Explore <span className="text-gradient">10 Countries</span></h2>
            <p>From Asian temples to European châteaux — there's a world of wonder waiting.</p>
          </div>
          <div className="countries-grid">
            {countries.map(c => (
              <Link key={c.id} to={`/destinations?country=${c.id}`} className="country-hero-card">
                <div className="country-hero-flag">{c.flag_emoji}</div>
                <div className="country-hero-info">
                  <div className="country-hero-name">{c.name}</div>
                  <div className="country-hero-continent text-sm text-muted">{c.continent}</div>
                </div>
                <div className="country-hero-arrow">→</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="section featured-tours">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow">🎒 Handcrafted Journeys</div>
            <h2>Featured <span className="text-gradient">Group Tours</span></h2>
            <p>Immersive itineraries designed for unforgettable shared experiences.</p>
          </div>
          <div className="grid-3">
            {tours.slice(0, 3).map(t => <TourCard key={t.id} tour={t} />)}
          </div>
          <div className="text-center mt-32">
            <Link to="/tours" className="btn btn-outline">View All {tours.length} Packages →</Link>
          </div>
        </div>
      </section>

      {/* Travel by Style */}
      <section className="section travel-style-section">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow">🎨 Personalised Travel</div>
            <h2>Travel <span className="text-gradient">By Style</span></h2>
            <p>Handpicked destinations catering to exactly how you want to travel.</p>
          </div>
          
          <div className="style-tabs">
            {Object.keys(STYLE_DATA).map(tab => (
              <button key={tab} className={`style-tab-btn ${activeStyleTab === tab ? 'active' : ''}`} onClick={() => setActiveStyleTab(tab)}>
                {tab}
              </button>
            ))}
          </div>

          <div className="style-grid grid-4">
            {STYLE_DATA[activeStyleTab].map((item, i) => (
              <Link key={i} to={`/style/${item.name}`} className="style-card card clickable animate-pop">
                <div className="style-card-img-wrap">
                  <img src={item.img} alt={item.name} />
                </div>
                <div className="style-card-body">
                  <h4>{item.name}</h4>
                  <p className="text-xs text-muted">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="section why-section">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow">✨ Why WanderWorld</div>
            <h2>Travel With <span className="text-gradient">Confidence</span></h2>
            <p>Everything you need for the perfect trip — handled with care.</p>
          </div>
          <div className="grid-4">
            {WHY_US.map((w, i) => (
              <div key={i} className="why-card card">
                <div className="why-icon">{w.icon}</div>
                <h3>{w.title}</h3>
                <p className="text-muted text-sm">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced AI Powered Custom Trip */}
      <AdvancedPlanner />

      {/* CTA Banner */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <div className="cta-bg" />
            <div className="cta-content">
              <h2 className="serif">Ready for Your Next Adventure?</h2>
              <p>Join thousands of happy travellers who discovered the world with WanderWorld.</p>
              <div className="flex gap-16 flex-wrap" style={{justifyContent:'center'}}>
                <Link to="/tours" className="btn btn-primary">Browse All Tours</Link>
                <Link to="/destinations" className="btn btn-outline">Explore Destinations</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-brand">
            <span className="brand-icon">✈</span>
            <span>Wander<span style={{color:'var(--primary)'}}>World</span></span>
          </div>
          <p className="text-muted text-sm mt-8">© 2026 WanderWorld. All rights reserved. Built with ❤ for travellers.</p>
        </div>
      </footer>
    </div>
  )
}

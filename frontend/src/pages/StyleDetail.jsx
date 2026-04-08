import { useParams, Link } from 'react-router-dom'
import './StyleDetail.css'

const DETAIL_DATA = {
  // Friends
  "Goa": {
    img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200",
    activities: ["Jet skiing & Parasailing", "Beach shack hopping", "Nightclubs in North Goa"],
    culture: "Indo-Portuguese fusion, laid-back 'Susegad' lifestyle, vibrant markets.",
    itinerary: [
      { day: 1, title: "Beach Bliss", desc: "Start at Baga or Calangute for water sports, followed by a sunset at Anjuna's rocky cliff." },
      { day: 2, title: "Heritage & History", desc: "Explore Old Goa's Basilica of Bom Jesus and the majestic Aguada Fort overlooking the sea." },
      { day: 3, title: "South Goa Chill", desc: "Head south to Colva or Palolem for pristine white sands and a quiet seafood lunch." }
    ]
  },
  "Leh-Ladakh": {
    img: "https://images.unsplash.com/photo-1581791534721-e599df4417f7?w=1200",
    activities: ["High-altitude bike trips", "Camping at Pangong Tso", "River rafting in Zanskar"],
    culture: "Tibetan Buddhist influence, ancient monasteries, and resilient mountain traditions.",
    itinerary: [
      { day: 1, title: "Acclimatization in Leh", desc: "Rest day to adjust to altitude. Visit Leh Palace and Shanti Stupa in the evening." },
      { day: 2, title: "Valley of Flowers", desc: "Drive to Nubra Valley via Khardung La, the world's highest motorable pass. Ride double-humped camels." },
      { day: 3, title: "The Blue Lake", desc: "Travel to Pangong Tso. Stay in a lakeside camp and witness the lake change colors." }
    ]
  },
  "Tokyo, Japan": {
    img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200",
    activities: ["Robot cafes & Tech hubs", "Akihabara exploration", "Izakaya crawling in Shinjuku"],
    culture: "A perfect blend of hyper-modern technology and deeply rooted traditions.",
    itinerary: [
      { day: 1, title: "Neon & Nightlife", desc: "Explore the bustling streets of Shibuya and Shinjuku. Dinner at Omoide Yokocho." },
      { day: 2, title: "The Otaku Dream", desc: "Dive into electronics and anime in Akihabara. Visit the Tokyo Skytree for a city view." },
      { day: 3, title: "Traditional Tokyo", desc: "Senso-ji Temple in Asakusa and a serene walk through Meiji Jingu Shrine." }
    ]
  },
  "Lisbon, Portugal": {
    img: "https://images.unsplash.com/photo-1589330273594-fade1ee91647?w=1200",
    activities: ["Yellow tram rides", "Fado music nights", "Pasteis de Belem tasting"],
    culture: "Artistic, soulful, and maritime-centered with beautiful Azulejo tiles everywhere.",
    itinerary: [
      { day: 1, title: "Alfama Wanderings", desc: "Lost yourself in the narrow alleys of Alfama and watch a Fado performance." },
      { day: 2, title: "Belem & Riverside", desc: "Visit the Belem Tower and Jerónimos Monastery. Eat plenty of egg tarts." },
      { day: 3, title: "Sintra Day Trip", desc: "Take a train to the fairytale castles of Sintra, including the colorful Pena Palace." }
    ]
  },
  // Family
  "Singapore": {
    img: "https://images.unsplash.com/photo-1525625293386-3fb0ad7c1fd6?w=1200",
    activities: ["Universal Studios", "Gardens by the Bay", "Night Safari"],
    culture: "Multi-ethnic harmony, extremely systematic, clean and ultra-modern.",
    itinerary: [
      { day: 1, title: "Sentosa Fun", desc: "Full day at Universal Studios and S.E.A Aquarium for the kids." },
      { day: 2, title: "The Future of Nature", desc: "Cloud Forest and Flower Dome at Gardens by the Bay. Supertree light show at 8 PM." },
      { day: 3, title: "Animal Encounters", desc: "Morning at the Singapore Zoo and the unique Night Safari in the evening." }
    ]
  },
  "Switzerland": {
    img: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=1200",
    activities: ["Scenic train rides", "Chocolate factory tours", "Mountain cable cars"],
    culture: "Pristine nature, precision in everything, and classic Alpine hospitality.",
    itinerary: [
      { day: 1, title: "Lucerne Lakes", desc: "Walk the Chapel Bridge and take a peaceful lake cruise with mountain views." },
      { day: 2, title: "Top of Europe", desc: "Train journey to Jungfraujoch. Play in the snow regardless of the season." },
      { day: 3, title: "Sweet Zurich", desc: "Lindt Home of Chocolate and a stroll through the Bahnhofstrasse shopping street." }
    ]
  },
  // Solo
  "Kyoto, Japan": {
    img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200",
    activities: ["Zen meditation", "Solo photography", "Tea ceremonies"],
    culture: "The spiritual heart of Japan, focused on harmony and quiet beauty.",
    itinerary: [
      { day: 1, title: "Arashiyama Zen", desc: "Walk through the Bamboo Grove early in the morning for maximum peace." },
      { day: 2, title: "Golden Pavilion", desc: "Visit Kinkaku-ji and the Philosopher’s Path for a reflective afternoon walk." },
      { day: 3, title: "Gion District", desc: "Explore the historic geisha district and stay in a traditional Ryokan." }
    ]
  },
  "Berlin, Germany": {
    img: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=1200",
    activities: ["History walks", "Street art tours", "Social hostels"],
    culture: "Edgy, resilient, and incredibly welcoming to digital nomads and solo travelers.",
    itinerary: [
      { day: 1, title: "The Berlin Wall", desc: "East Side Gallery and Checkpoint Charlie for a deep dive into Cold War history." },
      { day: 2, title: "Museum Island", desc: "Spend the day exploring world-class museums and the iconic Brandenburg Gate." },
      { day: 3, title: "Kreuzberg Vibes", desc: "Find the best currywurst and explore the street art and alternative cafes." }
    ]
  },
  // Wellness
  "Ubud, Bali": {
    img: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200",
    activities: ["Yoga retreats", "Sound healing", "Rice terrace walks"],
    culture: "Spiritual, eco-conscious, and centered around Balinese Hinduism.",
    itinerary: [
      { day: 1, title: "Yoga & Peace", desc: "Morning flow at Yoga Barn followed by a vegan lunch overlooknig rice fields." },
      { day: 2, title: "Tegalalang Rice Terraces", desc: "Scenic walk through the terraces and visit the Pyramids of Chi for sound healing." },
      { day: 3, title: "Holy Water Temple", desc: "Purification ritual at Tirta Empul and an evening Balinese dance performance." }
    ]
  },
  "Rishikesh, Uttarakhand": {
    img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200",
    activities: ["Ganga Aarti", "Yoga by the river", "Ayurvedic massage"],
    culture: "The Yoga Capital of the World, deeply spiritual and vegetarian.",
    itinerary: [
      { day: 1, title: "Beatles Ashram", desc: "Explore the graffiti-covered ashram where the Beatles once meditated." },
      { day: 2, title: "Triveni Ghat", desc: "Silent meditation at sunrise and the grand Evening Aarti ceremony." },
      { day: 3, title: "Nature Trek", desc: "Hike to Neer Garh waterfall for a refreshing dip in natural mountain water." }
    ]
  }
}

// Default fallback data for others
const FALLBACK = {
  activities: ["Local sightseeing", "Culinary tours", "Nature walks"],
  culture: "A unique blend of local traditions and welcoming hospitality.",
  itinerary: [
    { day: 1, title: "Arrival & Explore", desc: "Check-in and evening walk through the main town center." },
    { day: 2, title: "Main Landmarks", desc: "Full day tour of the most famous cultural and natural sites." },
    { day: 3, title: "Leisure & Local Life", desc: "Shopping at local markets and trying regional delicacies." }
  ]
}

export default function StyleDetail() {
  const { name } = useParams()
  const data = DETAIL_DATA[name] || { ...FALLBACK, img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200" }

  return (
    <div className="style-detail-page">
      <div className="style-hero" style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(15,15,18,1)), url(${data.img})` }}>
        <div className="container">
          <Link to="/" className="back-link">← Back to Styles</Link>
          <h1 className="text-gradient">{name}</h1>
          <p className="subtitle">Curated {name} Experience</p>
        </div>
      </div>

      <div className="container style-detail-grid mt-40">
        <div className="style-info-main">
          <section className="detail-card mb-32">
            <h3>🎢 Key Activities</h3>
            <div className="activities-list">
              {data.activities.map((act, i) => (
                <div key={i} className="activity-item">
                  <span className="dot"></span>
                  {act}
                </div>
              ))}
            </div>
          </section>

          <section className="detail-card mb-32">
            <h3>🗓 3-Day Itinerary</h3>
            <div className="itinerary-timeline">
              {data.itinerary.map((day) => (
                <div key={day.day} className="timeline-item">
                  <div className="timeline-marker">Day {day.day}</div>
                  <div className="timeline-content">
                    <h4>{day.title}</h4>
                    <p className="text-muted">{day.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="style-sidebar">
          <div className="detail-card sticky">
            <h3>✨ Cultural Vibe</h3>
            <p className="culture-p">{data.culture}</p>
            <div className="divider"></div>
            <p className="cta-text">Loved this style?</p>
            <Link to="/tours" className="btn btn-primary w-full" style={{justifyContent:'center'}}>
              View Full Tour Packages
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}

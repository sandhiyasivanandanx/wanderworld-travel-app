import { useEffect, useState } from 'react'
import { TourCard } from '../components/Cards'
import { getTours } from '../api/client'
import './GroupTours.css'

const FILTERS = ['All', 'Easy', 'Moderate', 'Challenging']

export default function GroupTours() {
  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')
  const [sort, setSort] = useState('rating')

  useEffect(() => {
    getTours().then(r => { setTours(r.data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = tours
    .filter(t => filter === 'All' || t.difficulty === filter)
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      if (sort === 'duration') return a.duration_days - b.duration_days
      return b.rating - a.rating
    })

  return (
    <div className="tours-page">
      <div className="page-hero">
        <div className="container">
          <h1>Group <span className="text-gradient">Tour Packages</span></h1>
          <p>Expertly crafted journeys for curious travellers. Discover, connect, and explore together.</p>
        </div>
      </div>

      <div className="container section-sm">
        {/* Filter + Sort bar */}
        <div className="tours-toolbar">
          <div className="filter-chips">
            {FILTERS.map(f => (
              <button
                key={f}
                className={`filter-chip ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="sort-wrap">
            <label className="text-sm text-muted">Sort by:</label>
            <select
              id="tour-sort"
              className="form-control sort-select"
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              <option value="rating">Top Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="duration">Duration</option>
            </select>
          </div>
        </div>

        <div className="text-muted text-sm mb-24">
          {loading ? 'Loading…' : `${filtered.length} package${filtered.length !== 1 ? 's' : ''} found`}
        </div>

        {loading ? (
          <div className="spinner-wrap"><div className="spinner" /></div>
        ) : (
          <div className="grid-3">
            {filtered.map(t => <TourCard key={t.id} tour={t} />)}
          </div>
        )}
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DestinationCard, CountryCard } from '../components/Cards'
import { getCountries, getPlaces } from '../api/client'
import './Destinations.css'

export default function Destinations() {
  const [countries, setCountries] = useState([])
  const [places, setPlaces] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    getCountries().then(r => {
      setCountries(r.data)
      const preselect = searchParams.get('country')
      if (preselect) setSelectedCountry(Number(preselect))
    })
  }, [])

  useEffect(() => {
    setLoading(true);
    console.log('Fetching places for country_id:', selectedCountry);
    getPlaces(selectedCountry).then(r => {
      console.log('Places received:', r.data.length);
      setPlaces(r.data);
      setLoading(false);
    }).catch(err => {
      console.error('Error fetching places:', err);
      setLoading(false);
    });
  }, [selectedCountry]);

  const filtered = places.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.description || '').toLowerCase().includes(search.toLowerCase()) ||
    (p.category || '').toLowerCase().includes(search.toLowerCase())
  )

  const activeCountry = countries.find(c => c.id === selectedCountry)

  return (
    <div className="destinations-page">
      <div className="page-hero">
        <div className="container">
          <h1>
            {activeCountry
              ? <>{activeCountry.flag_emoji} {activeCountry.name}</>
              : <>Explore <span className="text-gradient">Destinations</span></>
            }
          </h1>
          <p>
            {activeCountry
              ? activeCountry.description || `Discover the best places in ${activeCountry.name}`
              : '100+ handpicked places across 10 stunning countries.'}
          </p>
        </div>
      </div>

      <div className="container">
        {/* Country filter chips */}
        <div className="country-filter-bar">
          <CountryCard
            country={{ flag_emoji: '🌍', name: 'All Countries' }}
            active={!selectedCountry}
            onClick={() => setSelectedCountry(null)}
          />
          {countries.map(c => (
            <CountryCard
              key={c.id}
              country={c}
              active={selectedCountry === c.id}
              onClick={() => setSelectedCountry(c.id)}
            />
          ))}
        </div>

        {/* Search */}
        <div className="dest-search-wrap">
          <span className="search-icon">🔍</span>
          <input
            id="destination-search"
            type="text"
            className="form-control dest-search"
            placeholder="Search by name, category, or keyword..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button className="search-clear" onClick={() => setSearch('')}>✕</button>
          )}
        </div>

        {/* Results count */}
        <div className="dest-meta text-muted text-sm mb-24">
          {loading ? 'Loading…' : `Showing ${filtered.length} place${filtered.length !== 1 ? 's' : ''}`}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="spinner-wrap"><div className="spinner" /></div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div style={{fontSize:64}}>🗺</div>
            <h3>No destinations found</h3>
            <p className="text-muted">Try a different country or keyword.</p>
          </div>
        ) : (
          <div className="grid-3">
            {filtered.map(p => <DestinationCard key={p.id} place={p} />)}
          </div>
        )}
      </div>
    </div>
  )
}

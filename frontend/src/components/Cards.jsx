import { Link, useNavigate } from 'react-router-dom'
import './Cards.css'

export function DestinationCard({ place }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/itinerary/${place.id}`);
  };

  const handleBookNow = (e) => {
    e.stopPropagation();
    navigate('/booking', { state: { place } });
  };

  return (
    <div onClick={handleCardClick} className="dest-card card clickable">
      <div className="dest-card-img-wrap">
        <img src={place.image_url} alt={place.name} className="dest-card-img" />
        <div className="dest-card-overlay" />
        <span className="dest-card-category badge badge-primary">{place.category || 'Explore'}</span>
        <div className="dest-card-rating">
          <span className="star-icon">★</span>
          <span>{place.rating?.toFixed(1)}</span>
        </div>
      </div>
      <div className="dest-card-body">
        <h3 className="dest-card-name">{place.name}</h3>
        <p className="dest-card-desc text-muted text-sm">{place.description}</p>
        <div className="dest-card-meta">
          <span className="dest-card-time">
            🗓 {place.best_time}
          </span>
          {place.hotels && place.hotels.length > 0 && (
            <span className="badge badge-blue">{place.hotels.length} Hotels</span>
          )}
        </div>
        <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
          <button className="btn btn-outline" style={{ flex: 1 }}>Itinerary</button>
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleBookNow}>Book Now</button>
        </div>
      </div>
    </div>
  );
}

export function CountryCard({ country, onClick, active }) {
  return (
    <div className={`country-chip ${active ? 'active' : ''}`} onClick={onClick}>
      <span className="country-flag">{country.flag_emoji}</span>
      <span className="country-name">{country.name}</span>
    </div>
  )
}

export function TourCard({ tour }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/tours/${tour.id}`);
  };

  const handleBookNow = (e) => {
    e.stopPropagation();
    navigate('/booking', { state: { tour } });
  };

  return (
    <div onClick={handleCardClick} className="tour-card card clickable">
      <div className="tour-card-img-wrap">
        <img src={tour.cover_image} alt={tour.title} className="tour-card-img" />
        <div className="tour-card-overlay" />
        <div className="tour-card-badges">
          <span className="badge badge-primary">{tour.duration_days} Days</span>
          <span className={`badge badge-${tour.difficulty === 'Easy' ? 'success' : tour.difficulty === 'Moderate' ? 'blue' : 'purple'}`}>
            {tour.difficulty}
          </span>
        </div>
      </div>
      <div className="tour-card-body">
        <h3 className="tour-card-title">{tour.title}</h3>
        <p className="tour-card-desc text-sm text-muted">{tour.description?.slice(0, 100)}...</p>
        <div className="tour-card-row">
          <div>
            <div className="tour-card-price">${tour.price?.toLocaleString()}</div>
            <div className="text-sm text-muted">per person</div>
          </div>
          <div className="tour-card-meta-right">
            <div className="flex gap-8 text-sm" style={{color:'#f59e0b'}}>
              {'★'.repeat(Math.round(tour.rating || 4))}
              <span style={{color:'var(--mid)'}}>{tour.rating?.toFixed(1)}</span>
            </div>
            <div className="text-sm text-muted">👥 Max {tour.max_group_size}</div>
          </div>
        </div>
        <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
          <button className="btn btn-outline" style={{ flex: 1 }}>Details</button>
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleBookNow}>Book Now</button>
        </div>
      </div>
    </div>
  )
}

import React, { useState } from 'react';
import axios from 'axios';
import './TripPlanner.css';

const TripPlanner = () => {
  const [formData, setFormData] = useState({
    budget: 2000,
    travel_type: 'Family',
    duration: 5,
    interests: []
  });

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const interestOptions = ['Beach', 'Hills', 'Adventure', 'Cultural', 'City', 'Nature'];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleInterest = (interest) => {
    const updatedInterests = formData.interests.includes(interest)
      ? formData.interests.filter((i) => i !== interest)
      : [...formData.interests, interest];
    setFormData({ ...formData, interests: updatedInterests });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/recommendations/', formData);
      setRecommendations(response.data);
    } catch (err) {
      console.error('Error fetching recommendations:', err);
      setError('Could not fetch recommendations. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="planner-page-wrapper">
      <div className="tp-container">
        <div className="tp-header">
          <h1>AI-Powered Trip Planner</h1>
          <p>Your personalized itinerary, crafted by intelligence.</p>
        </div>

        <form className="tp-form" onSubmit={handleSubmit}>
          <div className="tp-group">
            <label>Budget ($)</label>
            <input 
              type="number" 
              name="budget" 
              className="tp-input" 
              value={formData.budget}
              onChange={handleInputChange} 
              min="100"
              required
            />
          </div>

          <div className="tp-group">
            <label>Travel Type</label>
            <select name="travel_type" className="tp-select" value={formData.travel_type} onChange={handleInputChange}>
              <option value="Solo">Solo</option>
              <option value="Family">Family</option>
              <option value="Friends">Friends</option>
              <option value="Couple">Couple</option>
            </select>
          </div>

          <div className="tp-group">
            <label>Duration (Days)</label>
            <input 
              type="number" 
              name="duration" 
              className="tp-input" 
              value={formData.duration}
              onChange={handleInputChange} 
              min="1"
              max="30"
              required
            />
          </div>

          <div className="tp-group">
            <label>Select Interests</label>
            <div className="tp-interests">
              {interestOptions.map((option) => (
                <div 
                  key={option} 
                  className={`tp-interest-tag ${formData.interests.includes(option) ? 'active' : ''}`}
                  onClick={() => toggleInterest(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>

          <div className="tp-submit-group" style={{gridColumn: '1 / -1', display: 'flex', gap: '20px'}}>
            <button type="submit" className="tp-submit-btn" style={{flex: 1}} disabled={loading}>
              {loading ? 'Finding Best Trips...' : 'Generate Trip Plan'}
            </button>
          </div>
        </form>

        {error && <div className="text-center" style={{color: '#ef4444', marginBottom: '40px'}}>{error}</div>}

        <div className="tp-results-grid">
          {recommendations.map((rec) => (
            <div key={rec.id} className="tp-rec-card">
              <div className="tp-rec-image">
                <img src={rec.image_url} alt={rec.title} />
                <div className="tp-rec-badge">{rec.match_score}% Match</div>
              </div>
              <div className="tp-rec-content">
                <h3>{rec.title}</h3>
                <div className="tp-rec-meta">
                  <span>📅 {rec.duration_days} Days</span>
                  <span className="tp-rec-price">${rec.price}</span>
                </div>
                <p className="tp-rec-description">{rec.description}</p>
                
                <div className="tp-rec-itinerary-title">✨ Recommended Itinerary</div>
                <div className="tp-itinerary-list">
                  {rec.itinerary && rec.itinerary.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="tp-itinerary-item">
                      <div className="tp-itinerary-day">Day {item.day}</div>
                      <div className="tp-itinerary-desc">{item.activity}</div>
                    </div>
                  ))}
                </div>

                <div className="tp-tips-box">
                  <strong>💡 Pro Travel Tips</strong>
                  <p>{rec.travel_tips[0]}</p>
                </div>
              </div>
            </div>
          ))}

          {!loading && recommendations.length === 0 && !error && (
            <div className="text-center w-full" style={{color: '#94a3b8', gridColumn: '1 / -1'}}>
              Fill the form above to get personalized travel recommendations.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;

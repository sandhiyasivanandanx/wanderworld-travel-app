import React, { useState } from 'react';
import axios from 'axios';
import './CustomTrip.css';

const CustomTrip = () => {
  const [formData, setFormData] = useState({
    budget: 2000,
    travel_type: 'Family',
    duration: 5,
    interests: []
  });

  const [aiItinerary, setAiItinerary] = useState(null);
  const [freeLoading, setFreeLoading] = useState(false);
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

  const handleGenerateFreeItinerary = async (e) => {
    if (e) e.preventDefault();
    setFreeLoading(true);
    setError(null);
    setAiItinerary(null);
    try {
      const response = await axios.post('http://localhost:8000/generate-free-itinerary/', formData);
      setAiItinerary(response.data.itinerary);
    } catch (err) {
      console.error('Error generating Free itinerary:', err);
      const errorMsg = err.response?.data?.detail || err.message || 'Could not connect to the backend.';
      setError(`Free Itinerary Error: ${errorMsg}`);
    } finally {
      setFreeLoading(false);
    }
  };

  return (
    <section className="section custom-ai-section">
      <div className="container">
        <div className="section-header">
          <div className="eyebrow">✨ AI POWERED</div>
          <h2>Plan Your <span className="text-gradient">Custom Trip</span></h2>
          <p>Tell us your preferences and let our AI craft the perfect itinerary just for you.</p>
        </div>

        <div className="custom-ai-wrapper card">
          <form className="custom-ai-form" onSubmit={handleGenerateFreeItinerary}>
            <div className="custom-ai-grid">
              {/* ... existing form groups ... */}
              <div className="form-group">
                <label>Budget ($)</label>
                <input 
                  type="number" 
                  name="budget" 
                  className="form-control" 
                  value={formData.budget} 
                  onChange={handleInputChange} 
                  min="100" 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Travel Type</label>
                <select name="travel_type" className="form-control" value={formData.travel_type} onChange={handleInputChange}>
                  <option value="Solo">Solo</option>
                  <option value="Family">Family</option>
                  <option value="Friends">Friends</option>
                  <option value="Couple">Couple</option>
                </select>
              </div>

              <div className="form-group">
                <label>Duration (Days)</label>
                <input 
                  type="number" 
                  name="duration" 
                  className="form-control" 
                  value={formData.duration} 
                  onChange={handleInputChange} 
                  min="1" 
                  max="30" 
                  required 
                />
              </div>

              <div className="form-group" style={{gridColumn: '1 / -1'}}>
                <label>Interests</label>
                <div className="custom-ai-interests">
                  {interestOptions.map((option) => (
                    <div 
                      key={option} 
                      className={`interest-pill ${formData.interests.includes(option) ? 'active' : ''}`}
                      onClick={() => toggleInterest(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full mt-24" disabled={freeLoading}>
              {freeLoading ? 'Generating...' : 'Generate AI Trip (Local)'}
            </button>
          </form>

          {error && <div className="error-message mt-24">{error}</div>}

          {aiItinerary && (
            <div className="ai-result-display animate-fade-in mt-32">
              <div className="ai-result-header">
                <h3>✨ Your AI Itinerary</h3>
              </div>
              <div className="ai-result-content">
                {aiItinerary}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CustomTrip;

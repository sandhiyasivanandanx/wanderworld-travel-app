import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Sparkles, MapPin, Calendar, DollarSign, Users, Briefcase, Camera, Heart, Utensils, Zap, Coffee, Globe } from 'lucide-react';
import './AdvancedPlanner.css';

const AdvancedPlanner = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    destination: '',
    budget: 5000,
    duration: 3,
    travel_type: 'Family',
    travel_pace: 'Balanced',
    interests: ['Nature', 'Relaxation']
  });

  // Dynamic Parsing for NLP Feel
  useEffect(() => {
    const desc = formData.description.toLowerCase();
    
    // Extract numbers before 'days' or 'day'
    const daysMatch = desc.match(/(\d+)\s*(days|day)/);
    if (daysMatch) {
      const days = parseInt(daysMatch[1]);
      if (days > 0 && days <= 10) setFormData(prev => ({ ...prev, duration: days }));
    }

    // Attempt to extract destination (very basic heuristic)
    const locations = ['ooty', 'goa', 'paris', 'tokyo', 'mumbai', 'delhi', 'london', 'shimla', 'bali'];
    const foundLocation = locations.find(loc => desc.includes(loc));
    if (foundLocation) {
      setFormData(prev => ({ ...prev, destination: foundLocation.charAt(0).toUpperCase() + foundLocation.slice(1) }));
    }
  }, [formData.description]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleInterest = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest) 
        ? prev.interests.filter(i => i !== interest) 
        : [...prev.interests, interest]
    }));
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/free-itinerary/advanced', {
        ...formData,
        interests: formData.interests
      });
      navigate('/itinerary', { state: { itinerary: response.data, originalQuery: formData } });
    } catch (error) {
      console.error('Generation failed:', error);
      alert('Simulation error. Please check backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="advanced-planner-section">
      <div className="planner-container-3col">
        <header className="planner-header-lite">
          <h2 className="serif text-gradient">Architect Your Journey</h2>
          <p className="text-muted">A data-driven blueprint for your next global escapade.</p>
        </header>

        <form className="tp-3col-grid-form" onSubmit={handleGenerate}>
          <div className="tp-grid-wrapper">
            
            {/* COLUMN 1: TRIP DESCRIPTION */}
            <div className="tp-col tp-col-left">
              <label className="tp-label-lite"><Camera size={12} className="mr-8"/> THE VISION & STORY</label>
              <textarea 
                name="description"
                className="tp-textarea-3col"
                placeholder="Describe your dream trip (e.g., '3 days in Ooty with family, looking for relaxation and nature...')"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
              <div className="tp-hint mt-12">
                <Sparkles size={10} className="mr-4"/> AI extracts duration & destination automatically.
              </div>
            </div>

            {/* COLUMN 2: CORE INPUTS */}
            <div className="tp-col tp-col-center">
              <div className="tp-input-stack">
                <div className="field-block">
                  <label className="tp-label-lite"><MapPin size={12}/> DESTINATION</label>
                  <input 
                    name="destination"
                    className="tp-input-3col"
                    value={formData.destination}
                    onChange={handleInputChange}
                    placeholder="Where to?"
                    required
                  />
                </div>
                <div className="field-block mt-16">
                  <label className="tp-label-lite"><Calendar size={12}/> DURATION (DAYS)</label>
                  <input 
                    name="duration"
                    type="number"
                    min="1" max="10"
                    className="tp-input-3col"
                    value={formData.duration}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="field-block mt-16">
                  <label className="tp-label-lite"><DollarSign size={12}/> BUDGET ESTIMATE</label>
                  <input 
                    name="budget"
                    type="number"
                    className="tp-input-3col"
                    value={formData.budget}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="field-block mt-16">
                  <label className="tp-label-lite"><Users size={12}/> COMPANION</label>
                  <select 
                    name="travel_type"
                    className="tp-select-3col"
                    value={formData.travel_type}
                    onChange={handleInputChange}
                  >
                    <option value="Solo">Solo Traveler</option>
                    <option value="Friends">With Friends</option>
                    <option value="Family">Family Voyage</option>
                    <option value="Couple">Romantic Duo</option>
                  </select>
                </div>
              </div>
            </div>

            {/* COLUMN 3: PREFERENCES */}
            <div className="tp-col tp-col-right">
              <div className="preference-section">
                <label className="tp-label-lite"><Briefcase size={12}/> TRAVEL PACE</label>
                <div className="tp-toggle-group mt-8">
                  {['Relaxed', 'Balanced', 'Packed'].map(pace => (
                    <button 
                      key={pace}
                      type="button"
                      className={`tp-toggle-btn ${formData.travel_pace === pace ? 'active' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, travel_pace: pace }))}
                    >
                      {pace}
                    </button>
                  ))}
                </div>
              </div>

              <div className="preference-section mt-24">
                <label className="tp-label-lite"><Heart size={12}/> CORE INTERESTS</label>
                <div className="tp-chips-grid mt-12">
                  {['Adventure', 'Nature', 'Food', 'Culture', 'Shopping', 'History'].map(interest => (
                    <button 
                      key={interest}
                      type="button"
                      className={`tp-interest-chip ${formData.interests.includes(interest) ? 'selected' : ''}`}
                      onClick={() => toggleInterest(interest)}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* BOTTOM SECTION: CTA */}
          <div className="tp-bottom-actions mt-32">
            <button 
              className="tp-btn-generate-main" 
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span className="flex align-center gap-8">
                  <Globe size={18} className="animate-spin"/> Architecting Masterplan...
                </span>
              ) : (
                <span className="flex align-center gap-8">
                  <Zap size={18}/> Generate Detailed Itinerary
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AdvancedPlanner;

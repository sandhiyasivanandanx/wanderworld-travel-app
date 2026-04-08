import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Plus, Minus } from 'lucide-react';
import './ItineraryView.css';

const ItineraryView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { itinerary, originalQuery } = location.state || {};
  
  const [expandedDay, setExpandedDay] = useState(1);

  useEffect(() => {
    if (!itinerary) {
      navigate('/planner');
    }
  }, [itinerary, navigate]);

  if (!itinerary) return null;

  const formatPriceValue = (p) => `₹${Math.round(p).toLocaleString('en-IN')}`;

  const grandTotal = itinerary.total_estimated_cost;
  const durationDays = itinerary.itinerary.length;
  const destinationName = itinerary.destination || "Your Destination";

  return (
    <div className="iv-page-viewport">
      <div className="iv-page-container">
        
        <div className="iv-grid">
          {/* LEFT SIDE (70%) */}
          <div className="iv-left-column">
            <h1 className="iv-main-title">Your {durationDays}-Day Itinerary</h1>
            
            <div className="iv-accordion-list">
              {itinerary.itinerary.map((day) => {
                const isExpanded = expandedDay === day.day;
                const mainTitle = day.morning?.title || day.afternoon?.title || 'Arrival & Check-in';
                
                return (
                  <div key={day.day} className={`iv-accordion-card ${isExpanded ? 'is-expanded' : ''}`}>
                    <div 
                      className="iv-accordion-header" 
                      onClick={() => setExpandedDay(isExpanded ? null : day.day)}
                    >
                      <div className="iv-accordion-title">
                        <span className="iv-day-badge">📍 Day {day.day < 10 ? `0${day.day}` : day.day}:</span>
                        <span className="iv-day-topic">{destinationName} — {mainTitle}</span>
                      </div>
                      <div className="iv-accordion-icon">
                        {isExpanded ? <Minus size={18} /> : <Plus size={18} />}
                      </div>
                    </div>
                    
                    {isExpanded && (
                      <div className="iv-accordion-body">
                        <ul className="iv-activity-list">
                          {['morning', 'afternoon', 'evening'].map(slot => {
                            const act = day[slot];
                            if (!act) return null;
                            return (
                              <li key={slot} className="iv-activity-item">
                                <div className="iv-bullet"></div>
                                <div className="iv-activity-content">
                                  <strong>{act.title}</strong>
                                  {act.reason && <div className="iv-activity-desc">{act.reason}</div>}
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE (30%) */}
          <div className="iv-right-column">
            <div className="iv-booking-card">
              <div className="iv-booking-header">
                <h3>Trip Summary</h3>
              </div>
              
              <div className="iv-booking-details">
                <div className="iv-booking-row">
                  <span className="iv-booking-label">Destination:</span>
                  <span className="iv-booking-value">{destinationName}</span>
                </div>
                <div className="iv-booking-row">
                  <span className="iv-booking-label">Duration:</span>
                  <span className="iv-booking-value">{durationDays} Days / {Math.max(1, durationDays - 1)} Nights</span>
                </div>
              </div>
              
              <div className="iv-booking-divider"></div>
              
              <div className="iv-booking-price-section">
                <div className="iv-price-label">Price</div>
                <div className="iv-price-amount">{formatPriceValue(grandTotal)}</div>
                <div className="iv-price-emi">EMI available from ₹2,500/month</div>
              </div>

              <div className="iv-booking-actions">
                <button 
                  className="iv-btn-primary"
                  onClick={() => navigate('/booking', { state: { itinerary, originalQuery, currency: { symbol: '₹', rate: 1 } } })}
                >
                  Book Now
                </button>
                <button className="iv-btn-secondary">
                  Enquire Now
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ItineraryView;

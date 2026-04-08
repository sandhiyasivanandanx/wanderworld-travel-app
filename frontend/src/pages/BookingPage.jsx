import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, ArrowRight, ShieldCheck, CreditCard } from 'lucide-react';
import './BookingPage.css';

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { itinerary, tour, place, originalQuery, currency } = location.state || {};
  const currentCurrency = currency || { symbol: '₹', rate: 80 };

  const [bookingData, setBookingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    adults: 1,
    children: 0,
    category: 'Standard',
    startDate: ''
  });

  useEffect(() => {
    if (!itinerary && !tour && !place) {
      navigate('/planner');
    }
  }, [itinerary, tour, place, navigate]);

  const handleInputChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/payment', { 
      state: { itinerary, tour, place, originalQuery, bookingData, currency: currentCurrency } 
    });
  };

  if (!itinerary && !tour && !place) return null;

  const getBaseCost = () => {
    if (tour) return tour.price * bookingData.adults;
    if (itinerary) return Math.round(itinerary.total_estimated_cost);
    return 1000 * bookingData.adults; // Fallback if only place is selected directly from card without itinerary generated yet
  };

  const getDestinationName = () => {
    if (tour) return tour.title;
    if (place) return place.name;
    if (itinerary) return itinerary.destination;
    return "Unknown Destination";
  };

  const baseCost = getBaseCost();
  const tax = Math.round(baseCost * 0.04);
  const grandTotal = baseCost + tax;

  const formatPrice = (p) => `₹${p.toLocaleString('en-IN')}`;

  return (
    <div className="bk-fixed-viewport">
      <div className="bk-main-modal shadow-premium max-w-4xl mx-auto p-4 gap-3">
        
        {/* Header: Zero-Scroll Context */}
        <header className="bk-mini-header">
           <button className="bk-back-btn" onClick={() => navigate(-1)}><ChevronLeft size={12}/></button>
           <h1 className="serif text-gradient text-lg ml-12">Finalize Architecture</h1>
        </header>

        {/* 2-Column Core Layout */}
        <div className="bk-core-split">
            
            {/* Left: Compact Form Grid */}
            <form className="bk-form-pane" onSubmit={handleSubmit}>
                <div className="bk-form-grid-2">
                    {/* Left Column of Form */}
                    <div className="bk-form-col">
                        <label className="text-xs font-bold text-muted uppercase tracking-widest mb-4">First Name</label>
                        <input type="text" name="firstName" className="bk-input-mini" placeholder="JOHN" value={bookingData.firstName} onChange={handleInputChange} required />
                        
                        <label className="text-xs font-bold text-muted uppercase tracking-widest mt-12 mb-4">Last Name</label>
                        <input type="text" name="lastName" className="bk-input-mini" placeholder="DOE" value={bookingData.lastName} onChange={handleInputChange} required />
                        
                        <label className="text-xs font-bold text-muted uppercase tracking-widest mt-12 mb-4">Email</label>
                        <input type="email" name="email" className="bk-input-mini" placeholder="john@example.com" value={bookingData.email} onChange={handleInputChange} required />
                        
                        <label className="text-xs font-bold text-muted uppercase tracking-widest mt-12 mb-4">Phone</label>
                        <input type="tel" name="phone" className="bk-input-mini" placeholder="+91 0000000000" value={bookingData.phone} onChange={handleInputChange} required />
                    </div>

                    {/* Right Column of Form */}
                    <div className="bk-form-col">
                        <label className="text-xs font-bold text-muted uppercase tracking-widest mb-4">Adults</label>
                        <input type="number" name="adults" className="bk-input-mini" value={bookingData.adults} onChange={handleInputChange} min="1" required />
                        
                        <label className="text-xs font-bold text-muted uppercase tracking-widest mt-12 mb-4">Children</label>
                        <input type="number" name="children" className="bk-input-mini" value={bookingData.children} onChange={handleInputChange} min="0" required />
                        
                        <label className="text-xs font-bold text-muted uppercase tracking-widest mt-12 mb-4">Departure Date</label>
                        <input type="date" name="startDate" className="bk-input-mini" value={bookingData.startDate} onChange={handleInputChange} required />
                        
                        <label className="text-xs font-bold text-muted uppercase tracking-widest mt-12 mb-4">Travel Tier</label>
                        <select name="category" className="bk-input-mini" value={bookingData.category} onChange={handleInputChange}>
                            <option>Budget</option>
                            <option>Standard</option>
                            <option>Luxury</option>
                        </select>
                    </div>
                </div>

                <div className="bk-cta-box mt-4">
                    <button type="submit" className="btn-reserve-orange w-full py-2 text-sm font-medium rounded-lg text-white">
                        RESERVE VOYAGE
                    </button>
                    <div className="bk-security text-10 text-muted mt-8 flex items-center justify-center gap-4">
                        <ShieldCheck size={10} />
                        <span>Tactical Encryption Enabled — Secure architectural platform.</span>
                    </div>
                </div>
            </form>

            {/* Right: Fixed Price Card - Aligned and Spaced */}
            <aside className="bk-price-sidebar-pane ml-4">
                <div className="bk-price-card-styled shadow-glow w-64 p-4 space-y-3">
                    <h3 className="serif text-base text-white border-b-1 pb-4">Voyage Ledger</h3>
                    
                    <div className="bk-price-ledger text-sm space-y-2">
                        <div className="ledg-row flex justify-between items-center text-muted">
                            <span>Architecture Fee</span>
                            <span className="font-bold text-white">{formatPrice(baseCost)}</span>
                        </div>
                        <div className="ledg-row flex justify-between items-center text-muted">
                            <span>Service Tax (4%)</span>
                            <span className="font-bold text-white">{formatPrice(tax)}</span>
                        </div>
                        
                        <div className="ledg-divider border-t border-white-opacity-05 my-3"></div>

                        <div className="ledg-total flex justify-between items-center bg-primary-dark p-2 rounded-lg">
                            <span className="text-xs text-primary uppercase font-bold tracking-widest">Grand Total</span>
                            <span className="text-xl font-bold text-primary">{formatPrice(grandTotal)}</span>
                        </div>
                    </div>

                    <div className="bk-summary-mini mt-4 text-xs text-muted">
                        <CreditCard size={12} className="mb-4 text-primary" />
                        <p>Secure reservation for your {getDestinationName()} expedition.</p>
                    </div>
                </div>
            </aside>

        </div>
      </div>
    </div>
  );
};

export default BookingPage;

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { ChevronLeft, CheckCircle, ShieldCheck, CreditCard, Smartphone, Info } from 'lucide-react';
import './PaymentPage.css';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { itinerary, tour, place, originalQuery, bookingData, currency } = location.state || {};
  const currentCurrency = currency || { symbol: '$', rate: 1 };

  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    if (!itinerary && !tour && !place && !bookingData) {
      navigate('/planner');
    }
    window.scrollTo(0, 0);
  }, [itinerary, tour, place, bookingData, navigate]);

  if ((!itinerary && !tour && !place) || !bookingData) return null;

  const getBaseCost = () => {
    if (tour) return tour.price * bookingData.adults;
    if (itinerary) return Math.round(itinerary.total_estimated_cost);
    return 1000 * bookingData.adults;
  };

  const getDestinationName = () => {
    if (tour) return tour.title;
    if (place) return place.name;
    if (itinerary) return itinerary.destination;
    return "Unknown Destination";
  };

  const baseCost = getBaseCost();
  const totalAmount = (baseCost * 1.04).toFixed(2);
  const localTotal = Math.round(baseCost * 1.04 * currentCurrency.rate);
  
  const upiId = "travelapp@upi";
  const upiUrl = `upi://pay?pa=${upiId}&pn=TravelApp&am=${localTotal}&cu=USD`;

  const handlePayment = () => {
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setPaid(true);
    }, 2000);
  };

  if (paid) {
    return (
      <div className="payment-success-overlay animate-fade-in">
        <div className="success-content-card shadow-glow">
          <div className="success-icon-wrap">
            <CheckCircle size={64} color="#10b981" />
          </div>
          <h1 className="serif mt-24">Booking Confirmed!</h1>
          <p className="text-muted mt-8">Your journey to {getDestinationName()} is officially reserved.</p>
          
          <div className="success-receipt-box mt-32">
            <div className="receipt-row"><span>Traveller</span> <span>{bookingData.firstName} {bookingData.lastName}</span></div>
            <div className="receipt-row"><span>Destination</span> <span>{getDestinationName()}</span></div>
            <div className="receipt-row"><span>Start Date</span> <span>{bookingData.startDate}</span></div>
            <div className="receipt-row highlight"><span>Amount Paid</span> <span>{currentCurrency.symbol}{localTotal}</span></div>
          </div>

          <button className="tp-btn-submit-glow w-full mt-40" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page-container">
      <div className="payment-layout shadow-premium">
        {/* Left Side: Payment Logic */}
        <div className="payment-controls-side">
          <header className="payment-header">
            <button className="btn-back-minimal" onClick={() => navigate(-1)}>
              <ChevronLeft size={16} />
              <span>Back to Booking</span>
            </button>
            <h1 className="serif mt-16 font-bold text-gradient">Secure Payment</h1>
            <p className="text-muted text-sm mt-8">Choose your preferred method to finalize the booking.</p>
          </header>

          <div className="payment-methods-grid mt-32">
            <button 
              className={`method-btn ${paymentMethod === 'upi' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('upi')}
            >
              <Smartphone size={20} />
              <span>UPI / QR Scan</span>
            </button>
            <button 
              className={`method-btn ${paymentMethod === 'card' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('card')}
            >
              <CreditCard size={20} />
              <span>Card Payment</span>
            </button>
          </div>

          <div className="payment-method-canvas mt-32">
            {paymentMethod === 'upi' ? (
              <div className="upi-payment-view animate-fade-in">
                <div className="qr-container-premium">
                  <QRCodeSVG value={upiUrl} size={180} level="H" />
                </div>
                <div className="upi-info-text text-center mt-24">
                  <p className="text-muted text-xs">Scan the code above with any UPI app to pay</p>
                  <div className="upi-id-badge mt-12">
                    <code>{upiId}</code>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card-payment-view animate-fade-in">
                <div className="form-group">
                  <label>Cardholder Name</label>
                  <input type="text" className="form-input-refined" placeholder="EX: JOHN DOE" disabled />
                </div>
                <div className="form-group mt-16">
                  <label>Card Number</label>
                  <input type="text" className="form-input-refined" placeholder="0000 0000 0000 0000" disabled />
                </div>
                <div className="form-grid-2 mt-16">
                  <div className="field-group">
                    <label>Expiry</label>
                    <input type="text" className="form-input-refined" placeholder="MM/YY" disabled />
                  </div>
                  <div className="field-group">
                    <label>CVV</label>
                    <input type="text" className="form-input-refined" placeholder="***" disabled />
                  </div>
                </div>
                <div className="demo-notice mt-16">
                  <Info size={12} />
                  <span>Card demo mode: Use UPI for simulation.</span>
                </div>
              </div>
            )}
          </div>

          <div className="payment-footer mt-40">
            <button className="tp-btn-submit-glow w-full" onClick={handlePayment} disabled={loading}>
              {loading ? 'Verifying Transaction...' : `Confirm Payment — ${currentCurrency.symbol}${localTotal}`}
            </button>
            <div className="security-badges mt-24">
              <span className="badge-item"><ShieldCheck size={14} color="#10b981" /> SSL Secured</span>
              <span className="badge-item"><ShieldCheck size={14} color="#10b981" /> PCI DSS compliant</span>
            </div>
          </div>
        </div>

        {/* Right Side: Final Summary */}
        <div className="payment-summary-side">
          <div className="payment-summary-box">
            <h3 className="serif font-bold text-20 mb-24">Trip Summary</h3>
            
            <div className="order-details-pane">
              <div className="order-row">
                <span className="label">Planned Route</span>
                <span className="val">{getDestinationName()} Masterplan</span>
              </div>
              <div className="order-row">
                <span className="label">Travellers</span>
                <span className="val">{bookingData.adults} Adults, {bookingData.children} Children</span>
              </div>
              <div className="order-row">
                <span className="label">Duration</span>
                <span className="val">{originalQuery?.duration || tour?.duration_days || (itinerary?.itinerary?.length || 3)} Days</span>
              </div>
            </div>

            <div className="order-pricing-pane mt-32 pt-24 border-t">
              <div className="price-row-lite">
                <span>Architecture Fee</span>
                <span>{currentCurrency.symbol}{Math.round(baseCost * currentCurrency.rate)}</span>
              </div>
              <div className="price-row-lite">
                <span>Service Tax (4%)</span>
                <span>{currentCurrency.symbol}{Math.round(baseCost * 0.04 * currentCurrency.rate)}</span>
              </div>
              <div className="price-row-lite total-row mt-16 pt-16 border-t font-bold">
                <span>Payable Amount</span>
                <span className="text-primary text-24">{currentCurrency.symbol}{localTotal}</span>
              </div>
            </div>

            <div className="summary-footer-tip mt-40">
              <p className="text-muted text-xs italic">"Travel is the only thing you buy that makes you richer."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

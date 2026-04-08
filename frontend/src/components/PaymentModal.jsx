import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { updateBookingStatus } from '../api/client';
import './PaymentModal.css';

const PaymentModal = ({ booking, tour, onPaymentComplete, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' or 'card'
  const upiId = "travelapp@upi";
  const upiUrl = `upi://pay?pa=${upiId}&pn=TravelApp&am=${booking.total_price}&cu=USD`;

  const handlePaymentSubmit = async () => {
    setLoading(true);
    try {
      await updateBookingStatus(booking.id, 'paid');
      onPaymentComplete();
    } catch (err) {
      console.error('Payment verification failed:', err);
      alert('Simulation error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-overlay">
      <div className="checkout-container container">
        <div className="checkout-grid">
          {/* Left Panel: Payment Options */}
          <div className="checkout-left card">
            <header className="checkout-header">
              <h2>Checkout Settings</h2>
              <p className="text-muted">Select your preferred payment method</p>
            </header>

            <div className="payment-methods mt-32">
              <button 
                className={`method-toggle ${paymentMethod === 'upi' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('upi')}
              >
                <span className="icon">📱</span>
                <span className="label">UPI / QR Scan</span>
              </button>
              <button 
                className={`method-toggle ${paymentMethod === 'card' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                <span className="icon">💳</span>
                <span className="label">Credit / Debit Card</span>
              </button>
            </div>

            <div className="payment-content mt-32">
              {paymentMethod === 'upi' ? (
                <div className="upi-section animate-fade">
                  <div className="qr-wrapper-modern">
                    <QRCodeSVG value={upiUrl} size={160} level="H" includeMargin={false} />
                  </div>
                  <div className="upi-details text-center mt-24">
                    <p className="text-muted text-14">Scan this QR code using GPay, PhonePe, or any UPI app</p>
                    <div className="copy-upi-box mt-16">
                      <code>{upiId}</code>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card-section animate-fade">
                  <div className="form-group mb-16">
                    <label>Card Number</label>
                    <input type="text" className="form-control" placeholder="0000 0000 0000 0000" disabled />
                  </div>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input type="text" className="form-control" placeholder="MM/YY" disabled />
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input type="text" className="form-control" placeholder="***" disabled />
                    </div>
                  </div>
                  <p className="text-muted text-12 mt-16">Card payment is currently in demo mode.</p>
                </div>
              )}
            </div>

            <div className="payment-actions mt-40">
              <button 
                className="btn btn-primary w-full" 
                onClick={handlePaymentSubmit}
                disabled={loading}
              >
                {loading ? 'Processing Payment...' : 'Confirm & Mark as Paid'}
              </button>
              <button className="btn btn-ghost w-full mt-12" onClick={onCancel} disabled={loading}>
                Back to Details
              </button>
            </div>
            
            <p className="text-center mt-24 text-12 text-muted">
              🔒 This is a secure demo environment. No real data is collected.
            </p>
          </div>

          {/* Right Panel: Order Summary */}
          <div className="checkout-right">
            <div className="summary-sticky card">
              <div className="summary-hero">
                <img src={tour?.cover_image} alt={tour?.title} />
                <div className="summary-hero-overlay">
                  <h3>{tour?.title}</h3>
                  <span className="badge-luxury">{tour?.difficulty} Trip</span>
                </div>
              </div>

              <div className="summary-body">
                <div className="summary-section">
                  <div className="summary-row">
                    <span className="label">Date</span>
                    <span className="val">{booking.travel_date}</span>
                  </div>
                  <div className="summary-row">
                    <span className="label">Travellers</span>
                    <span className="val">{booking.num_travelers} People</span>
                  </div>
                  <div className="summary-row">
                    <span className="label">Type</span>
                    <span className="val">{booking.travel_type}</span>
                  </div>
                </div>

                <div className="summary-breakdown mt-24">
                  <div className="breakdown-row">
                    <span>Adults ({booking.num_adults}x)</span>
                    <span>${(booking.num_adults * (tour?.price || 0)).toLocaleString()}</span>
                  </div>
                  {booking.num_children > 0 && (
                    <div className="breakdown-row">
                      <span>Children ({booking.num_children}x)</span>
                      <span>${(booking.num_children * (tour?.price || 0)).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="breakdown-row">
                    <span>Platform Fee</span>
                    <span className="text-success">FREE</span>
                  </div>
                </div>

                <div className="summary-total mt-24">
                  <div className="total-label">Total to Pay</div>
                  <div className="total-amount">${booking.total_price.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;

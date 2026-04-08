import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getTour, createBooking } from '../api/client'
import PaymentModal from '../components/PaymentModal'
import './BookingForm.css'

const INITIAL = {
  first_name: '', last_name: '', email: '', phone: '',
  num_adults: 1, num_children: 0, travel_type: 'Family',
  travel_date: '', special_requests: '',
}

export default function BookingForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tour, setTour] = useState(null)
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(null)
  const [bookingForPayment, setBookingForPayment] = useState(null)

  useEffect(() => {
    getTour(id).then(r => setTour(r.data)).catch(() => {})
    window.scrollTo(0, 0)
  }, [id])

  const totalPax = Number(form.num_adults) + Number(form.num_children)
  const totalPrice = tour ? tour.price * totalPax : 0

  const validate = () => {
    const e = {}
    if (!form.first_name.trim()) e.first_name = 'First name is required'
    if (!form.last_name.trim()) e.last_name = 'Last name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required'
    if (!form.phone.trim()) e.phone = 'Phone number is required'
    if (!form.travel_date) e.travel_date = 'Please select a date'
    if (totalPax < 1) e.pax = 'At least 1 traveller required'
    return e
  }

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitting(true)
    try {
      const res = await createBooking({
        package_id: Number(id),
        ...form,
        num_travelers: totalPax,
        num_adults: Number(form.num_adults),
        num_children: Number(form.num_children),
        total_price: totalPrice,
      })
      // Open Payment Modal instead of immediate success
      setBookingForPayment(res.data)
    } catch (err) {
      setErrors({ api: 'Booking failed. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="booking-success container">
        <div className="success-page-card card animate-pop">
          <div className="success-icon">🎉</div>
          <h1>Booking Confirmed!</h1>
          <p className="text-muted">Pack your bags! We've sent the itinerary to <b>{success.email}</b>.</p>
          <div className="success-summary mt-24">
            <div className="summary-row"><span>Booking ID</span> <span>#{success.id}</span></div>
            <div className="summary-row"><span>Trip</span> <span>{tour?.title}</span></div>
            <div className="summary-row"><span>Date</span> <span>{success.travel_date}</span></div>
            <div className="summary-row"><span>Adults / Kids</span> <span>{success.num_adults} / {success.num_children}</span></div>
            <div className="summary-row total"><span>Total Paid</span> <span>${success.total_price?.toLocaleString()}</span></div>
          </div>
          <div className="flex gap-16 mt-32" style={{justifyContent:'center'}}>
            <Link to="/tours" className="btn btn-primary">Discover More</Link>
            <Link to="/" className="btn btn-outline">Home</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="booking-page">
      {bookingForPayment && (
        <PaymentModal 
          booking={bookingForPayment} 
          tour={tour} 
          onPaymentComplete={() => {
            setSuccess(bookingForPayment)
            setBookingForPayment(null)
          }}
          onCancel={() => setBookingForPayment(null)}
        />
      )}
      <div className="page-hero compact">
        <div className="container">
          <h1 className="text-40">Finalize Your <span className="text-gradient">Trip</span></h1>
          <p className="text-muted">Enter your details to confirm your space in this tour.</p>
        </div>
      </div>

      <div className="container booking-layout mt-40">
        <form className="booking-form-main" onSubmit={handleSubmit} noValidate>
          {errors.api && <div className="api-error mb-24">{errors.api}</div>}
          
          <section className="form-card">
            <h2 className="form-title">👤 Your Details</h2>
            <div className="form-grid-2">
              <div className="form-group">
                <label>First Name</label>
                <input className={`form-control ${errors.first_name ? 'error' : ''}`} name="first_name" value={form.first_name} onChange={handleChange} />
                {errors.first_name && <span className="error-text">{errors.first_name}</span>}
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input className={`form-control ${errors.last_name ? 'error' : ''}`} name="last_name" value={form.last_name} onChange={handleChange} />
                {errors.last_name && <span className="error-text">{errors.last_name}</span>}
              </div>
            </div>
            <div className="form-grid-2">
              <div className="form-group">
                <label>Email Address</label>
                <input className={`form-control ${errors.email ? 'error' : ''}`} type="email" name="email" value={form.email} onChange={handleChange} />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input className={`form-control ${errors.phone ? 'error' : ''}`} name="phone" value={form.phone} onChange={handleChange} />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>
            </div>
          </section>

          <section className="form-card mt-24">
            <h2 className="form-title">🏨 Trip Customization</h2>
            <div className="form-grid-3">
              <div className="form-group">
                <label>Adults (12+ yrs)</label>
                <select className="form-control" name="num_adults" value={form.num_adults} onChange={handleChange}>
                  {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} Adult{n>1?'s':''}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Children (2-12 yrs)</label>
                <select className="form-control" name="num_children" value={form.num_children} onChange={handleChange}>
                  {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n} Child{n!==1?'ren':''}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Travel Category</label>
                <select className="form-control" name="travel_type" value={form.travel_type} onChange={handleChange}>
                  <option value="Family">👨‍👩‍👧‍👦 Family</option>
                  <option value="Honeymoon">💕 Honeymoon</option>
                  <option value="Friends">🍻 Friends</option>
                  <option value="Corporate">🏢 Corporate</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Preferred Start Date</label>
              <input className={`form-control ${errors.travel_date ? 'error' : ''}`} type="date" name="travel_date" value={form.travel_date} onChange={handleChange} min={new Date().toISOString().split('T')[0]} />
              {errors.travel_date && <span className="error-text">{errors.travel_date}</span>}
            </div>
            <div className="form-group">
              <label>Special Requests</label>
              <textarea className="form-control" name="special_requests" rows="4" placeholder="Dietary needs, allergies, room preferences..." value={form.special_requests} onChange={handleChange}></textarea>
            </div>
          </section>

          <button className="btn btn-primary w-full mt-32 submit-btn" disabled={submitting}>
            {submitting ? 'Processing...' : `Proceed to Payment — $${totalPrice.toLocaleString()}`}
          </button>
        </form>

        <aside className="booking-summary-sidebar">
          {tour && (
            <div className="summary-card card sticky">
              <img src={tour.cover_image} alt={tour.title} className="summary-thumb" />
              <div className="summary-body">
                <h3>{tour.title}</h3>
                <div className="summary-detail mt-16">
                  <div className="row"><span>Duration</span> <span>{tour.duration_days} Days</span></div>
                  <div className="row"><span>Difficulty</span> <span>{tour.difficulty}</span></div>
                  <div className="row"><span>Base Price</span> <span>${tour.price.toLocaleString()}</span></div>
                  <div className="row"><span>Travelers</span> <span>{totalPax} Total</span></div>
                  <div className="row total"><span>Total Amount</span> <span className="final-price">${totalPrice.toLocaleString()}</span></div>
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

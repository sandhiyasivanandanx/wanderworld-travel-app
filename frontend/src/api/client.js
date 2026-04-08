import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

export const getCountries = () => api.get('/destinations/countries')
export const getCountry = (id) => api.get(`/destinations/countries/${id}`)
export const getPlaces = (countryId) =>
  api.get('/destinations/places', { params: (countryId !== null && countryId !== undefined) ? { country_id: countryId } : {} })
export const getPlace = (id) => api.get(`/destinations/places/${id}`)

export const getTours = () => api.get('/tours/')
export const getTour = (id) => api.get(`/tours/${id}`)

export const createBooking = (data) => api.post('/bookings/', data)
export const getBooking = (id) => api.get(`/bookings/${id}`)
export const updateBookingStatus = (id, status) => api.patch(`/bookings/${id}/status`, null, { params: { status } })

export default api

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Destinations from './pages/Destinations'
import GroupTours from './pages/GroupTours'
import PackageDetails from './pages/PackageDetails'
import BookingForm from './pages/BookingForm'
import StyleDetail from './pages/StyleDetail'
import Login from './pages/Login'
import TripPlanner from './pages/TripPlanner'
import ItineraryView from './pages/ItineraryView'
import BookingPage from './pages/BookingPage'
import PaymentPage from './pages/PaymentPage'
import PlaceItineraryPage from './pages/PlaceItineraryPage'

export default function App() {
  return (
    <BrowserRouter>
      <NavbarWrapper />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/tours" element={<GroupTours />} />
        <Route path="/tours/:id" element={<PackageDetails />} />
        <Route path="/book/:id" element={<BookingForm />} />
        <Route path="/style/:name" element={<StyleDetail />} />
        <Route path="/planner" element={<TripPlanner />} />
        <Route path="/itinerary" element={<ItineraryView />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/itinerary/:id" element={<PlaceItineraryPage />} />
      </Routes>
    </BrowserRouter>
  )
}

function NavbarWrapper() {
  const location = useLocation();
  if (location.pathname === '/login') return null;
  return <Navbar />;
}

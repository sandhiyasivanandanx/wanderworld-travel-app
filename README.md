# WanderWorld — Travel Recommendation App

A full-stack travel recommendation web application built with **React + Vite** (frontend) and **FastAPI + PostgreSQL** (backend).

---

## 📁 Project Structure

```
travel-app/
├── backend/          ← FastAPI + SQLAlchemy
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── database.py
│   ├── seed_data.py
│   ├── routers/
│   │   ├── destinations.py
│   │   ├── tours.py
│   │   └── bookings.py
│   ├── .env
│   └── requirements.txt
└── frontend/         ← React + Vite
    ├── src/
    │   ├── pages/    ← Home, Destinations, GroupTours, PackageDetails, BookingForm
    │   ├── components/
    │   ├── api/
    │   └── styles/
    └── package.json
```

---

## ⚙️ Setup Instructions

### 1. PostgreSQL Database

Make sure PostgreSQL is running. Create the database:

```sql
CREATE DATABASE traveldb;
```

Update `backend/.env` if your credentials differ:

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/traveldb
```

---

### 2. Backend Setup

```bash
cd travel-app/backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Seed the database (10 countries × 10 places + 8 tour packages)
python seed_data.py

# Start the API server
uvicorn main:app --reload --port 8000
```

API will be available at: **http://localhost:8000**  
Interactive docs: **http://localhost:8000/docs**

---

### 3. Frontend Setup

```bash
cd travel-app/frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Frontend will be available at: **http://localhost:5173**

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/destinations/countries` | List all 10 countries |
| GET | `/api/destinations/countries/{id}` | Country with places |
| GET | `/api/destinations/places` | All places (filter by `country_id`) |
| GET | `/api/destinations/places/{id}` | Single place with hotels |
| GET | `/api/tours/` | All tour packages |
| GET | `/api/tours/{id}` | Single tour with itinerary |
| POST | `/api/bookings/` | Create a booking |
| GET | `/api/bookings/{id}` | Get booking by ID |

---

## ✨ Features

- **10 Countries** — Japan, Italy, India, Australia, Brazil, France, Egypt, USA, Thailand, Peru
- **100 Places** — 10 per country with description, rating, best time, and category
- **8 Group Tour Packages** — Full itineraries (10–14 days), pricing, and difficulty levels
- **Image Slider** — Auto-play hero slider with Ken Burns effect on the Home page
- **Expandable Itinerary** — Accordion-style day-by-day breakdown on Package Details
- **Booking Form** — Full validation, success confirmation screen
- **Search & Filter** — Live search on Destinations, filter+sort on Group Tours
- **Responsive Design** — Mobile-friendly dark-mode UI

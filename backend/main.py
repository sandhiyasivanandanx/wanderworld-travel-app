from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine
import models
from routers import destinations, tours, bookings, recommendations, free_itinerary, ai_itinerary, gemini_itinerary
from seed_data import seed

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Travel Recommendation API", version="1.0.0")

@app.on_event("startup")
async def startup_event():
    """Initialize database with seed data on app startup"""
    seed()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(destinations.router)
app.include_router(tours.router)
app.include_router(bookings.router)
app.include_router(recommendations.router)
app.include_router(free_itinerary.router)
app.include_router(ai_itinerary.router)
app.include_router(gemini_itinerary.router)

@app.get("/")
def root():
    return {"message": "Travel Recommendation API is running 🌍"}

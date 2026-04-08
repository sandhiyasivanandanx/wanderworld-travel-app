from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models
from pydantic import BaseModel
from typing import List, Optional
import random

router = APIRouter(
    prefix="/api/recommendations",
    tags=["recommendations"]
)

class TripRequest(BaseModel):
    budget: float
    travel_type: str  # solo/family/friends
    interests: List[str]  # beach, hills, adventure, cultural
    duration: int

class ItineraryDay(BaseModel):
    day: int
    activity: str
    tips: str

class TripRecommendation(BaseModel):
    id: int
    title: str
    description: str
    price: float
    duration_days: int
    image_url: str
    itinerary: List[dict]
    highlights: List[str]
    match_score: float
    travel_tips: List[str]

@router.post("/", response_model=List[TripRecommendation])
def suggest_trip(request: TripRequest, db: Session = Depends(get_db)):
    """
    Suggests travel packages based on budget, interests, and duration.
    Uses a simple scoring algorithm:
    - 40% Interest match
    - 30% Budget proximity
    - 20% Duration match
    - 10% Travel type preference
    """
    
    # Get all tour packages from DB
    packages = db.query(models.TourPackage).all()
    
    if not packages:
        # Fallback if no data in DB
        return []

    recommendations = []

    for pkg in packages:
        score = 0.0
        
        # 1. Interest Match (Text-based searching in highlights and description)
        pkg_content = (pkg.description + " " + " ".join(pkg.highlights or [])).lower()
        interest_matches = 0
        for interest in request.interests:
            if interest.lower() in pkg_content:
                interest_matches += 1
        
        if request.interests:
            score += (interest_matches / len(request.interests)) * 40

        # 2. Budget proximity (Prefer packages that are <= budget, but allow some overage)
        if pkg.price <= request.budget:
            score += 30
        elif pkg.price <= request.budget * 1.2:
            score += 15
        
        # 3. Duration match (Proximity to requested duration)
        duration_diff = abs(pkg.duration_days - request.duration)
        if duration_diff == 0:
            score += 20
        elif duration_diff <= 2:
            score += 10
        
        # 4. Travel Type (Bonus score for logic-based compatibility if data existed)
        # For now, give a small random bonus to simulate ML variation or use travel_type if it match certain keywords
        if request.travel_type.lower() in pkg_content:
             score += 10
        else:
             score += 5  # Random base compatibility
        
        # Generate some travel tips based on interests
        tips = [
            f"Make sure to pack appropriate gear for {request.interests[0] if request.interests else 'your trip'}.",
            "Book at least 2 weeks in advance for better rates.",
            f"Ideal for {request.travel_type} trips."
        ]
        
        recommendations.append(TripRecommendation(
            id=pkg.id,
            title=pkg.title,
            description=pkg.description,
            price=pkg.price,
            duration_days=pkg.duration_days,
            image_url=pkg.cover_image,
            itinerary=pkg.itinerary or [],
            highlights=pkg.highlights or [],
            match_score=round(score, 1),
            travel_tips=tips
        ))

    # Sort by score descending and return top 3
    recommendations.sort(key=lambda x: x.match_score, reverse=True)
    return recommendations[:3]

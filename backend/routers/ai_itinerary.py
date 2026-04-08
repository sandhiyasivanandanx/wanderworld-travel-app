from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from typing import List
import os
import logging
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/api/ai-itinerary",
    tags=["ai-itinerary"]
)

api_key = os.getenv("OPENAI_API_KEY")
if not api_key or api_key == "your_openai_api_key_here":
    logger.warning("OPENAI_API_KEY is missing or invalid in .env")
    client = None
else:
    client = OpenAI(api_key=api_key)

class AIItineraryRequest(BaseModel):
    budget: float
    travel_type: str
    interests: List[str]
    duration: int

@router.get("/test")
async def test_api():
    return {"message": "AI Itinerary endpoint is reachable"}

@router.post("/")
async def generate_itinerary(request: AIItineraryRequest):
    logger.info(f"Generating itinerary for: {request}")
    
    if not client:
        logger.error("OpenAI Client is not initialized due to missing API key. Returning fallback.")
        return {"itinerary": f"### 🌟 Fallback AI Itinerary ({request.duration} Days)\n\n**Day 1: Arrival & Exploration**\n- Morning: Check-in and relax.\n- Afternoon: Local sightseeing.\n- Evening: Dinner at a popular spot.\n\n**Day 2: Adventure & Culture**\n- Morning: Guided tour.\n- Afternoon: Shopping or leisure.\n- Evening: Cultural show.\n\n*Note: This is a fallback itinerary generated because the OPENAI_API_KEY is missing.*"}

    prompt = f"""
    Generate a detailed day-wise travel itinerary for a {request.duration}-day trip.
    Target Budget: ${request.budget}
    Travel Type: {request.travel_type}
    Interests: {', '.join(request.interests)}
    
    Plan Requirements:
    1. List of specific destinations/cities.
    2. Detailed daily itinerary (Day 1, Day 2, etc.) including specific spots.
    3. 3-5 practical travel tips.
    
    Format the response as clear, beautifully structured markdown with headers.
    """

    try:
        # Using gpt-4o-mini as requested
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a professional travel planner specializing in high-end, personalized itineraries."},
                {"role": "user", "content": prompt}
            ],
            temperature=1.0 # Higher temperature for more creative/diverse planning
        )
        itinerary_text = response.choices[0].message.content
        logger.info("Successfully generated AI itinerary")
        return {"itinerary": itinerary_text}
        
    except Exception as e:
        logger.error(f"OpenAI API Error: {str(e)}", exc_info=True)
        return {"itinerary": f"### 🌟 Fallback AI Itinerary ({request.duration} Days)\n\n**Day 1: Arrival & Exploration**\n- Morning: Check-in and relax.\n- Afternoon: Local sightseeing.\n- Evening: Dinner at a popular spot.\n\n**Day 2: Adventure & Culture**\n- Morning: Guided tour.\n- Afternoon: Shopping or leisure.\n- Evening: Cultural show.\n\n*Note: This is a fallback itinerary due to API Error: {str(e)}*"}

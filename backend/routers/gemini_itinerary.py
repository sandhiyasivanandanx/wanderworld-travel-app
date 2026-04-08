from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import os
import logging
from dotenv import load_dotenv

load_dotenv()

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/api/gemini-itinerary",
    tags=["gemini-itinerary"]
)

api_key = os.getenv("GEMINI_API_KEY")

# Lazy-load google.genai only when needed to avoid import warnings
_genai_client = None

def get_genai_client():
    global _genai_client
    if _genai_client is None and api_key:
        try:
            import google.generativeai as genai  # noqa: F401
            genai.configure(api_key=api_key)
            _genai_client = genai
        except Exception as e:
            logger.warning(f"Could not initialize Gemini client: {e}")
    return _genai_client

if not api_key:
    logger.warning("GEMINI_API_KEY is missing in .env — Gemini itinerary endpoint will return 503")

class GeminiItineraryRequest(BaseModel):
    budget: float
    travel_type: str
    interests: List[str]
    duration: int

@router.post("/")
async def generate_itinerary(request: GeminiItineraryRequest):
    logger.info(f"Generating Gemini itinerary for: {request}")

    if not api_key:
        logger.warning("GEMINI_API_KEY is not configured. Returning fallback data.");
        return {"itinerary": f"### 🌟 Fallback Gemini Itinerary ({request.duration} Days)\n\n**Day 1: Arrival & Exploration**\n- Morning: Check-in and relax.\n- Afternoon: Local sightseeing.\n- Evening: Dinner at a popular spot.\n\n**Day 2: Adventure & Culture**\n- Morning: Guided tour.\n- Afternoon: Shopping or leisure.\n- Evening: Cultural show.\n\n*Note: This is a fallback itinerary generated because the GEMINI_API_KEY is missing from backend/.env.*"}

    client = get_genai_client()
    if not client:
        return {"itinerary": f"### 🌟 Fallback Gemini Itinerary ({request.duration} Days)\n\n**Day 1: Arrival & Exploration**\n- Morning: Check-in and relax.\n- Afternoon: Local sightseeing.\n- Evening: Dinner at a popular spot.\n\n**Day 2: Adventure & Culture**\n- Morning: Guided tour.\n- Afternoon: Shopping or leisure.\n- Evening: Cultural show.\n\n*Note: Gemini client failed to initialize.*"}

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
        model = client.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        itinerary_text = response.text
        logger.info("Successfully generated Gemini itinerary")
        return {"itinerary": itinerary_text}
    except Exception as e:
        logger.error(f"Gemini API Error: {str(e)}", exc_info=True)
        return {"itinerary": f"### 🌟 Fallback Gemini Itinerary ({request.duration} Days)\n\n**Day 1: Arrival & Exploration**\n- Morning: Check-in and relax.\n- Afternoon: Local sightseeing.\n- Evening: Dinner at a popular spot.\n\n**Day 2: Adventure & Culture**\n- Morning: Guided tour.\n- Afternoon: Shopping or leisure.\n- Evening: Cultural show.\n\n*Note: This is a fallback itinerary due to API Error: {str(e)}*"}

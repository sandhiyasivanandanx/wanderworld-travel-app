from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
import random

router = APIRouter(
    prefix="/api/free-itinerary",
    tags=["free-itinerary"]
)

class FreeItineraryRequest(BaseModel):
    budget: float
    travel_type: str
    interests: List[str]
    duration: int

# Mock data for "AI-style" generation
DESTINATIONS = {
    "Beach": ["Goa", "Bali", "Maldives", "Phuket", "Santorini"],
    "Hills": ["Manali", "Leh", "Shimla", "Swiss Alps", "Munnar"],
    "Adventure": ["Rishikesh", "Queenstown", "Patagonia", "Interlaken"],
    "Cultural": ["Kyoto", "Rome", "Jaipur", "Cusco", "Athens"],
    "City": ["Tokyo", "New York", "Paris", "Dubai", "Singapore"],
    "Nature": ["Iceland", "Amazon Rainforest", "Yellowstone", "Banff"]
}

ACTIVITIES = {
    "Beach": ["Relaxing at the shoreline", "Sunset catamaran cruise", "Scuba diving experience", "Coastal trek", "Local seafood tasting"],
    "Hills": ["Sunrise mountain view", "Pine forest hike", "Visiting local monasteries", "Tea garden tour", "Cozy bonfire night"],
    "Adventure": ["White water rafting", "Bungee jumping", "Mountain biking", "Zip-lining across valleys", "Rock climbing"],
    "Cultural": ["Ancient temple tour", "Traditional cooking class", "Art museum exploration", "Walking through heritage streets", "Craft workshop"],
    "City": ["Vertical city views from skyscraper", "Street food crawl", "Luxury shopping spree", "High-tech museum visit", "Nightlife exploration"],
    "Nature": ["Early morning bird watching", "River jungle safari", "Photography walk", "Stargazing at a remote camp", "Visiting hidden waterfalls"]
}

TIPS = [
    "Pack light and carry a universal travel adapter.",
    "Learn basic local phrases to connect with residents.",
    "Always carry a reusable water bottle to stay hydrated.",
    "Download offline maps before heading to remote areas.",
    "Keep a digital copy of your passport and documents."
]

# Intelligence layer for specific destinations
LOCATION_DATA = {
    "ooty": ["Doddabetta Peak", "Ooty Lake", "Botanical Garden", "Rose Garden", "Sims Park", "Pykara Falls", "Tea Museum", "Nilgiri Mountain Railway", "Avalanche Lake", "Thunder World"],
    "goa": ["Baga Beach", "Aguada Fort", "Basilica of Bom Jesus", "Dudhsagar Falls", "Anjuna Flea Market", "Palolem Beach", "Calangute Beach", "Panjim Latin Quarter", "Scuba Diving in Grande Island", "Go-Karting in Arpora"],
    "bali": ["Uluwatu Temple", "Tegalalang Rice Terrace", "Sacred Monkey Forest", "Mount Batur Sunrise Trek", "Seminyak Beach", "Tanah Lot", "Ubud Art Market", "Nusa Penida Day Trip", "Waterbom Bali", "Besakih Mother Temple"],
    "paris": ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral", "Sacré-Cœur Basilica", "Arc de Triomphe", "Seine River Cruise", "Montmartre Walk", "Palace of Versailles", "Latin Quarter", "Jardin du Luxembourg"],
    "tokyo": ["Shibuya Crossing", "Senso-ji Temple", "Tokyo Skytree", "Meiji Jingu Shrine", "Akihabara Electric Town", "Tsukiji Outer Market", "Shinjuku Gyoen National Garden", "TeamLab Borderless", "Harajuku Takeshita Street", "Tokyo Tower"],
    "london": ["London Eye", "Tower of London", "British Museum", "Buckingham Palace", "Big Ben & Westminster", "The Shard", "Camden Market", "Hyde Park", "Natural History Museum", "Covent Garden"],
    "india": ["Taj Mahal", "Varanasi Ganges Ghats", "Hampi Ruins", "Kerala Backwaters", "Amer Fort Jaipur", "Golden Temple Amritsar", "Mysore Palace", "Ellora Caves", "Sunderbans National Park", "Udaipur City Palace"]
}

@router.post("/")
async def generate_itinerary(request: FreeItineraryRequest):
    # Select a primary destination based on interest
    primary_interest = request.interests[0] if request.interests else "Nature"
    destination_list = DESTINATIONS.get(primary_interest, DESTINATIONS["Nature"])
    destination = random.choice(destination_list)
    
    itinerary_lines = [
        f"✨ Personalized AI Itinerary: {request.duration} Days in {destination} ✨\n",
        f"Concept: A curated {request.travel_type.lower()} journey focused on {' & '.join(request.interests)}.\n",
        "---"
    ]
    
    for day in range(1, request.duration + 1):
        # Pick 2 random activities from relevant interest pools
        pool = []
        for interest in request.interests:
            pool.extend(ACTIVITIES.get(interest, []))
        if not pool:
            pool = ACTIVITIES["Nature"]
            
        daily_acts = random.sample(pool, min(2, len(pool)))
        
        itinerary_lines.append(f"\nDay {day}: Exploration Begins")
        itinerary_lines.append(f"• Morning: {daily_acts[0]}")
        itinerary_lines.append(f"• Afternoon: {daily_acts[1] if len(daily_acts) > 1 else 'Exploring local markets'}")
        itinerary_lines.append(f"• Evening: Special {request.travel_type.lower()}-style dinner at a top-rated spot.")

    itinerary_lines.append("\n---\n💡 Pro Travel Tips:")
    selected_tips = random.sample(TIPS, 3)
    for tip in selected_tips:
        itinerary_lines.append(f"- {tip}")
        
    itinerary_text = "\n".join(itinerary_lines)
    
    return {"itinerary": itinerary_text}

# NEW: Advanced Structured Itinerary
class AdvancedItineraryRequest(BaseModel):
    budget: float
    travel_type: str
    interests: List[str]
    duration: int
    travel_pace: str = "Balanced"
    dietary: str = "Veg"
    companion: str = "Solo"
    description: str = ""
    destination: str = ""

@router.post("/advanced")
async def generate_advanced_itinerary(request: AdvancedItineraryRequest):
    # Determine the target destination
    primary_interest = request.interests[0] if request.interests else "Nature"
    destination = random.choice(DESTINATIONS.get(primary_interest, DESTINATIONS["Nature"]))
    
    # 1. STRICT BUDGET CONSTRAINT & DISTRIBUTION
    total_budget = float(request.budget)
    duration = max(1, request.duration)
    
    # Division: Total -> Day -> Activity
    per_day_budget = total_budget / duration
    per_activity_avg = per_day_budget / 3 
    
    # 2. INDIAN PRICING LOGIC CONSTRAINTS
    # Realistic ranges based on tier
    # Entry: 50-500, Transport: 200-1500, Activities: 500-2000
    MIN_ACT_COST = 50
    MAX_ACT_COST = 2000 if total_budget > 50000 else 1000
    
    day_list = []
    calculated_total = 0
    
    reasoning_map = {
        "Food": "based on your interest in local culinary delights",
        "Adventure": "to satisfy your thrill-seeking spirit",
        "Nature": "to help you reconnect with the natural world",
        "Hills": "because you love high-altitude serenity",
        "City": "to experience the electric urban energy",
        "Cultural": "based on your passion for history and heritage"
    }

    # Intelligence matching for activities
    d_clean = (request.destination or "").lower()
    local_pool = []
    for loc_key, attractions in LOCATION_DATA.items():
        if loc_key in d_clean:
            local_pool.extend(attractions)
            break

    for day_num in range(1, duration + 1):
        # Activity Selection Pool
        pool = []
        for interest in request.interests:
            pool.extend(ACTIVITIES.get(interest, []))
        if not pool: pool = ACTIVITIES["Nature"]
        day_pool = local_pool if local_pool else pool
        
        # 3. CALCULATE SLOT COSTS
        # We target the per_activity_avg but add slight variance (-10% to +10%)
        # while keeping the day total within per_day_budget
        day_run_total = 0
        slots = ['morning', 'afternoon', 'evening']
        day_acts = {}
        
        for i, slot in enumerate(slots):
            # Target cost with slight randomness
            target = per_activity_avg * random.uniform(0.8, 1.1)
            # Clamp to realistic Indian costs
            cost = max(MIN_ACT_COST, min(int(target), MAX_ACT_COST))
            
            # Ensure we don't exceed the overall day budget for the last slot
            if i == len(slots) - 1:
                remaining_day = per_day_budget - day_run_total
                cost = max(MIN_ACT_COST, int(remaining_day))
            
            day_run_total += cost
            
            # Determine Slot Title
            title_prefix = "Exploring" if slot == 'morning' else "Visit" if slot == 'afternoon' else f"Local {request.travel_type} Evening @"
            
            day_acts[slot] = {
                "title": f"{title_prefix} {random.choice(day_pool)}",
                "time": "09:00 AM" if slot == 'morning' else "01:30 PM" if slot == 'afternoon' else "07:30 PM",
                "cost": cost,
                "reason": f"Recommended {reasoning_map.get(primary_interest, 'based on your profile')}" if slot == 'morning' else "Optimal lighting and weather" if slot == 'afternoon' else f"Matches your {request.dietary} dietary preference"
            }
        
        day_acts["day"] = day_num
        day_list.append(day_acts)
        calculated_total += day_run_total

    # 4. FINAL TOTAL VALIDATION (THE CLAMP)
    # If floating point errors or logic caused an overshot, we normalize
    if calculated_total > total_budget:
        reduction_ratio = total_budget / calculated_total
        final_sum = 0
        for day in day_list:
            for slot in ['morning', 'afternoon', 'evening']:
                day[slot]["cost"] = int(day[slot]["cost"] * reduction_ratio)
                final_sum += day[slot]["cost"]
        calculated_total = final_sum

    return {
        "destination": destination,
        "total_estimated_cost": calculated_total,
        "itinerary": day_list,
        "tips": random.sample(TIPS, 3),
        "total_budget": total_budget,
        "final_total": calculated_total
    }

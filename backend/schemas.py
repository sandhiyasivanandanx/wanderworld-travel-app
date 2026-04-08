from pydantic import BaseModel, EmailStr
from typing import Optional, List, Any
from datetime import datetime

# Hotel
class HotelBase(BaseModel):
    name: str
    stars: int
    price_per_night: float
    amenities: Optional[List[str]] = []
    image_url: Optional[str] = ""

class HotelOut(HotelBase):
    id: int
    place_id: int
    class Config:
        from_attributes = True

# Place
class PlaceBase(BaseModel):
    name: str
    description: Optional[str] = ""
    rating: Optional[float] = 4.0
    best_time: Optional[str] = ""
    category: Optional[str] = ""
    image_url: Optional[str] = ""
    tour_package_id: Optional[int] = None

class PlaceOut(PlaceBase):
    id: int
    country_id: int
    hotels: List[HotelOut] = []
    class Config:
        from_attributes = True

# Country
class CountryBase(BaseModel):
    name: str
    code: str
    continent: Optional[str] = ""
    flag_emoji: Optional[str] = ""
    cover_image: Optional[str] = ""
    description: Optional[str] = ""

class CountryOut(CountryBase):
    id: int
    places: List[PlaceOut] = []
    class Config:
        from_attributes = True

class CountrySummary(CountryBase):
    id: int
    class Config:
        from_attributes = True

# TourPackage
class TourPackageBase(BaseModel):
    title: str
    description: Optional[str] = ""
    duration_days: int
    price: float
    max_group_size: Optional[int] = 20
    difficulty: Optional[str] = "Easy"
    rating: Optional[float] = 4.5
    cover_image: Optional[str] = ""
    itinerary: Optional[Any] = []
    highlights: Optional[Any] = []
    includes: Optional[Any] = []

class TourPackageOut(BaseModel):
    id: int; title: str; description: str; duration_days: int; price: float; max_group_size: int = 20; difficulty: str = "Easy"; rating: float = 4.5; cover_image: str = ""; itinerary: Any = []; highlights: Any = []; includes: Any = []; exclusions: Any = []; quick_facts: Any = {}; attractions: Any = []
    class Config: from_attributes = True

# Booking
class BookingCreate(BaseModel):
    package_id: int; first_name: str; last_name: str; email: str; phone: str; num_travelers: int = 1; num_adults: int = 1; num_children: int = 0; travel_type: str; travel_date: str; special_requests: str = ""; total_price: float

class BookingOut(BookingCreate):
    id: int
    status: str
    created_at: datetime
    class Config:
        from_attributes = True

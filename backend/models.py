from sqlalchemy import Column, Integer, String, Float, Text, ForeignKey, JSON, DateTime
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

class Country(Base):
    __tablename__ = "countries"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    code = Column(String(3), unique=True, nullable=False)
    continent = Column(String(50))
    flag_emoji = Column(String(10))
    cover_image = Column(String(500))
    description = Column(Text)
    places = relationship("Place", back_populates="country", cascade="all, delete-orphan")

class Place(Base):
    __tablename__ = "places"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    country_id = Column(Integer, ForeignKey("countries.id"), nullable=False)
    tour_package_id = Column(Integer, ForeignKey("tour_packages.id"), nullable=True)
    description = Column(Text)
    rating = Column(Float, default=4.0)
    best_time = Column(String(100))
    category = Column(String(50))
    image_url = Column(String(500))
    country = relationship("Country", back_populates="places")
    tour_package = relationship("TourPackage")
    hotels = relationship("Hotel", back_populates="place", cascade="all, delete-orphan")

class Hotel(Base):
    __tablename__ = "hotels"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    place_id = Column(Integer, ForeignKey("places.id"), nullable=False)
    stars = Column(Integer, default=3)
    price_per_night = Column(Float)
    amenities = Column(JSON)
    image_url = Column(String(500))
    place = relationship("Place", back_populates="hotels")

class TourPackage(Base):
    __tablename__ = "tour_packages"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text)
    duration_days = Column(Integer)
    price = Column(Float)
    max_group_size = Column(Integer, default=20)
    difficulty = Column(String(50), default="Easy")
    rating = Column(Float, default=4.5)
    cover_image = Column(String(500))
    itinerary = Column(JSON)
    highlights = Column(JSON)
    includes = Column(JSON)
    exclusions = Column(JSON)
    quick_facts = Column(JSON)
    attractions = Column(JSON)
    bookings = relationship("Booking", back_populates="package", cascade="all, delete-orphan")

class Booking(Base):
    __tablename__ = "bookings"
    id = Column(Integer, primary_key=True, index=True)
    package_id = Column(Integer, ForeignKey("tour_packages.id"), nullable=False)
    first_name = Column(String(100))
    last_name = Column(String(100))
    email = Column(String(200))
    phone = Column(String(30))
    num_travelers = Column(Integer, default=1)
    num_adults = Column(Integer, default=1)
    num_children = Column(Integer, default=0)
    travel_type = Column(String(50))
    travel_date = Column(String(50))
    special_requests = Column(Text)
    total_price = Column(Float)
    status = Column(String(30), default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)
    package = relationship("TourPackage", back_populates="bookings")

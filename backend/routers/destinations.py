from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import models, schemas
from database import get_db

router = APIRouter(prefix="/api/destinations", tags=["destinations"])

@router.get("/countries", response_model=List[schemas.CountrySummary])
def get_countries(db: Session = Depends(get_db)):
    return db.query(models.Country).all()

@router.get("/countries/{country_id}", response_model=schemas.CountryOut)
def get_country(country_id: int, db: Session = Depends(get_db)):
    country = db.query(models.Country).filter(models.Country.id == country_id).first()
    if not country:
        raise HTTPException(status_code=404, detail="Country not found")
    return country

@router.get("/places", response_model=List[schemas.PlaceOut])
def get_places(country_id: int = None, db: Session = Depends(get_db)):
    query = db.query(models.Place)
    if country_id is not None:
        query = query.filter(models.Place.country_id == country_id)
    return query.all()

@router.get("/places/{place_id}", response_model=schemas.PlaceOut)
def get_place(place_id: int, db: Session = Depends(get_db)):
    place = db.query(models.Place).filter(models.Place.id == place_id).first()
    if not place:
        raise HTTPException(status_code=404, detail="Place not found")
    return place

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import models, schemas
from database import get_db

router = APIRouter(prefix="/api/tours", tags=["tours"])

@router.get("/", response_model=List[schemas.TourPackageOut])
def get_tours(db: Session = Depends(get_db)):
    return db.query(models.TourPackage).all()

@router.get("/{tour_id}", response_model=schemas.TourPackageOut)
def get_tour(tour_id: int, db: Session = Depends(get_db)):
    tour = db.query(models.TourPackage).filter(models.TourPackage.id == tour_id).first()
    if not tour:
        raise HTTPException(status_code=404, detail="Tour not found")
    return tour

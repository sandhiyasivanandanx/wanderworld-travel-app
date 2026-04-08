from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import models, schemas
from database import get_db

router = APIRouter(prefix="/api/bookings", tags=["bookings"])

@router.post("/", response_model=schemas.BookingOut)
def create_booking(booking: schemas.BookingCreate, db: Session = Depends(get_db)):
    package = db.query(models.TourPackage).filter(models.TourPackage.id == booking.package_id).first()
    if not package:
        raise HTTPException(status_code=404, detail="Tour package not found")
    
    # Calculate num_travelers if not provided correctly from total
    total_pax = booking.num_adults + booking.num_children
    
    db_booking = models.Booking(
        **booking.model_dump()
    )
    if not db_booking.num_travelers:
        db_booking.num_travelers = total_pax
        
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking

@router.get("/", response_model=List[schemas.BookingOut])
def get_bookings(db: Session = Depends(get_db)):
    return db.query(models.Booking).order_by(models.Booking.created_at.desc()).all()
@router.patch("/{booking_id}/status")
def update_booking_status(booking_id: int, status: str, db: Session = Depends(get_db)):
    db_booking = db.query(models.Booking).filter(models.Booking.id == booking_id).first()
    if not db_booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    db_booking.status = status
    db.commit()
    db.refresh(db_booking)
    return {"message": "Status updated successfully", "status": status}

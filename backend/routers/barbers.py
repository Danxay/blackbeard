from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, timedelta
from database import get_db
from models import Barber, Booking, BookingStatus
from schemas import BarberResponse

router = APIRouter(prefix="/api/barbers", tags=["barbers"])

# Mapping old Unsplash URLs to new local paths
BARBER_IMAGE_UPDATES = {
    "Артём": "/barbers/barber-1.png",
    "Кирилл": "/barbers/barber-2.png",
    "Денис": "/barbers/barber-3.png",
    "Макс": "/barbers/barber-4.png",
    "Егор": "/barbers/barber-5.png",
}

# All available 30-minute slots
ALL_SLOTS = [
    "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
    "20:00", "20:30", "21:00"
]

@router.get("", response_model=List[BarberResponse])
def get_barbers(db: Session = Depends(get_db)):
    """Get all barbers"""
    return db.query(Barber).all()

@router.get("/{barber_id}", response_model=BarberResponse)
def get_barber(barber_id: int, db: Session = Depends(get_db)):
    """Get barber by ID"""
    barber = db.query(Barber).filter(Barber.id == barber_id).first()
    if not barber:
        raise HTTPException(status_code=404, detail="Barber not found")
    return barber

@router.get("/{barber_id}/availability")
def get_barber_availability(
    barber_id: int, 
    date: str = Query(..., description="Date in YYYY-MM-DD format"),
    db: Session = Depends(get_db)
):
    """
    Get available time slots for a barber on a specific date.
    Returns list of slots with their availability status.
    """
    barber = db.query(Barber).filter(Barber.id == barber_id).first()
    if not barber:
        raise HTTPException(status_code=404, detail="Barber not found")
    
    try:
        target_date = datetime.strptime(date, "%Y-%m-%d").date()
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD")
    
    # Get all confirmed bookings for this barber on this date
    bookings = db.query(Booking).filter(
        Booking.barber_id == barber_id,
        Booking.status.in_([BookingStatus.CONFIRMED, BookingStatus.PENDING])
    ).all()
    
    # Filter bookings for the target date
    day_bookings = []
    for b in bookings:
        if b.date.date() == target_date:
            day_bookings.append(b)
    
    # Calculate occupied slots
    occupied_slots = set()
    for booking in day_bookings:
        start_time = booking.time  # e.g., "10:00"
        duration = booking.total_duration  # in minutes
        
        # Calculate how many 30-min slots this booking occupies
        slots_needed = (duration + 29) // 30  # round up
        
        # Parse start time
        start_hour, start_min = map(int, start_time.split(':'))
        current_minutes = start_hour * 60 + start_min
        
        for i in range(slots_needed):
            slot_hour = current_minutes // 60
            slot_min = current_minutes % 60
            slot_time = f"{slot_hour:02d}:{slot_min:02d}"
            occupied_slots.add(slot_time)
            current_minutes += 30
    
    # Build response with availability
    slots = []
    for slot in ALL_SLOTS:
        slots.append({
            "time": slot,
            "available": slot not in occupied_slots
        })
    
    return {
        "barber_id": barber_id,
        "date": date,
        "slots": slots,
        "occupied_count": len(occupied_slots),
        "available_count": len(ALL_SLOTS) - len(occupied_slots)
    }

@router.post("/update-images")
def update_barber_images(db: Session = Depends(get_db)):
    """Update barber images to new local paths (run once on production)"""
    updated = 0
    barbers = db.query(Barber).all()
    
    for barber in barbers:
        if barber.name in BARBER_IMAGE_UPDATES:
            new_image = BARBER_IMAGE_UPDATES[barber.name]
            if barber.image != new_image:
                barber.image = new_image
                updated += 1
    
    db.commit()
    return {"message": f"Updated {updated} barber images", "updated": updated}

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models import Barber
from ..schemas import BarberResponse

router = APIRouter(prefix="/api/barbers", tags=["barbers"])

@router.get("", response_model=List[BarberResponse])
def get_barbers(db: Session = Depends(get_db)):
    """Get all barbers"""
    return db.query(Barber).filter(Barber.is_available == True).all()

@router.get("/{barber_id}", response_model=BarberResponse)
def get_barber(barber_id: int, db: Session = Depends(get_db)):
    """Get barber by ID"""
    barber = db.query(Barber).filter(Barber.id == barber_id).first()
    if not barber:
        raise HTTPException(status_code=404, detail="Barber not found")
    return barber

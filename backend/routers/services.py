from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models import Service
from ..schemas import ServiceResponse

router = APIRouter(prefix="/api/services", tags=["services"])

@router.get("", response_model=List[ServiceResponse])
def get_services(db: Session = Depends(get_db)):
    """Get all services"""
    return db.query(Service).all()

@router.get("/popular", response_model=List[ServiceResponse])
def get_popular_services(db: Session = Depends(get_db)):
    """Get popular services"""
    return db.query(Service).filter(Service.popular == True).all()

@router.get("/{service_id}", response_model=ServiceResponse)
def get_service(service_id: int, db: Session = Depends(get_db)):
    """Get service by ID"""
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    return service

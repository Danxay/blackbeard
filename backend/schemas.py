from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
from .models import BookingStatus

# User schemas
class UserBase(BaseModel):
    telegram_id: int
    chat_id: int
    first_name: str
    last_name: Optional[str] = None
    username: Optional[str] = None
    photo_url: Optional[str] = None

class UserCreate(UserBase):
    pass

class UserResponse(UserBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Barber schemas
class BarberBase(BaseModel):
    name: str
    role: str = "Барбер"
    rating: float = 5.0
    reviews_count: int = 0
    experience: Optional[str] = None
    image: Optional[str] = None
    is_available: bool = True

class BarberResponse(BarberBase):
    id: int
    
    class Config:
        from_attributes = True

# Service schemas
class ServiceBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: int
    duration: int
    category: Optional[str] = None
    icon: str = "Scissors"
    popular: bool = False

class ServiceResponse(ServiceBase):
    id: int
    
    class Config:
        from_attributes = True

# Booking schemas
class BookingCreate(BaseModel):
    telegram_id: int
    chat_id: int
    first_name: str
    username: Optional[str] = None
    barber_id: int
    service_ids: List[int]
    date: datetime
    time: str
    total_price: int
    total_duration: int

class BookingResponse(BaseModel):
    id: int
    user_id: int
    barber_id: int
    barber: BarberResponse
    services: List[ServiceResponse]
    date: datetime
    time: str
    status: BookingStatus
    total_price: int
    total_duration: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Auth schemas
class TelegramAuthData(BaseModel):
    init_data: str

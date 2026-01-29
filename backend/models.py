from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Table, Enum, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from .database import Base

# Many-to-many for booking services
booking_services = Table(
    'booking_services',
    Base.metadata,
    Column('booking_id', Integer, ForeignKey('bookings.id')),
    Column('service_id', Integer, ForeignKey('services.id'))
)

class BookingStatus(str, enum.Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    CANCELLED = "cancelled"
    COMPLETED = "completed"

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    telegram_id = Column(Integer, unique=True, index=True, nullable=False)
    chat_id = Column(Integer, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=True)
    username = Column(String, nullable=True)
    photo_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    bookings = relationship("Booking", back_populates="user")

class Barber(Base):
    __tablename__ = "barbers"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    role = Column(String, default="Барбер")
    rating = Column(Float, default=5.0)
    reviews_count = Column(Integer, default=0)
    experience = Column(String, nullable=True)
    image = Column(String, nullable=True)
    is_available = Column(Boolean, default=True)
    
    bookings = relationship("Booking", back_populates="barber")

class Service(Base):
    __tablename__ = "services"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    price = Column(Integer, nullable=False)
    duration = Column(Integer, nullable=False)  # minutes
    category = Column(String, nullable=True)
    icon = Column(String, default="Scissors")  # Lucide icon name
    popular = Column(Boolean, default=False)

class Booking(Base):
    __tablename__ = "bookings"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    barber_id = Column(Integer, ForeignKey("barbers.id"), nullable=False)
    date = Column(DateTime, nullable=False)
    time = Column(String, nullable=False)
    status = Column(Enum(BookingStatus), default=BookingStatus.CONFIRMED)
    total_price = Column(Integer, nullable=False)
    total_duration = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    reminder_sent = Column(Boolean, default=False)
    
    user = relationship("User", back_populates="bookings")
    barber = relationship("Barber", back_populates="bookings")
    services = relationship("Service", secondary=booking_services)

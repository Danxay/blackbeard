from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import httpx
from ..database import get_db
from ..models import Booking, User, Service, BookingStatus
from ..schemas import BookingCreate, BookingResponse
from ..config import BOT_TOKEN

router = APIRouter(prefix="/api/bookings", tags=["bookings"])

async def send_telegram_notification(chat_id: int, text: str):
    """Send notification via Telegram Bot API"""
    if not BOT_TOKEN:
        print("BOT_TOKEN not set, skipping notification")
        return
    
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    async with httpx.AsyncClient() as client:
        try:
            await client.post(url, json={
                "chat_id": chat_id,
                "text": text,
                "parse_mode": "HTML"
            })
        except Exception as e:
            print(f"Failed to send notification: {e}")

@router.post("", response_model=BookingResponse)
async def create_booking(booking_data: BookingCreate, db: Session = Depends(get_db)):
    """Create a new booking"""
    
    # Get or create user
    user = db.query(User).filter(User.telegram_id == booking_data.telegram_id).first()
    if not user:
        user = User(
            telegram_id=booking_data.telegram_id,
            chat_id=booking_data.chat_id,
            first_name=booking_data.first_name,
            username=booking_data.username
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    
    # Get services
    services = db.query(Service).filter(Service.id.in_(booking_data.service_ids)).all()
    if not services:
        raise HTTPException(status_code=400, detail="No valid services provided")
    
    # Create booking
    booking = Booking(
        user_id=user.id,
        barber_id=booking_data.barber_id,
        date=booking_data.date,
        time=booking_data.time,
        total_price=booking_data.total_price,
        total_duration=booking_data.total_duration,
        status=BookingStatus.CONFIRMED
    )
    booking.services = services
    
    db.add(booking)
    db.commit()
    db.refresh(booking)
    
    # Send notification
    date_str = booking.date.strftime("%d.%m.%Y")
    services_str = ", ".join([s.name for s in services])
    
    await send_telegram_notification(
        user.chat_id,
        f"✅ <b>Запись подтверждена!</b>\n\n"
        f"📅 {date_str} в {booking.time}\n"
        f"💇 {services_str}\n"
        f"💰 {booking.total_price} ₽\n\n"
        f"Ждём вас в Black Beard!"
    )
    
    return booking

@router.get("/user/{telegram_id}", response_model=List[BookingResponse])
def get_user_bookings(telegram_id: int, db: Session = Depends(get_db)):
    """Get all bookings for a user"""
    user = db.query(User).filter(User.telegram_id == telegram_id).first()
    if not user:
        return []
    
    return db.query(Booking).filter(
        Booking.user_id == user.id,
        Booking.status != BookingStatus.CANCELLED
    ).order_by(Booking.date.desc()).all()

@router.delete("/{booking_id}")
async def cancel_booking(booking_id: int, db: Session = Depends(get_db)):
    """Cancel a booking"""
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    booking.status = BookingStatus.CANCELLED
    db.commit()
    
    # Send cancellation notification
    await send_telegram_notification(
        booking.user.chat_id,
        f"❌ <b>Запись отменена</b>\n\n"
        f"Запись на {booking.date.strftime('%d.%m.%Y')} в {booking.time} была отменена."
    )
    
    return {"status": "cancelled"}

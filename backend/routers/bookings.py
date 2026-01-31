from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, selectinload
from typing import List
from datetime import datetime as dt
import httpx
import hmac
from database import get_db
from models import Booking, User, Service, Barber, BookingStatus
from schemas import BookingCreate, BookingResponse
from config import BOT_TOKEN
from dependencies import get_current_user
from fastapi import Header

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
async def create_booking(
    booking_data: BookingCreate,
    db: Session = Depends(get_db),
    user_data: dict = Depends(get_current_user)
):
    """Create a new booking"""
    
    # Authenticated user ID
    telegram_id = user_data['id']

    # Parse date string to datetime
    try:
        booking_date = dt.strptime(booking_data.date, "%Y-%m-%d")
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD")
    
    # Get or create user
    user = db.query(User).filter(User.telegram_id == telegram_id).first()
    if not user:
        # User not found, create new one using authenticated data
        user = User(
            telegram_id=telegram_id,
            chat_id=telegram_id, # Assume chat_id is same as telegram_id for users
            first_name=user_data.get('first_name', booking_data.first_name),
            last_name=user_data.get('last_name'),
            username=user_data.get('username', booking_data.username)
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    
    # Validate barber
    barber = db.query(Barber).filter(Barber.id == booking_data.barber_id).first()
    if not barber:
        raise HTTPException(status_code=400, detail="Barber not found")
    if not barber.is_available:
        raise HTTPException(status_code=400, detail="Barber is not available")

    # Get services
    services = db.query(Service).filter(Service.id.in_(booking_data.service_ids)).all()
    if not services:
        raise HTTPException(status_code=400, detail="No valid services provided")
    
    # Create booking
    booking = Booking(
        user_id=user.id,
        barber_id=booking_data.barber_id,
        date=booking_date,
        time=booking_data.time,
        total_price=booking_data.total_price,
        total_duration=booking_data.total_duration,
        status=BookingStatus.CONFIRMED,
        reminder_sent=False,
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

@router.get("", response_model=List[BookingResponse])
def get_my_bookings(
    db: Session = Depends(get_db),
    user_data: dict = Depends(get_current_user)
):
    """Get all bookings for the authenticated user"""
    telegram_id = user_data['id']
    user = db.query(User).filter(User.telegram_id == telegram_id).first()
    if not user:
        return []
    
    return (
        db.query(Booking)
        .options(selectinload(Booking.barber), selectinload(Booking.services))
        .filter(Booking.user_id == user.id)
        .order_by(Booking.date.desc())
        .all()
    )

@router.delete("/{booking_id}")
async def cancel_booking(
    booking_id: int,
    db: Session = Depends(get_db),
    user_data: dict = Depends(get_current_user)
):
    """Cancel a booking"""
    telegram_id = user_data['id']
    user = db.query(User).filter(User.telegram_id == telegram_id).first()

    # Find booking
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    # Check ownership
    if not user or booking.user_id != user.id:
        raise HTTPException(status_code=403, detail="Not authorized to cancel this booking")

    booking.status = BookingStatus.CANCELLED
    db.commit()
    
    # Send cancellation notification
    chat_id = user.chat_id if user else booking.user.chat_id

    await send_telegram_notification(
        chat_id,
        f"❌ <b>Запись отменена</b>\n\n"
        f"Запись на {booking.date.strftime('%d.%m.%Y')} в {booking.time} была отменена."
    )
    
    return {"status": "cancelled"}

@router.delete("/{booking_id}/bot")
async def cancel_booking_by_bot(
    booking_id: int,
    db: Session = Depends(get_db),
    x_bot_token: str | None = Header(default=None, alias="X-Bot-Token"),
):
    """Cancel a booking via bot (server-to-server)"""
    if not BOT_TOKEN or not x_bot_token or not hmac.compare_digest(x_bot_token, BOT_TOKEN):
        raise HTTPException(status_code=401, detail="Invalid bot token")

    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    booking.status = BookingStatus.CANCELLED
    db.commit()

    user = booking.user or db.query(User).filter(User.id == booking.user_id).first()
    chat_id = user.chat_id if user else None
    if chat_id:
        await send_telegram_notification(
            chat_id,
            f"❌ <b>Запись отменена</b>\n\n"
            f"Запись на {booking.date.strftime('%d.%m.%Y')} в {booking.time} была отменена."
        )

    return {"status": "cancelled"}

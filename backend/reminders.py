import asyncio
from datetime import datetime, timedelta, time as dtime
from sqlalchemy import or_
from sqlalchemy.orm import selectinload
from database import SessionLocal
from models import Booking, BookingStatus
from routers.bookings import send_telegram_notification
from config import BOT_TOKEN, REMINDER_ENABLED, REMINDER_MINUTES, REMINDER_POLL_SECONDS


def _booking_datetime(booking: Booking) -> datetime | None:
    try:
        date_value = booking.date
        if isinstance(date_value, datetime):
            date_value = date_value.date()
        time_str = booking.time or "00:00"
        hours, minutes = time_str.split(":")[:2]
        return datetime.combine(date_value, dtime(int(hours), int(minutes)))
    except Exception:
        return None


async def check_and_send_reminders() -> None:
    if not BOT_TOKEN or not REMINDER_ENABLED:
        return

    now = datetime.now()
    window_end = now + timedelta(minutes=REMINDER_MINUTES)

    db = SessionLocal()
    try:
        bookings = (
            db.query(Booking)
            .options(selectinload(Booking.user))
            .filter(
                Booking.status == BookingStatus.CONFIRMED,
                or_(Booking.reminder_sent == False, Booking.reminder_sent == None),  # noqa: E712
            )
            .all()
        )

        for booking in bookings:
            booking_dt = _booking_datetime(booking)
            if not booking_dt:
                continue
            if now <= booking_dt <= window_end:
                chat_id = booking.user.chat_id if booking.user else None
                if not chat_id:
                    continue

                await send_telegram_notification(
                    chat_id,
                    (
                        "⏰ <b>Напоминание о записи!</b>\n\n"
                        f"Запись на {booking_dt.strftime('%d.%m.%Y')} в {booking.time}\n"
                        "До встречи в Black Beard!"
                    ),
                )
                booking.reminder_sent = True

        db.commit()
    finally:
        db.close()


async def reminder_worker(stop_event: asyncio.Event) -> None:
    while not stop_event.is_set():
        try:
            await check_and_send_reminders()
        except Exception:
            # Do not crash the loop on errors
            pass

        try:
            await asyncio.wait_for(stop_event.wait(), timeout=REMINDER_POLL_SECONDS)
        except asyncio.TimeoutError:
            continue

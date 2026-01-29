from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo
from config import WEBAPP_URL

def get_main_keyboard() -> InlineKeyboardMarkup:
    """Main keyboard with WebApp button"""
    return InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(
            text="📅 Записаться",
            web_app=WebAppInfo(url=WEBAPP_URL)
        )],
        [InlineKeyboardButton(
            text="📍 Адрес",
            callback_data="location"
        )],
        [InlineKeyboardButton(
            text="📞 Позвонить",
            callback_data="call"
        )]
    ])

def get_booking_keyboard(booking_id: int) -> InlineKeyboardMarkup:
    """Keyboard for booking notification"""
    return InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(
            text="❌ Отменить запись",
            callback_data=f"cancel_{booking_id}"
        )],
        [InlineKeyboardButton(
            text="📅 Мои записи",
            web_app=WebAppInfo(url=f"{WEBAPP_URL}/bookings")
        )]
    ])

from aiogram import Router, Bot
from aiogram.types import CallbackQuery
import httpx
from config import API_URL

router = Router()

SHOP_INFO = """
<b>📍 Black Beard</b>

Адрес: ул. Тверская, 15
Метро: Пушкинская

🕐 Часы работы:
Пн-Пт: 10:00 — 22:00
Сб: 10:00 — 21:00
Вс: 11:00 — 20:00
"""

@router.callback_query(lambda c: c.data == "location")
async def show_location(callback: CallbackQuery):
    """Show location info"""
    await callback.message.answer(SHOP_INFO, parse_mode="HTML")
    await callback.answer()

@router.callback_query(lambda c: c.data == "call")
async def show_phone(callback: CallbackQuery):
    """Show phone number"""
    await callback.message.answer(
        "📞 <b>Позвонить:</b>\n\n+7 (495) 123-45-67",
        parse_mode="HTML"
    )
    await callback.answer()

@router.callback_query(lambda c: c.data.startswith("cancel_"))
async def cancel_booking(callback: CallbackQuery):
    """Cancel booking"""
    booking_id = int(callback.data.split("_")[1])
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.delete(f"{API_URL}/api/bookings/{booking_id}")
            
            if response.status_code == 200:
                await callback.message.edit_text(
                    "❌ Запись отменена",
                    reply_markup=None
                )
            else:
                await callback.answer("Не удалось отменить запись", show_alert=True)
    except Exception as e:
        await callback.answer("Ошибка при отмене записи", show_alert=True)

async def send_booking_confirmation(bot: Bot, chat_id: int, booking_data: dict):
    """Send booking confirmation notification"""
    text = f"""
✅ <b>Запись подтверждена!</b>

📅 {booking_data['date']} в {booking_data['time']}
💇 {booking_data['services']}
👤 Мастер: {booking_data['barber']}
💰 {booking_data['total_price']} ₽

📍 ул. Тверская, 15 (м. Пушкинская)

Ждём вас в Black Beard!
"""
    await bot.send_message(chat_id, text, parse_mode="HTML")

async def send_reminder(bot: Bot, chat_id: int, booking_data: dict):
    """Send reminder notification (2 hours before)"""
    text = f"""
⏰ <b>Напоминание о записи!</b>

Через 2 часа у вас запись в Black Beard:

📅 {booking_data['date']} в {booking_data['time']}
💇 {booking_data['services']}
👤 Мастер: {booking_data['barber']}

📍 ул. Тверская, 15 (м. Пушкинская)

До встречи! 👋
"""
    await bot.send_message(chat_id, text, parse_mode="HTML")

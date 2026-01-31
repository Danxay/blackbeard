from aiogram import Router, Bot
from aiogram.types import CallbackQuery
import httpx
from config import API_URL, BOT_TOKEN

router = Router()

SHOP_INFO = """
<b>📍 Black Beard</b>

Адрес: Невский просп., 28
Метро: Гостиный двор

🕐 Часы работы:
Пн-Пт: 10:00 — 22:00
Сб: 10:00 — 21:00
Вс: 11:00 — 20:00

📞 <a href="tel:+78123092850">+7 (812) 309-28-50</a>
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
        "📞 <b>Позвонить:</b>\n\n<a href=\"tel:+78123092850\">+7 (812) 309-28-50</a>",
        parse_mode="HTML"
    )
    await callback.answer()

@router.callback_query(lambda c: c.data.startswith("cancel_"))
async def cancel_booking(callback: CallbackQuery):
    """Cancel booking"""
    booking_id = int(callback.data.split("_")[1])
    
    try:
        async with httpx.AsyncClient() as client:
            headers = {"X-Bot-Token": BOT_TOKEN} if BOT_TOKEN else {}
            response = await client.delete(f"{API_URL}/api/bookings/{booking_id}/bot", headers=headers)
            
            if response.status_code == 200:
                await callback.message.edit_text(
                    "❌ Запись отменена",
                    reply_markup=None
                )
                await callback.answer("Запись отменена")
            else:
                await callback.answer("Не удалось отменить запись", show_alert=True)
    except Exception:
        await callback.answer("Ошибка при отмене записи", show_alert=True)

async def send_booking_confirmation(bot: Bot, chat_id: int, booking_data: dict):
    """Send booking confirmation notification"""
    text = f"""
✅ <b>Запись подтверждена!</b>

📅 {booking_data['date']} в {booking_data['time']}
💇 {booking_data['services']}
👤 Мастер: {booking_data['barber']}
💰 {booking_data['total_price']} ₽

📍 Невский просп., 28 (м. Гостиный двор)
📞 <a href="tel:+78123092850">+7 (812) 309-28-50</a>

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

📍 Невский просп., 28 (м. Гостиный двор)
📞 <a href="tel:+78123092850">+7 (812) 309-28-50</a>

До встречи! 👋
"""
    await bot.send_message(chat_id, text, parse_mode="HTML")

from aiogram import Router
from aiogram.filters import CommandStart, Command
from aiogram.types import Message
from ..keyboards import get_main_keyboard

router = Router()

WELCOME_TEXT = """
<b>👋 Добро пожаловать в Black Beard!</b>

Премиум барбершоп в центре Москвы.

🕐 Работаем ежедневно 10:00 — 22:00
📍 ул. Тверская, 15 (м. Пушкинская)

Нажмите кнопку ниже, чтобы записаться 👇
"""

@router.message(CommandStart())
async def cmd_start(message: Message):
    """Handle /start command"""
    await message.answer(
        WELCOME_TEXT,
        reply_markup=get_main_keyboard(),
        parse_mode="HTML"
    )

@router.message(Command("help"))
async def cmd_help(message: Message):
    """Handle /help command"""
    help_text = """
<b>📚 Помощь</b>

/start — Главное меню
/help — Показать эту справку
/bookings — Мои записи

Для записи нажмите кнопку «📅 Записаться» в меню.
"""
    await message.answer(help_text, parse_mode="HTML")

@router.message(Command("bookings"))
async def cmd_bookings(message: Message):
    """Handle /bookings command"""
    await message.answer(
        "Нажмите кнопку ниже, чтобы посмотреть записи:",
        reply_markup=get_main_keyboard(),
        parse_mode="HTML"
    )

import asyncio
import logging
import sys

from aiogram import Bot, Dispatcher
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode

from .config import BOT_TOKEN
from .handlers import start_router, callbacks_router

async def main():
    if not BOT_TOKEN:
        print("Error: BOT_TOKEN not set in environment variables")
        sys.exit(1)
    
    # Initialize bot
    bot = Bot(
        token=BOT_TOKEN,
        default=DefaultBotProperties(parse_mode=ParseMode.HTML)
    )
    
    # Initialize dispatcher
    dp = Dispatcher()
    
    # Include routers
    dp.include_router(start_router)
    dp.include_router(callbacks_router)
    
    # Start polling
    print("Bot started!")
    await dp.start_polling(bot)

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    asyncio.run(main())

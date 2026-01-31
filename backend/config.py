import os
from pathlib import Path
from dotenv import load_dotenv

# Always load project root .env (works from any CWD)
_env_path = Path(__file__).resolve().parents[1] / ".env"
load_dotenv(dotenv_path=_env_path)

# Database
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./data/blackbeard.db")

# Telegram Bot
BOT_TOKEN = os.getenv("BOT_TOKEN", "")
WEBAPP_URL = os.getenv("WEBAPP_URL", "https://localhost:3000")

# Server
API_HOST = os.getenv("API_HOST", "0.0.0.0")
API_PORT = int(os.getenv("API_PORT", "8000"))

# CORS
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

# Seed data (disable for production)
SEED_DATA = os.getenv("SEED_DATA", "true").lower() in {"1", "true", "yes"}

# Reminders (1 hour before by default)
REMINDER_ENABLED = os.getenv("REMINDER_ENABLED", "true").lower() in {"1", "true", "yes"}
REMINDER_MINUTES = int(os.getenv("REMINDER_MINUTES", "60"))
REMINDER_POLL_SECONDS = int(os.getenv("REMINDER_POLL_SECONDS", "60"))
